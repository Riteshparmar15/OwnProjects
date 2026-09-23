import pandas as pd
import streamlit as st

def load_file(file):
    """Reads a single uploaded file into a DataFrame."""
    try:
        if file.name.endswith(".csv"):
            return pd.read_csv(file)
        else:
            return pd.read_excel(file)
    except Exception as e:
        st.error(f"Could not read {file.name}: {e}")
        return None

def load_multiple_files(files):
    """Returns a dict {filename: DataFrame}"""
    data = {}
    for f in files:
        df = load_file(f)
        if df is not None:
            data[f.name] = df
    return data