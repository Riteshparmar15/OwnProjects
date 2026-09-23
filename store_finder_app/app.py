import streamlit as st
import pandas as pd
import numpy as np
import folium
from folium.plugins import FastMarkerCluster, HeatMap
from streamlit_folium import st_folium
from scipy.spatial import cKDTree
import plotly.express as px
import io
import os

# PDF Generation Imports
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

from geocoding import GeocodeService
from analysis import run_store_analysis, format_state_name, to_zip5

# ----------------- PAGE CONFIG -----------------
st.set_page_config(
    page_title="Executive Store Coverage & Expansion Platform",
    layout="wide",
    page_icon="📍",
    initial_sidebar_state="expanded"
)

st.title("📍 Executive Store Intelligence & Market Expansion Dashboard")
st.markdown("---")

# ----------------- CACHED DATA ENGINE -----------------
@st.cache_data
def load_raw_data():
    """Loads raw CSV data from storage including GLS Active Stores."""
    cust_df = pd.read_csv("data/Address Matching - Customer Address.csv")
    store_df = pd.read_csv("data/Address Matching - Locations_Stores.csv")
    
    gls_path = "data/Address Matching - GLS Active Store.csv"
    if os.path.exists(gls_path):
        gls_df = pd.read_csv(gls_path)
    else:
        gls_df = pd.DataFrame()  # Fallback if file isn't uploaded yet
        
    return cust_df, store_df, gls_df

@st.cache_data
def preprocess_datasets(cust_df, store_df, gls_df):
    """Clean coordinates, merge GLS Status & Order Data, build spatial lookup."""
    c_df = cust_df.copy()
    c_df["Latitude"] = pd.to_numeric(c_df["Latitude"], errors="coerce")
    c_df["Longitude"] = pd.to_numeric(c_df["Longitude"], errors="coerce")
    c_df["Clean_Zip"] = pd.to_numeric(c_df["Zip"], errors="coerce")
    c_df = c_df.dropna(subset=["Latitude", "Longitude"]).reset_index(drop=True)

    zip_geo = c_df.groupby("Clean_Zip")[["Latitude", "Longitude"]].mean().reset_index()
    city_state_geo = c_df.groupby(
        [c_df["City"].astype(str).str.lower().str.strip(), c_df["State"].astype(str).str.lower().str.strip()]
    )[["Latitude", "Longitude"]].mean().reset_index().rename(
        columns={"Latitude": "Lat_city", "Longitude": "Lng_city", "City": "city_lower", "State": "state_lower"}
    )

    s_df = store_df.copy()
    s_df["Clean_Zip"] = pd.to_numeric(s_df["PostalCode"], errors="coerce")
    s_df["city_lower"] = s_df["City"].astype(str).str.lower().str.strip()
    s_df["state_lower"] = s_df["State"].astype(str).str.lower().str.strip()

    m1 = s_df.merge(zip_geo, on="Clean_Zip", how="left", suffixes=("", "_zip"))
    m2 = m1.merge(city_state_geo, on=["city_lower", "state_lower"], how="left")

    s_df["Latitude"] = m2["Latitude_zip"].fillna(m2["Lat_city"])
    s_df["Longitude"] = m2["Longitude_zip"].fillna(m2["Lng_city"])

    review_col = [c for c in s_df.columns if "review" in c.lower()]
    s_df["Clean_Reviews"] = pd.to_numeric(s_df[review_col[0]], errors="coerce").fillna(0) if review_col else 0
    s_df["Store_Name"] = s_df["Stadium Name"].fillna("Store")

    # ---------------- MERGE GLS ACTIVE STATUS & ORDERS ----------------
    if not gls_df.empty:
        # Standardize matching keys
        gls_clean = gls_df.copy()
        
        # Identify columns dynamically
        status_col = [c for c in gls_clean.columns if "status" in c.lower() or "active" in c.lower()]
        order_col = [c for c in gls_clean.columns if "order" in c.lower() or "previous" in c.lower() or "year" in c.lower()]
        name_col = [c for c in gls_clean.columns if "name" in c.lower() or "store" in c.lower()]

        gls_clean["GLS_Status"] = gls_clean[status_col[0]].astype(str) if status_col else "Active"
        gls_clean["Prev_Year_Orders"] = pd.to_numeric(gls_clean[order_col[0]], errors="coerce").fillna(0) if order_col else 0
        gls_clean["Join_Name"] = gls_clean[name_col[0]].astype(str).str.strip().str.lower() if name_col else ""

        s_df["Join_Name"] = s_df["Store_Name"].astype(str).str.strip().str.lower()

        s_df = s_df.merge(
            gls_clean[["Join_Name", "GLS_Status", "Prev_Year_Orders"]].drop_duplicates(subset=["Join_Name"]),
            on="Join_Name",
            how="left"
        )
        s_df["GLS_Status"] = s_df["GLS_Status"].fillna("Inactive / Non-GLS")
        s_df["Prev_Year_Orders"] = s_df["Prev_Year_Orders"].fillna(0)
    else:
        s_df["GLS_Status"] = "Active"
        s_df["Prev_Year_Orders"] = 0

    s_df = s_df.dropna(subset=["Latitude", "Longitude"]).reset_index(drop=True)

    cust_miles = np.column_stack((c_df["Latitude"].values * 69.0, c_df["Longitude"].values * 52.0))
    cust_tree = cKDTree(cust_miles)

    return c_df, s_df, cust_tree

# PDF Generator Function
def generate_pdf_report(city_name, top_stores, total_reach, total_cust, best_store):
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    styles = getSampleStyleSheet()
    story = []

    title_style = ParagraphStyle('Title', parent=styles['Heading1'], fontSize=18, textColor=colors.HexColor("#1F4E78"))
    story.append(Paragraph(f"Executive Market Report: {city_name}", title_style))
    story.append(Spacer(1, 12))

    body_style = styles['Normal']
    summary_text = (
        f"<b>Top Performing Location:</b> {best_store['Store_Name']}<br/>"
        f"<b>Total Market Reach:</b> {total_reach} unique customers ({(total_reach/total_cust)*100:.1f}% share)<br/>"
        f"<b>Analyzed Store Locations:</b> {len(top_stores)} stores<br/>"
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 18))

    table_data = [["Rank", "Store Name", "Address", "Reviews", "Rank Score"]]
    for idx, row in top_stores.head(10).iterrows():
        table_data.append([
            str(idx + 1),
            str(row["Store_Name"])[:25],
            str(row["Address"])[:25],
            str(int(row["Clean_Reviews"])),
            f"{row['Rank_Score']:.1f}"
        ])

    t = Table(table_data, colWidths=[40, 150, 150, 60, 60])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#1F4E78")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0,0), (-1,0), 8),
        ('GRID', (0,0), (-1,-1), 0.5, colors.grey)
    ]))
    story.append(t)

    doc.build(story)
    buffer.seek(0)
    return buffer

df_cust_raw, df_store_raw, df_gls_raw = load_raw_data()
df_cust, df_store_clean, cust_tree = preprocess_datasets(df_cust_raw, df_store_raw, df_gls_raw)

# ----------------- SIDEBAR CONTROLS -----------------
st.sidebar.header("⚙️ Crowd & Review Filters")
radius_miles = st.sidebar.slider("Customer Radius (Miles)", min_value=1.0, max_value=50.0, value=10.0, step=0.5)
min_reviews = st.sidebar.number_input("Minimum Reviews Count", min_value=0, value=10, step=5)
top_n_stores = st.sidebar.slider("Select Top N Stores Display (10 to 20)", min_value=10, max_value=20, value=10, step=1)

st.sidebar.markdown("---")
st.sidebar.header("🏷️ Sort Stores By")
sort_metric = st.sidebar.selectbox("Rank Stores Priority", ["Rank Score", "Previous Year Orders", "Customer Crowd", "Reviews Count"])

st.sidebar.markdown("---")
st.sidebar.header("🧪 What-If Scenario Simulator")
enable_what_if = st.sidebar.checkbox("Simulate New Proposed Store Location", value=False)
sim_lat = sim_lng = sim_name = None

if enable_what_if:
    st.sidebar.caption("Enter coordinates for a proposed location to test market viability:")
    sim_name = st.sidebar.text_input("Proposed Store Label", value="New Proposed Store")
    sim_lat = st.sidebar.number_input("Proposed Latitude", value=40.7128, format="%.4f")
    sim_lng = st.sidebar.number_input("Proposed Longitude", value=-74.0060, format="%.4f")

st.sidebar.markdown("---")
st.sidebar.header("🗺️ Map Layer Settings")
show_heatmap = st.sidebar.checkbox("Enable Customer Density Heatmap", value=False)
map_style = st.sidebar.selectbox("Base Map Style", ["OpenStreetMap", "CartoDB positron", "CartoDB dark_matter"])

# Session State Initializations
if "selected_city" not in st.session_state:
    st.session_state["selected_city"] = "New York"
if "map_center" not in st.session_state:
    st.session_state["map_center"] = None
if "map_bounds" not in st.session_state:
    st.session_state["map_bounds"] = None
if "focused_store_name" not in st.session_state:
    st.session_state["focused_store_name"] = None


# ==============================================================================
# 1) EXECUTIVE OVERVIEW & REGIONAL DEMOGRAPHICS
# ==============================================================================
st.subheader("📊 Executive Overview & Regional Demographics")
st.caption("💡 *Tip: Click any city below to update the market analysis dynamically.*")

col1, col2, col3 = st.columns(3)

top_states = df_cust_raw["State"].apply(format_state_name).value_counts().head(10).reset_index().rename(columns={"index": "Top 10 State", "State": "Top 10 State"})
top_cities = df_cust_raw["City"].astype(str).str.strip().value_counts().head(10).reset_index().rename(columns={"index": "Top 10 City", "City": "Top 10 City"})
top_zips = df_cust_raw["Zip"].apply(to_zip5).value_counts().head(10).reset_index().rename(columns={"index": "Top 10 ZIP", "Zip": "Top 10 ZIP"})

with col1:
    st.write("**Top 10 States**")
    st.dataframe(top_states, use_container_width=True)

with col2:
    st.write("**Top 10 Cities (Clickable)**")
    city_event = st.dataframe(top_cities, use_container_width=True, selection_mode="single-row", on_select="rerun", key="city_table_selection")
    if city_event and city_event.selection and city_event.selection["rows"]:
        idx = city_event.selection["rows"][0]
        clicked_city = top_cities.iloc[idx]["Top 10 City"]
        if st.session_state["selected_city"] != clicked_city:
            st.session_state["selected_city"] = clicked_city
            st.session_state["map_center"] = None
            st.session_state["map_bounds"] = None
            st.session_state["focused_store_name"] = None

with col3:
    st.write("**Top 10 ZIPs**")
    st.dataframe(top_zips, use_container_width=True)

st.markdown("---")


# ==============================================================================
# 2) 📋 TOP N STORES TABLE — [SELECTED CITY] WITH GLS ACTIVE STATUS & ORDERS
# ==============================================================================
active_city = st.session_state.get("selected_city", "New York")

city_stores = df_store_clean[
    ((df_store_clean["City"].astype(str).str.strip().str.lower() == active_city.lower()) |
     (df_store_clean["Address"].astype(str).str.contains(active_city, case=False, na=False))) &
    (df_store_clean["Clean_Reviews"] >= min_reviews)
].copy()

if city_stores.empty:
    st.warning(f"No stores found in **'{active_city}'** matching Minimum Reviews ≥ {min_reviews}.")
else:
    # Spatial Reach Calculations
    store_miles = np.column_stack((city_stores["Latitude"].values * 69.0, city_stores["Longitude"].values * 52.0))
    covered_indices = set()
    crowd_counts = []

    for s_pt in store_miles:
        indices = cust_tree.query_ball_point(s_pt, r=radius_miles)
        crowd_counts.append(len(indices))
        covered_indices.update(indices)

    city_stores["Customer_Crowd"] = crowd_counts
    covered_customers = df_cust.iloc[list(covered_indices)]

    max_crowd = city_stores["Customer_Crowd"].max() if city_stores["Customer_Crowd"].max() > 0 else 1
    max_reviews = city_stores["Clean_Reviews"].max() if city_stores["Clean_Reviews"].max() > 0 else 1

    city_stores["Norm_Crowd"] = (city_stores["Customer_Crowd"] / max_crowd) * 100
    city_stores["Norm_Reviews"] = (city_stores["Clean_Reviews"] / max_reviews) * 100
    city_stores["Rank_Score"] = (0.50 * city_stores["Norm_Crowd"]) + (0.50 * city_stores["Norm_Reviews"])

    # Dynamic Sorting Strategy
    sort_key = "Rank_Score"
    if sort_metric == "Previous Year Orders":
        sort_key = "Prev_Year_Orders"
    elif sort_metric == "Customer Crowd":
        sort_key = "Customer_Crowd"
    elif sort_metric == "Reviews Count":
        sort_key = "Clean_Reviews"

    top_stores = city_stores.sort_values(by=sort_key, ascending=False).head(top_n_stores).reset_index(drop=True)
    best_store = top_stores.iloc[0]

    # Executive Banner
    st.success(
        f"🥇 **MARKET LEADER ({active_city.upper()}): {best_store['Store_Name']}** | "
        f"🟢 **GLS Status:** {best_store['GLS_Status']} | "
        f"📦 **Prev Year Orders:** {int(best_store['Prev_Year_Orders']):,} | "
        f"👥 **Crowd (≤{radius_miles} mi):** {best_store['Customer_Crowd']}"
    )

    pdf_file = generate_pdf_report(active_city, top_stores, len(covered_customers), len(df_cust), best_store)
    st.download_button(
        label="📄 Export Executive PDF Brief",
        data=pdf_file,
        file_name=f"Executive_Brief_{active_city}.pdf",
        mime="application/pdf"
    )

    # Active / Inactive Metrics Summary
    active_cnt = (top_stores["GLS_Status"].astype(str).str.lower().str.contains("active")).sum()
    inactive_cnt = len(top_stores) - active_cnt

    m1, m2, m3, m4, m5 = st.columns(5)
    m1.metric("Selected Market", active_city)
    m2.metric("Filtered Stores", f"Top {len(top_stores)}")
    m3.metric("🟢 GLS Active Stores", active_cnt)
    m4.metric("🔴 Inactive / Non-GLS", inactive_cnt)
    m5.metric("📦 Total Prev Year Orders", f"{int(top_stores['Prev_Year_Orders'].sum()):,}")

    st.subheader(f"📋 Top {top_n_stores} Stores Table — {active_city} (Sorted by {sort_metric})")
    st.caption("👇 **Click any row to focus the Map directly on that store's radius circle.**")

    display_table = top_stores.copy()
    display_table["Rank"] = range(1, len(display_table) + 1)
    display_table["Rank_Score"] = display_table["Rank_Score"].round(1)

    table_cols = ["Rank", "Store_Name", "GLS_Status", "Prev_Year_Orders", "Customer_Crowd", "Clean_Reviews", "Rank_Score", "Address"]
    display_table = display_table[table_cols].rename(columns={
        "Store_Name": "Store Name", 
        "GLS_Status": "GLS Status",
        "Prev_Year_Orders": "Prev Year Orders",
        "Customer_Crowd": f"Customer Crowd (≤{radius_miles} mi)",
        "Clean_Reviews": "Reviews Count", 
        "Rank_Score": "Rank Score (0-100)"
    })

    store_event = st.dataframe(
        display_table, 
        use_container_width=True, 
        hide_index=True, 
        selection_mode="single-row", 
        on_select="rerun", 
        key="store_table_selection"
    )

    if store_event and store_event.selection and store_event.selection["rows"]:
        sel_idx = store_event.selection["rows"][0]
        selected_store = top_stores.iloc[sel_idx]
        sel_name, sel_lat, sel_lng = selected_store["Store_Name"], float(selected_store["Latitude"]), float(selected_store["Longitude"])

        lat_delta = radius_miles / 69.0
        lng_delta = radius_miles / (52.0 * np.cos(np.radians(sel_lat)))
        bounds = [[sel_lat - lat_delta, sel_lng - lng_delta], [sel_lat + lat_delta, sel_lng + lng_delta]]

        if st.session_state["focused_store_name"] != sel_name:
            st.session_state["focused_store_name"] = sel_name
            st.session_state["map_center"] = [sel_lat, sel_lng]
            st.session_state["map_bounds"] = bounds
            st.rerun()

    st.markdown("---")


    # ==============================================================================
    # 3) 🗺️ MARKET COVERAGE & RADIUS MAP — COLOR CONDITIONALIZED BY STATUS
    # ==============================================================================
    st.subheader(f"🗺️ Market Coverage & Radius Map — {active_city}")
    st.caption("🟢 **Green Pin** = GLS Active Store | 🔴 **Red Pin** = Inactive Store | 🔵 **Blue Pin** = Regular Store | 🟡 **Gold Pin** = #1 Ranked Store")
    
    if st.session_state["focused_store_name"]:
        map_stores = top_stores[top_stores["Store_Name"] == st.session_state["focused_store_name"]].copy()
        st.info(f"📍 Displaying focus view for: **{st.session_state['focused_store_name']}**")
    else:
        map_stores = top_stores

    map_center = st.session_state["map_center"] or [float(map_stores["Latitude"].mean()), float(map_stores["Longitude"].mean())]
    m = folium.Map(location=map_center, zoom_start=11, tiles=map_style)

    if st.session_state["map_bounds"]:
        m.fit_bounds(st.session_state["map_bounds"])

    # Render Markers & Coverage Circles with Conditional Coloring
    for rank, (_, store) in enumerate(map_stores.iterrows(), 1):
        s_lat, s_lng = float(store["Latitude"]), float(store["Longitude"])
        status_str = str(store["GLS_Status"]).lower()

        # Color Decision Logic
        if st.session_state["focused_store_name"]:
            icon_color = "purple"
        elif rank == 1:
            icon_color = "gold"
        elif "active" in status_str and "inactive" not in status_str:
            icon_color = "green"  # Active GLS Store
        elif "inactive" in status_str or "closed" in status_str:
            icon_color = "red"    # Inactive GLS Store
        else:
            icon_color = "blue"   # Standard Store

        folium.Marker(
            location=[s_lat, s_lng],
            popup=f"<b>{store['Store_Name']}</b><br>Status: {store['GLS_Status']}<br>Orders: {int(store['Prev_Year_Orders']):,}",
            tooltip=f"{store['Store_Name']} ({store['GLS_Status']} | Orders: {int(store['Prev_Year_Orders']):,})",
            icon=folium.Icon(color=icon_color, icon="shopping-cart", prefix="fa")
        ).add_to(m)

        folium.Circle(
            location=[s_lat, s_lng],
            radius=radius_miles * 1609.34,
            color="#00FF00" if icon_color == "green" else ("#FF0000" if icon_color == "red" else "#1F4E78"),
            fill=True,
            fill_opacity=0.10
        ).add_to(m)

    # Render What-If Simulator Marker
    if enable_what_if and sim_lat and sim_lng:
        sim_pt = np.array([[sim_lat * 69.0, sim_lng * 52.0]])
        sim_indices = set(cust_tree.query_ball_point(sim_pt[0], r=radius_miles))
        sim_crowd = len(sim_indices)
        new_incremental = sim_indices - covered_indices
        
        folium.Marker(
            location=[sim_lat, sim_lng],
            popup=f"<b>PROPOSED STORE: {sim_name}</b><br>Projected Reach: {sim_crowd}",
            tooltip=f"🧪 PROPOSED: {sim_name} (+{len(new_incremental)} New Customers)",
            icon=folium.Icon(color="darkgreen", icon="plus-circle", prefix="fa")
        ).add_to(m)

        folium.Circle(
            location=[sim_lat, sim_lng],
            radius=radius_miles * 1609.34,
            color="#00FF00",
            weight=3,
            fill=True,
            fill_opacity=0.15
        ).add_to(m)

    if not covered_customers.empty:
        cust_pts = covered_customers[["Latitude", "Longitude"]].values.tolist()
        if show_heatmap:
            HeatMap(cust_pts, radius=12, blur=10).add_to(m)
        else:
            FastMarkerCluster(data=cust_pts).add_to(m)

    map_data = st_folium(m, width=1300, height=520, key="store_map")

    if st.session_state["focused_store_name"] or st.session_state["map_center"]:
        if st.button("🔄 Reset Store Focus (Show All Stores)"):
            st.session_state["focused_store_name"] = None
            st.session_state["map_center"] = None
            st.session_state["map_bounds"] = None
            st.rerun()

    st.markdown("---")


    # ==============================================================================
    # 4) COMPARATIVE STORE ANALYTICS (WITH PREVIOUS YEAR ORDERS)
    # ==============================================================================
    st.subheader(f"📈 Comparative Store Analytics & Order Volume — {active_city}")

    c1, c2 = st.columns(2)

    with c1:
        fig_orders = px.bar(
            map_stores,
            x="Store_Name",
            y="Prev_Year_Orders",
            color="GLS_Status",
            title="Previous Year Orders Volume per Store",
            labels={"Store_Name": "Store Name", "Prev_Year_Orders": "Previous Year Orders"},
            text_auto=True
        )
        fig_orders.update_layout(xaxis_tickangle=-45)
        st.plotly_chart(fig_orders, use_container_width=True)

    with c2:
        fig_scatter = px.scatter(
            map_stores,
            x="Prev_Year_Orders",
            y="Customer_Crowd",
            size="Rank_Score",
            color="GLS_Status",
            hover_name="Store_Name",
            title="Previous Year Orders vs. Customer Crowd Reach",
            labels={"Prev_Year_Orders": "Previous Year Orders", "Customer_Crowd": "Customer Crowd Count"}
        )
        st.plotly_chart(fig_scatter, use_container_width=True)


    # ==============================================================================
    # 5) CANNIBALIZATION & WHITE SPACE OPPORTUNITIES
    # ==============================================================================
    st.markdown("---")
    st.subheader("⚠️ Store Cannibalization & Overlap Inspector")

    overlap_matrix = []
    store_pts = [np.array([r["Latitude"]*69.0, r["Longitude"]*52.0]) for _, r in top_stores.iterrows()]
    store_customer_sets = [set(cust_tree.query_ball_point(pt, r=radius_miles)) for pt in store_pts]

    for i in range(len(top_stores)):
        for j in range(i + 1, len(top_stores)):
            set_a, set_b = store_customer_sets[i], store_customer_sets[j]
            overlap_count = len(set_a.intersection(set_b))
            if overlap_count > 0 and len(set_a) > 0:
                pct_a = (overlap_count / len(set_a)) * 100
                if pct_a >= 15:
                    overlap_matrix.append({
                        "Store A": top_stores.iloc[i]["Store_Name"],
                        "Store B": top_stores.iloc[j]["Store_Name"],
                        "Shared Customers": overlap_count,
                        "Cannibalization Rate (% of Store A)": f"{pct_a:.1f}%"
                    })

    if overlap_matrix:
        st.dataframe(pd.DataFrame(overlap_matrix), use_container_width=True, hide_index=True)
    else:
        st.success("✅ Clean market separation! No significant store cannibalization detected in this region.")

    st.markdown("---")
    st.subheader(f"🎯 Underserved Customer ZIP Codes in {active_city} (White Space Opportunities)")

    unserved_customers = df_cust[~df_cust.index.isin(covered_indices)]
    if not unserved_customers.empty:
        unserved_zips = unserved_customers["Zip"].value_counts().head(5).reset_index().rename(columns={"Zip": "ZIP Code", "count": "Unserved Customer Count"})
        
        cu1, cu2 = st.columns([1, 2])
        with cu1:
            st.metric("Unserved Population", len(unserved_customers), delta=f"-{(len(unserved_customers)/len(df_cust))*100:.1f}% Unreached")
            st.dataframe(unserved_zips, use_container_width=True, hide_index=True)
        with cu2:
            st.caption("💡 Target expansion in these unserved ZIP codes to capture maximum incremental audience without cannibalizing existing stores.")
    else:
        st.success("🎉 Complete market coverage achieved! 100% of customers are within reach.")