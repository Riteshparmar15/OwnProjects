import time
import pandas as pd
from geopy.geocoders import Nominatim
from geopy.extra.rate_limiter import RateLimiter

class GeocodeService:
    def __init__(self, user_agent="store_finder_app"):
        self.geolocator = Nominatim(user_agent=user_agent)
        self.geocode_cached = RateLimiter(self.geolocator.geocode, min_delay_seconds=1.0)
        self.cache = {}

    def fetch_coordinates(self, address_str):
        clean_addr = str(address_str or "").strip()
        if not clean_addr or clean_addr == "-":
            return None, None

        if clean_addr in self.cache:
            return self.cache[clean_addr]

        try:
            location = self.geocode_cached(clean_addr)
            if location:
                res = (location.latitude, location.longitude)
                self.cache[clean_addr] = res
                return res
        except Exception:
            pass

        return None, None

    def process_gls_batch(self, df_gls):
        """Processes GLS Active Store DataFrame and populates missing Latitudes and Longitudes."""
        df = df_gls.copy()
        success_count = 0

        for idx, row in df.iterrows():
            lat = row.get("Latitude")
            lng = row.get("Longitude")

            if pd.notna(lat) and pd.notna(lng) and str(lat) != "" and str(lng) != "":
                continue

            address = str(row.get("Address", "")).strip()
            if not address or address == "-":
                continue

            c_lat, c_lng = self.fetch_coordinates(address)
            if c_lat is not None and c_lng is not None:
                df.at[idx, "Latitude"] = c_lat
                df.at[idx, "Longitude"] = c_lng
                success_count += 1
                time.sleep(0.1)
            else:
                df.at[idx, "Latitude"] = "Address Not Recognized"
                df.at[idx, "Longitude"] = "Address Not Recognized"

        return df, success_count