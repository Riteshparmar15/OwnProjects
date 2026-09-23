import streamlit as st
import pandas as pd
import numpy as np
import folium
from streamlit_folium import folium_static
from geopy.geocoders import Nominatim
import math
import time

# Set up clean, professional page configurations
st.set_page_config(
    page_title="Enterprise Location Intelligence & Proximity Dashboard",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom HTML/CSS Styling for an elite executive dashboard appearance
st.markdown("""
    <style>
    .main-header {
        background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
        padding: 30px;
        border-radius: 12px;
        color: white;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin-bottom: 15px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.15);
    }
    .service-feature-box {
        background: #ffffff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 15px;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        transition: transform 0.3s, border-color 0.3s;
    }
    .service-feature-box:hover {
        transform: translateY(-3px);
        border-color: #ffd700;
        box-shadow: 0 4px 12px rgba(255,215,0,0.15);
    }
    .metric-card {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        border-left: 5px solid #2a5298;
        margin-bottom: 15px;
    }
    .champion-card {
        background: linear-gradient(135deg, #fffbf0 0%, #fff3cc 100%);
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(218,165,32,0.15);
        border-left: 5px solid #d4af37;
        margin-bottom: 15px;
    }
    .metric-value {
        font-size: 24px;
        font-weight: bold;
        color: #1e3c72;
    }
    .metric-label {
        font-size: 12px;
        color: #666666;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    .service-badge {
        background-color: #e8f0fe;
        color: #1a73e8;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: bold;
        display: inline-block;
        margin-bottom: 5px;
    }
    </style>
    <div class="main-header">
        <h1 style='margin:0; font-size: 34px;'>Location Proximity & Crowd Intelligence Platform</h1>
        <p style='margin:5px 0 0 0; opacity:0.9; font-size: 16px;'>Unified Cross-Reference Engine for Customer Catchment Zones & Fleet Management</p>
    </div>
""", unsafe_allow_html=True)

# ---------------------------------------------------------------------
# SERVICE LAYER OVERVIEW (HTML / CSS DOCK)
# ---------------------------------------------------------------------
st.markdown("### 🛠️ Active Enterprise Web Services Suite")
feat_col1, feat_col2, feat_col3, feat_col4 = st.columns(4)
with feat_col1:
    st.markdown("""<div class="service-feature-box">
        <span class="service-badge">GEOSPATIAL CORE</span>
        <h4 style="margin:0 0 8px 0; color:#1e3c72;">🌐 Geocoding Engine</h4>
        <p style="margin:0; font-size:13px; color:#555;">OSM Nominatim API converts plain street addresses into hyper-accurate coordinate vectors.</p>
    </div>""", unsafe_allow_html=True)
with feat_col2:
    st.markdown("""<div class="service-feature-box">
        <span class="service-badge">LOGISTICS SCM</span>
        <h4 style="margin:0 0 8px 0; color:#27ae60;">📐 Route Optimizer</h4>
        <p style="margin:0; font-size:13px; color:#555;">Calculates exact 10-mile air distances with a proxy road routing factor for real-time freight delivery tracking.</p>
    </div>""", unsafe_allow_html=True)
with feat_col3:
    st.markdown("""<div class="service-feature-box">
        <span class="service-badge">DEMAND INTELLIGENCE</span>
        <h4 style="margin:0 0 8px 0; color:#d4af37;">👑 Crowd Allocation</h4>
        <p style="margin:0; font-size:13px; color:#555;">Isolates high-footfall hot zones, auto-flagging the Market Champion with distinct styling layout assets.</p>
    </div>""", unsafe_allow_html=True)
with feat_col4:
    st.markdown("""<div class="service-feature-box">
        <span class="service-badge">CUSTOMER BEHAVIOR</span>
        <h4 style="margin:0 0 8px 0; color:#e74c3c;">📈 Channel & Timing Services</h4>
        <p style="margin:0; font-size:13px; color:#555;">Extracts funnel attributes and temporal peaks to anticipate high-traffic periods.</p>
    </div>""", unsafe_allow_html=True)
st.markdown("<br>", unsafe_allow_html=True)

# Math functions for Geographic analysis
def calculate_haversine_distance(lat1, lon1, lat2, lon2):
    """Calculates straight-line air distance using Earth's radius."""
    if pd.isna(lat1) or pd.isna(lon1) or pd.isna(lat2) or pd.isna(lon2):
        return None
    R = 3958.8  # Earth radius in miles
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) ** 2 + 
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

# Cache the data load pipeline for top-tier optimization
@st.cache_data(show_spinner=False)
def load_and_clean_data():
    cust = pd.read_excel('Customers2026 1.xlsx')
    gls = pd.read_csv('GLS Active Store.csv')
    google = pd.read_csv('Google Stores.csv')
    
    google = google.dropna(subset=['Store Name', 'Address']).copy()
    geolocator = Nominatim(user_agent="corporate_proximity_dashboard_2026")
    g_lats, g_lngs = [], []
    
    for _, row in google.iterrows():
        if "Antoine" in row['Store Name']: g_lats.append(29.8184); g_lngs.append(-95.4746)
        elif "Bellfort" in row['Store Name']: g_lats.append(29.6749); g_lngs.append(-95.2981)
        elif "Edgebrook" in row['Store Name']: g_lats.append(29.6385); g_lngs.append(-95.2403)
        elif "Jones Road" in row['Store Name']: g_lats.append(29.9381); g_lngs.append(-95.5901)
        elif "Copperfield" in row['Store Name']: g_lats.append(29.8902); g_lngs.append(-95.6444)
        elif "IAH" in row['Store Name']: g_lats.append(30.0035); g_lngs.append(-95.2642)
        else:
            try:
                query = f"{row['Address']}, {row['City']}, {row['State']}"
                loc = geolocator.geocode(query, timeout=5)
                if loc: g_lats.append(loc.latitude); g_lngs.append(loc.longitude)
                else: g_lats.append(None); g_lngs.append(None)
            except: g_lats.append(None); g_lngs.append(None)
            time.sleep(0.1)
            
    google['Latitude'] = g_lats
    google['Longitude'] = g_lngs
    cust['Zip'] = cust['Zip'].fillna(0).astype(int).astype(str)
    return cust, gls, google

with st.spinner("Processing customer geolocation layers... Please wait..."):
    cust_df, gls_df, google_df = load_and_clean_data()

# =====================================================================
# SIDEBAR MULTILEVEL FILTERS (Drives the Dynamic Metric Panels)
# =====================================================================
st.sidebar.header("🎛️ Geographic Selectors")

available_states = sorted(cust_df['State'].dropna().unique())
selected_state = st.sidebar.selectbox("1. Filter by State", ["All States"] + available_states)

if selected_state != "All States":
    filtered_cities = sorted(cust_df[cust_df['State'] == selected_state]['City'].dropna().unique())
else:
    filtered_cities = sorted(cust_df['City'].dropna().unique())
selected_city = st.sidebar.selectbox("2. Filter by City", ["All Cities"] + filtered_cities)

if selected_city != "All Cities":
    filtered_zips = sorted(cust_df[cust_df['City'] == selected_city]['Zip'].dropna().unique())
elif selected_state != "All States":
    filtered_zips = sorted(cust_df[cust_df['State'] == selected_state]['Zip'].dropna().unique())
else:
    filtered_zips = sorted(cust_df['Zip'].dropna().unique())
selected_zip = st.sidebar.selectbox("3. Filter by Zip Code", ["All Zips"] + filtered_zips)

# Apply filter selections to isolate customer working pool
filtered_cust_df = cust_df.copy()
if selected_state != "All States": 
    filtered_cust_df = filtered_cust_df[filtered_cust_df['State'] == selected_state]
if selected_city != "All Cities": 
    filtered_cust_df = filtered_cust_df[filtered_cust_df['City'] == selected_city]
if selected_zip != "All Zips": 
    filtered_cust_df = filtered_cust_df[filtered_cust_df['Zip'] == selected_zip]

# =====================================================================
# CORE PROXIMITY EXTRACTION LAYER (Fixed 10 Miles Catchment)
# =====================================================================
proximity_records = []
clean_cust = filtered_cust_df.dropna(subset=['Latitude', 'Longitude'])

all_stores = []
for _, r in gls_df.iterrows():
    all_stores.append({'name': r['StoreName'], 'lat': r['Latitude'], 'lng': r['Longitude'], 'type': 'GLS Active Store'})
for _, r in google_df.dropna(subset=['Latitude', 'Longitude']).iterrows():
    all_stores.append({'name': r['Store Name'], 'lat': r['Latitude'], 'lng': r['Longitude'], 'type': 'Google Store'})

for store in all_stores:
    for _, c in clean_cust.iterrows():
        air_dist = calculate_haversine_distance(store['lat'], store['lng'], c['Latitude'], c['Longitude'])
        if air_dist is not None and air_dist <= 10.0:
            name_val = str(c.get('First Name', '')) + " " + str(c.get('Last Name', ''))
            name_val = name_val.strip() if name_val.strip() != "nan nan" else "Unnamed Customer"
            
            proximity_records.append({
                'Store Name': store['name'],
                'Store Type': store['type'],
                'Customer Name': name_val,
                'Customer Address': c['Full Address'],
                'State': c['State'],
                'City': c['City'],
                'Zip': c['Zip'],
                'Latitude': c['Latitude'],
                'Longitude': c['Longitude'],
                'Most Used Store': str(c.get('Store Name', 'Unspecified Store')),
                'Air Miles': air_dist,
                'Road Miles': air_dist * 1.25
            })

prox_df = pd.DataFrame(proximity_records)

# =====================================================================
# DYNAMIC METRICS ANALYSIS ENGINE (Calculated per Sidebar Filter)
# =====================================================================
top_state = selected_state if selected_state != "All States" else "N/A"
top_city = selected_city if selected_city != "All Cities" else "N/A"
top_zip = selected_zip if selected_zip != "All Zips" else "N/A"

store_crowd_counts = {}
google_crowd_counts = {}

if not prox_df.empty:
    store_crowd_counts = prox_df['Store Name'].value_counts().to_dict()
    
    # Isolate metrics purely for Google Stores group to flag maximum address coverage
    google_prox = prox_df[prox_df['Store Type'] == 'Google Store']
    if not google_prox.empty:
        google_crowd_counts = google_prox['Store Name'].value_counts().to_dict()
        
    # Programmatically look up dynamic high-densities if sidebar filters remain open
    if top_state == "N/A" and not prox_df['State'].dropna().empty:
        top_state = prox_df['State'].value_counts().index[0]
    if top_city == "N/A" and not prox_df['City'].dropna().empty:
        top_city = prox_df['City'].value_counts().index[0]
    if top_zip == "N/A" and not prox_df['Zip'].dropna().empty:
        top_zip = prox_df['Zip'].value_counts().index[0]

# High density fleet champions
most_crowded_store_name = max(store_crowd_counts, key=store_crowd_counts.get) if store_crowd_counts else "None Found"
max_customer_count = store_crowd_counts.get(most_crowded_store_name, 0)

top_google_store_name = max(google_crowd_counts, key=google_crowd_counts.get) if google_crowd_counts else "None Found"
max_google_customer_count = google_crowd_counts.get(top_google_store_name, 0)

# =====================================================================
# TOP PANEL: DYNAMIC DEMOGRAPHIC & MAX GOOGLE INTERCEPT METRICS
# =====================================================================
st.markdown("### 📊 Active Filter Boundaries & Enterprise Performance Indicators")
col_m1, col_m2, col_m3, col_m4 = st.columns(4)

with col_m1:
    st.markdown(f"<div class='metric-card' style='border-left-color: #27ae60;'><div class='metric-value'>{top_state}</div><div class='metric-label'>📍 Filtered Top State</div></div>", unsafe_allow_html=True)
with col_m2:
    st.markdown(f"<div class='metric-card' style='border-left-color: #27ae60;'><div class='metric-value'>{top_city}</div><div class='metric-label'>🏙️ Filtered Top City</div></div>", unsafe_allow_html=True)
with col_m3:
    st.markdown(f"<div class='metric-card' style='border-left-color: #27ae60;'><div class='metric-value'>{top_zip}</div><div class='metric-label'>📮 Filtered Top Zip Code</div></div>", unsafe_allow_html=True)
with col_m4:
    st.markdown(f"<div class='champion-card'><div class='metric-value' style='color:#1a73e8;'>⭐ {max_google_customer_count:,}</div><div class='metric-label'>Google Max Address Cover ({top_google_store_name})</div></div>", unsafe_allow_html=True)

# ---------------------------------------------------------------------
# MULTI-TAB INTELLIGENCE PLATFORM LAYOUT
# ---------------------------------------------------------------------
tab1, tab2, tab3, tab4, tab5 = st.tabs([
    "🗺️ Geospatial Intelligence Map", 
    "📊 Proximity & Name-Wise Address Matrix", 
    "📈 Fleet Crowd Demand Benchmarks",
    "🛍️ Omni-Channel & Traffic Timing Services",
    "⚡ Automated Operational SCM Services"
])

with tab1:
    st.subheader("Interactive Proximity Footprint Map Layer")
    st.write("🟢 **Green Dots** represent customer addresses. 🔴 **Red Markers** represent GLS Locations. 🔵 **Blue Markers** represent Google Locations.")
    st.write("👑 The Top GLS Fleet Leader contains a **Crown Icon**. ⭐ The Top Address Covering Google Store contains a **Star Icon**.")
    
    m = folium.Map(location=[29.7604, -95.3698], zoom_start=10, tiles="CartoDB positron")
    
    # Map marker logic (Keeping group colors locked: GLS=Red, Google=Blue)
    for s in all_stores:
        is_absolute_champion = (s['name'] == most_crowded_store_name)
        is_google_champion = (s['name'] == top_google_store_name and s['type'] == 'Google Store')
        assigned_count = store_crowd_counts.get(s['name'], 0)
        
        if s['type'] == 'GLS Active Store':
            marker_color = 'red'
            circle_color = '#d35400'
            icon_shape = 'crown' if is_absolute_champion else 'shopping-cart'
            badge_text = "👑 (FLEET CHAMPION)" if is_absolute_champion else ""
            stroke_weight = 3 if is_absolute_champion else 1
        else:
            marker_color = 'blue'
            circle_color = '#2980b9'
            icon_shape = 'star' if is_google_champion else 'shopping-cart'
            badge_text = "⭐ (MAX GOOGLE COVERAGE)" if is_google_champion else ""
            stroke_weight = 3 if is_google_champion else 1

        folium.Marker(
            location=[s['lat'], s['lng']],
            popup=f"<b>STORE NAME:</b> {s['name']}<br><b>BRAND GROUP:</b> {s['type']}<br><b>TOTAL NEARBY CUSTOMERS:</b> {assigned_count:,} {badge_text}",
            tooltip=f"{s['name']} ({assigned_count} Cust)",
            icon=folium.Icon(color=marker_color, icon=icon_shape, prefix='fa')
        ).add_to(m)
        
        folium.Circle(
            location=[s['lat'], s['lng']],
            radius=16093.4,  # 10 miles radius
            color=circle_color,
            fill=True,
            fill_opacity=0.15 if (is_absolute_champion or is_google_champion) else 0.05,
            weight=stroke_weight
        ).add_to(m)
        
    sample_cust = prox_df.head(400)
    for _, c in sample_cust.iterrows():
        most_used = c['Most Used Store'] if c['Most Used Store'] != 'nan' else 'None Specified'
        
        hover_info = f"""
        👤 Customer Name: {c['Customer Name']}<br>
        📍 Full Address: {c['Customer Address']}<br>
        🏬 Linked Catchment Store: {c['Store Name']}<br>
        🏪 Most Used Store Field: <b>{most_used}</b><br>
        📏 Distance Metric: {round(c['Air Miles'], 2)} Air Mi / {round(c['Road Miles'], 2)} Road Mi
        """
        
        folium.CircleMarker(
            location=[c['Latitude'], c['Longitude']],
            radius=4,
            color='#27ae60',
            fill=True,
            fill_color='#27ae60',
            fill_opacity=0.7,
            tooltip=folium.Tooltip(hover_info, sticky=True)
        ).add_to(m)
        
    folium_static(m, width=1100, height=550)

with tab2:
    st.subheader("🔍 Demographic Clusters & High-Density Proximity Data")
    
    c_left, c_right = st.columns(2)
    with c_left:
        st.write("### 👥 Top Name-Wise Addresses (Most Repeated in Filter Bounds)")
        if not prox_df.empty:
            name_address_series = prox_df['Customer Name'] + " — (" + prox_df['Customer Address'] + ")"
            summary_df = name_address_series.value_counts().reset_index()
            summary_df.columns = ['Unique Consumer Identity & Address Profile', 'Calculated Record Counts']
            st.dataframe(summary_df.head(10), use_container_width=True)
        else:
            st.info("No matching records found within the current filter scope.")
            
    with c_right:
        st.write("### Most Repeated Zip Codes Across Base File")
        st.dataframe(cust_df['Zip'].value_counts().head(10), use_container_width=True)
        
    st.markdown("---")
    st.subheader("📐 Logistics Boundary SCM Calculator (Closest vs Farthest Travel Paths)")
    
    store_summaries = []
    if not prox_df.empty:
        for store_name in prox_df['Store Name'].unique():
            sub = prox_df[prox_df['Store Name'] == store_name]
            closest = sub.loc[sub['Air Miles'].idxmin()]
            farthest = sub.loc[sub['Air Miles'].idxmax()]
            
            store_summaries.append({
                'Store Name Identification': store_name,
                'Fleet Operations Group': sub.iloc[0]['Store Type'],
                'Catchment Population (<10mi)': len(sub),
                'Minimum Distance Air (Mi)': round(closest['Air Miles'], 2),
                'Minimum Distance Road (Mi)': round(closest['Road Miles'], 2),
                'Maximum Distance Air (Mi)': round(farthest['Air Miles'], 2),
                'Maximum Distance Road (Mi)': round(farthest['Road Miles'], 2),
            })
        st.dataframe(pd.DataFrame(store_summaries), use_container_width=True)

with tab3:
    st.subheader("🏬 Store Footfall Volume & Density Benchmarks")
    
    if not prox_df.empty:
        crowd_counts = prox_df['Store Name'].value_counts().reset_index()
        crowd_counts.columns = ['Store Name', 'Active Customer Density Count']
        
        type_map = prox_df.drop_duplicates(subset=['Store Name']).set_index('Store Name')['Store Type'].to_dict()
        crowd_counts['Store Type'] = crowd_counts['Store Name'].map(type_map)
        
        st.success(f"🏆 **Fleet Recommendation Matrix:** The absolute **most crowded storefront** across all channels within your current geographical filter parameters is **{most_crowded_store_name}** ({type_map.get(most_crowded_store_name, 'N/A')}) with **{max_customer_count:,}** local users caught inside its 10-mile radius!")
        
        if top_google_store_name != "None Found":
            st.info(f"🚀 **Google Channel Optimization Target:** The specific **Google Store location** managing the highest address concentration is **{top_google_store_name}** with **{max_google_customer_count:,}** mapped customer points.")

        st.bar_chart(data=crowd_counts, x='Store Name', y='Active Customer Density Count', color='#2a5298')
        st.dataframe(crowd_counts[['Store Name', 'Store Type', 'Active Customer Density Count']], use_container_width=True)

with tab4:
    st.subheader("📈 Digital Channel Funnels & Dynamic SCM Traffic Signals")
    
    f_col1, f_col2 = st.columns(2)
    with f_col1:
        st.write("### 🌐 Dynamic Funnel Breakdown (`Request Source` Leads)")
        if 'Request Source' in filtered_cust_df.columns:
            source_counts = filtered_cust_df['Request Source'].value_counts().reset_index()
            source_counts.columns = ['Platform Acquisition Channel', 'Total Lead Volume']
            st.bar_chart(data=source_counts, x='Platform Acquisition Channel', y='Total Lead Volume', color='#2c3e50')
            st.dataframe(source_counts, use_container_width=True)
            
    with f_col2:
        st.write("### ⏰ Daily SCM Operations Peak Forecaster")
        if 'Date' in filtered_cust_df.columns:
            try:
                sample_dates = pd.to_datetime(filtered_cust_df['Date'].head(5000), errors='coerce').dropna()
                hours = sample_dates.dt.hour.value_counts().reset_index().sort_values(by='hour')
                hours.columns = ['Hour of Day (24h format)', 'Activity Weight Index']
                st.line_chart(data=hours, x='Hour of Day (24h format)', y='Activity Weight Index', color='#e74c3c')
            except:
                st.info("Dynamic timeline engine preparing historical records matrix...")

with tab5:
    st.subheader("⚡ Automated Operational Business Services")
    
    serv_tab1, serv_tab2, serv_tab3, serv_tab4 = st.tabs([
        "📦 Stock Inventory Allocator", 
        "🚚 Route SCM Transit Optimizer", 
        "🎯 Hyper-Local Campaign Builder",
        "🚀 Store Expansion Risk Engine"
    ])
    
    with serv_tab1:
        st.write("### Smart Stock Allocation Share Calculations")
        if not prox_df.empty:
            alloc_records = []
            total_density = sum(store_crowd_counts.values())
            for name, count in store_crowd_counts.items():
                alloc_pct = (count / total_density) * 100 if total_density > 0 else 0
                if name == most_crowded_store_name:
                    status = "🔥 CRITICAL DEMAND (Max Share)" 
                elif name == top_google_store_name:
                    status = "⭐ GOOGLE LEADER (High Priority)"
                else:
                    status = "🟢 Stable Stock Operations"
                    
                alloc_records.append({
                    "Target Store Location": name,
                    "Channel Group Type": type_map.get(name, "N/A"),
                    "Calculated Footfall Density": count,
                    "Recommended Inventory Share": f"{round(alloc_pct, 1)}%",
                    "Operational Action Flag": status
                })
            st.table(pd.DataFrame(alloc_records))
            
    with serv_tab2:
        st.write("### Fleet Route Logistics & Time-to-Serve Estimates")
        if not prox_df.empty:
            avg_miles = prox_df.groupby('Store Name')['Road Miles'].mean().reset_index()
            avg_miles.columns = ['Store Name Location', 'Mean Delivery Path (Road Miles)']
            avg_miles['Estimated Transit Duration (Mins)'] = round((avg_miles['Mean Delivery Path (Road Miles)'] / 35) * 60, 1)
            st.dataframe(avg_miles, use_container_width=True)
            
    with serv_tab3:
        st.write("### Target Marketing Campaign Automation Engine")
        if not filtered_cust_df.empty:
            top_zip_code = filtered_cust_df['Zip'].value_counts().index[0]
            top_city_target = filtered_cust_df['City'].value_counts().index[0]
            
            st.info(f"👉 **Automated Dynamic Ad Copy for Highest Cluster Zone ({top_city_target}):**")
            st.code(f"""
Subject: Special Local Offer for our {top_city_target} Partners! 🛍️

Hello! We noticed your operations are centered near our high-density hubs in the {top_zip_code} region. 
Visit your nearest service point today to explore our new hardware arrivals. 
Present this message at checkout to redeem your regional client discount value!
            """, language="markdown")

    with serv_tab4:
        st.write("### 🚀 Strategic Market Expansion Gap Matrix")
        if not prox_df.empty:
            covered_addresses = set(prox_df['Customer Address'].unique())
            uncovered_df = filtered_cust_df[~filtered_cust_df['Full Address'].isin(covered_addresses)]
            
            if not uncovered_df.empty and not uncovered_df['City'].dropna().empty:
                gap_cities = uncovered_df['City'].value_counts().reset_index().head(5)
                gap_cities.columns = ['Unserved City Location Gap', 'Isolated Customer Volume Base']
                st.warning("⚠️ High commercial concentrations identified in the following zones with no service footprint coverage:")
                st.dataframe(gap_cities, use_container_width=True)
            else:
                st.success("All customer nodes inside the active filter set are successfully intercepted within a 10-mile radius.")