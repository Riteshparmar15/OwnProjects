import os
import streamlit as st
import pandas as pd
from utils.table_ops import search_df, filter_df, convert_to_csv, convert_to_excel
from utils.file_handler import load_multiple_files

# MUST be the first Streamlit command
st.set_page_config(page_title="Smart Table Viewer", page_icon="📊", layout="wide")

# Safe CSS loading
css_path = os.path.join(os.path.dirname(__file__), "assets", "style.css")
if os.path.exists(css_path):
    with open(css_path) as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

st.title("📊 Smart Table Viewer")
st.caption("Upload, search, filter, and export your data — fast.")

uploaded_files = st.file_uploader(
    "Upload CSV/Excel files",
    type=["csv", "xlsx", "xls"],
    accept_multiple_files=True
)

if uploaded_files:
    data = load_multiple_files(uploaded_files)

    if not data:
        st.warning("No valid files could be read. Please check the file format.")
    else:
        # Combine option (only show if more than 1 file uploaded)
        combine_mode = False
        if len(data) > 1:
            combine_mode = st.checkbox("🔗 Combine all uploaded files into one table")

        if combine_mode:
            try:
                df = pd.concat(data.values(), ignore_index=True)
                st.success(f"Combined {len(data)} files into one table ({len(df)} total rows).")
            except Exception as e:
                st.error(f"Could not combine files — columns may not match. Error: {e}")
                st.stop()
        else:
            selected = st.selectbox("Select a file to view", list(data.keys()))
            df = data[selected]

        # ✅ Data Summary — placed here, AFTER df exists
        with st.expander("📊 Data Summary", expanded=False):
            c1, c2, c3 = st.columns(3)
            c1.metric("Rows", len(df))
            c2.metric("Columns", len(df.columns))
            c3.metric("Missing Values", int(df.isnull().sum().sum()))
            st.write("**Column Types:**")
            st.dataframe(df.dtypes.astype(str).reset_index().rename(columns={"index": "Column", 0: "Type"}))

        # Search
        search_query = st.text_input("🔍 Search table")
        df = search_df(df, search_query)

        # Filter
        col1, col2 = st.columns(2)
        with col1:
            filter_col = st.selectbox("Filter column (optional)", [""] + list(df.columns))
        with col2:
            filter_val = st.text_input("Filter value") if filter_col else None
        if filter_col and filter_val:
            df = filter_df(df, filter_col, filter_val)

        # View mode
        view_mode = st.radio("View Mode", ["Compact", "Full View"], horizontal=True)
        height = 600 if view_mode == "Full View" else 400
        st.dataframe(df, use_container_width=True, height=height)

        # Download
        d1, d2 = st.columns(2)
        with d1:
            st.download_button("⬇️ Download CSV", convert_to_csv(df), "data.csv", "text/csv")
        with d2:
            st.download_button("⬇️ Download Excel", convert_to_excel(df), "data.xlsx")

        st.caption(f"Showing {len(df)} rows × {len(df.columns)} columns")
else:
    st.info("👆 Upload one or more CSV/Excel files to get started.")