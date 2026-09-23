import numpy as np
import pandas as pd

STATE_NAME_MAP = {
    "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California",
    "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "FL": "Florida", "GA": "Georgia",
    "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa",
    "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland",
    "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri",
    "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey",
    "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio",
    "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina",
    "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont",
    "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming",
    "GJ": "Gujarat", "MH": "Maharashtra", "DL": "Delhi", "KA": "Karnataka", "TN": "Tamil Nadu"
}

def format_state_name(val):
    if pd.isna(val) or not str(val).strip():
        return "N/A"
    clean = str(val).strip().upper()
    if clean in STATE_NAME_MAP:
        return f"{clean} ({STATE_NAME_MAP[clean]})"
    return str(val).strip()

def canon(val):
    return "".join(e for e in str(val or "").lower() if e.isalnum())

def to_zip5(val):
    if pd.isna(val):
        return ""
    s = "".join(e for e in str(val).split("-")[0] if e.isdigit())
    if len(s) > 0 and len(s) < 5:
        s = s.zfill(5)
    return s[:5]

def haversine_vectorized(lat1, lon1, lat2_array, lon2_array):
    """Calculates distances in miles between a store coordinate and an array of customer coordinates."""
    R = 3958.8  # Earth radius in miles
    lat1, lon1, lat2_array, lon2_array = map(np.radians, [lat1, lon1, lat2_array, lon2_array])
    dlat = lat2_array - lat1
    dlon = lon2_array - lon1
    a = np.sin(dlat / 2.0) ** 2 + np.cos(lat1) * np.cos(lat2_array) * np.sin(dlon / 2.0) ** 2
    return R * 2 * np.arcsin(np.sqrt(a))

def run_store_analysis(df_cust, df_store, df_gls, radius_miles=10.0, gls_proximity_meters=75.0):
    # Pre-process Customer DataFrame
    df_cust["Formatted_State"] = df_cust["State"].apply(format_state_name)
    df_cust["Clean_City"] = df_cust["City"].astype(str).str.strip()
    df_cust["Clean_Zip"] = df_cust["Zip"].apply(to_zip5)
    
    valid_cust = df_cust.dropna(subset=["Latitude", "Longitude"]).copy()
    cust_lats = valid_cust["Latitude"].values
    cust_lngs = valid_cust["Longitude"].values

    # Pre-process GLS DataFrame
    gls_map = {}
    gls_coords_list = []
    
    for idx, row in df_gls.iterrows():
        g_name = str(row.get("Store Name", ""))
        g_zip = to_zip5(row.get("ZipCode"))
        g_status = str(row.get("Status", "Active")).strip()
        
        if g_name and g_zip:
            gls_map[f"{canon(g_name)}|{g_zip}"] = g_status
            
        try:
            glat = float(row.get("Latitude"))
            glng = float(row.get("Longitude"))
            if not np.isnan(glat) and not np.isnan(glng):
                gls_coords_list.append((glat, glng, g_status))
        except (ValueError, TypeError):
            pass

    def get_gls_status(name, zip_val, lat, lng):
        key = f"{canon(name)}|{to_zip5(zip_val)}"
        if key in gls_map:
            return gls_map[key]
        
        if lat is not None and lng is not None and not np.isnan(lat) and not np.isnan(lng):
            for glat, glng, gstat in gls_coords_list:
                dist_m = haversine_vectorized(lat, lng, np.array([glat]), np.array([glng]))[0] * 1609.344
                if dist_m <= gls_proximity_meters:
                    return gstat if gstat else "Inactive"
        return "N/A on GLS"

    # Store Customer Coverage Computation
    results = []
    for idx, row in df_store.iterrows():
        s_name = str(row.get("Stadium Name", row.get("Store Name", "Unnamed Store")))
        s_addr = str(row.get("Address", ""))
        s_city = str(row.get("City", ""))
        s_state = format_state_name(row.get("State"))
        s_zip = to_zip5(row.get("PostalCode", row.get("Zip")))

        rating_val = str(row.get("Rating", "")).strip() if pd.notna(row.get("Rating")) else ""
        review_val = str(row.get("Reviews", "")).strip() if pd.notna(row.get("Reviews")) else ""
        
        try:
            raw_review_cnt = int("".join(filter(str.isdigit, review_val)))
        except ValueError:
            raw_review_cnt = 0

        review_info = "N/A"
        if rating_val or review_val:
            part1 = f"{rating_val} Rating" if rating_val else ""
            part2 = f"({review_val} reviews)" if review_val else ""
            review_info = f"{part1} {part2}".strip()

        s_lat = float(row.get("Latitude")) if pd.notna(row.get("Latitude")) else None
        s_lng = float(row.get("Longitude")) if pd.notna(row.get("Longitude")) else None

        covered_customers = 0
        if s_lat is not None and s_lng is not None and len(cust_lats) > 0:
            distances = haversine_vectorized(s_lat, s_lng, cust_lats, cust_lngs)
            covered_customers = int(np.sum(distances <= radius_miles))

        gls_status = get_gls_status(s_name, s_zip, s_lat, s_lng)

        results.append({
            "Store Name": s_name,
            "Store City": s_city,
            "State": s_state,
            "Customers Covered (<=10 mi)": covered_customers,
            "Store Rating & Reviews": review_info,
            "Review Count": raw_review_cnt,
            "Address": s_addr,
            "GLS Status": gls_status,
            "Latitude": s_lat,
            "Longitude": s_lng
        })

    df_res = pd.DataFrame(results)
    df_res = df_res.sort_values(by="Customers Covered (<=10 mi)", ascending=False).reset_index(drop=True)
    return df_res, df_cust