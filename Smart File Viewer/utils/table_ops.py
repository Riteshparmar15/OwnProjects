import pandas as pd
import io

def search_df(df, query):
    if not query:
        return df
    mask = df.apply(lambda row: row.astype(str).str.contains(query, case=False).any(), axis=1)
    return df[mask]

def filter_df(df, column, value):
    if column and value:
        return df[df[column].astype(str) == str(value)]
    return df

def convert_to_csv(df):
    return df.to_csv(index=False).encode("utf-8")

def convert_to_excel(df):
    output = io.BytesIO()
    with pd.ExcelWriter(output, engine="xlsxwriter") as writer:
        df.to_excel(writer, index=False, sheet_name="Sheet1")
    return output.getvalue()