import json
import os
import re
from pathlib import Path

import pandas as pd
import streamlit as st
from werkzeug.utils import secure_filename

DATA_FILE = "current_data.xlsx"
ATTENDANCE_FILE = "attendance_data.json"
FEE_HISTORY_FILE = "fee_history.json"
PHOTO_STORE_FILE = "student_photos.json"
UPLOAD_FOLDER = Path("static/uploads")
DEFAULT_CLASS_CAPACITY = 25

st.set_page_config(page_title="Little Sprouts Preschool", page_icon="🌻", layout="wide")


def ensure_storage():
    UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)
    for file_path in [ATTENDANCE_FILE, FEE_HISTORY_FILE, PHOTO_STORE_FILE]:
        if not os.path.exists(file_path):
            with open(file_path, "w", encoding="utf-8") as handle:
                json.dump({}, handle)


def load_data():
    ensure_storage()
    if not os.path.exists(DATA_FILE):
        return pd.DataFrame()
    return pd.read_excel(DATA_FILE)


def save_data(df):
    ensure_storage()
    df.to_excel(DATA_FILE, index=False)


def guess_column(df, keywords):
    for col in df.columns:
        for kw in keywords:
            if kw.lower() in str(col).lower():
                return col
    return None


def load_json_store(file_path):
    if not os.path.exists(file_path):
        return {}
    with open(file_path, "r", encoding="utf-8") as handle:
        return json.load(handle)


def save_json_store(file_path, data):
    with open(file_path, "w", encoding="utf-8") as handle:
        json.dump(data, handle, indent=2)


def save_student_photo(row_id, uploaded_file):
    if not uploaded_file or not uploaded_file.name:
        return None
    filename = secure_filename(uploaded_file.name)
    extension = os.path.splitext(filename)[1] or ".jpg"
    saved_name = f"student_{row_id}{extension}"
    saved_path = UPLOAD_FOLDER / saved_name
    with saved_path.open("wb") as handle:
        handle.write(uploaded_file.getbuffer())
    return os.path.join("uploads", saved_name)


def save_student_photo_reference(row_id, photo_path):
    store = load_json_store(PHOTO_STORE_FILE)
    if photo_path:
        store[str(row_id)] = photo_path
    else:
        store.pop(str(row_id), None)
    save_json_store(PHOTO_STORE_FILE, store)


def get_student_photo(row_id):
    store = load_json_store(PHOTO_STORE_FILE)
    return store.get(str(row_id))


def build_summary(df):
    name_col = guess_column(df, ["name"])
    class_col = guess_column(df, ["class", "grade", "section", "room"])
    fee_col = guess_column(df, ["fee", "payment"])
    total_students = len(df)
    class_counts = df[class_col].astype(str).value_counts().to_dict() if class_col else {}
    total_classes = len(class_counts) if class_counts else 0
    fee_summary = {}
    fee_paid_pct = 0
    if fee_col and total_students:
        fee_summary = df[fee_col].astype(str).value_counts().to_dict()
        paid_count = sum(v for k, v in fee_summary.items() if str(k).strip().lower() in ("paid", "yes", "y", "done"))
        fee_paid_pct = int(round((paid_count / total_students) * 100)) if total_students else 0
    return name_col, class_col, fee_col, total_students, class_counts, total_classes, fee_summary, fee_paid_pct


def parse_name_list(raw_value):
    if not raw_value:
        return []
    return [item.strip() for item in re.split(r"[\n,]+", raw_value) if item.strip()]


def render_dashboard(df):
    name_col, class_col, fee_col, total_students, class_counts, total_classes, fee_summary, fee_paid_pct = build_summary(df)
    st.title("🌻 Little Sprouts Preschool")
    st.subheader("Welcome to the Streamlit portal")

    col1, col2, col3, col4 = st.columns(4)
    col1.metric("Students", total_students)
    col2.metric("Classes", total_classes)
    col3.metric("Fees Paid", f"{fee_paid_pct}%")
    col4.metric("Capacity Alert", "On")

    st.markdown("---")
    left, right = st.columns(2)
    with left:
        st.write("### Class Distribution")
        if class_counts:
            st.bar_chart(class_counts)
        else:
            st.info("Upload a sheet with a class column to see distribution.")
    with right:
        st.write("### Fee Summary")
        if fee_summary:
            st.table(pd.DataFrame(list(fee_summary.items()), columns=[fee_col or "Status", "Count"]))
        else:
            st.info("No fee status information found yet.")

    st.markdown("---")
    st.write("### Quick actions")
    st.caption("Use the sidebar to add a student, view the roster, log attendance, or open the parent portal.")


def render_students(df):
    name_col, class_col, fee_col, _, _, _, _, _ = build_summary(df)
    st.title("🧒 Student Management")

    if df.empty:
        st.info("Upload an Excel sheet first to start managing students.")
        return

    search = st.text_input("Search by student name")
    filtered = df.copy()
    if name_col and search:
        filtered = filtered[filtered[name_col].astype(str).str.lower().str.contains(search.lower(), na=False)]

    st.dataframe(filtered, use_container_width=True, hide_index=True)

    st.markdown("---")
    st.subheader("Add or update student")
    selected_name = None
    if name_col and name_col in df.columns:
        student_options = ["New Student"] + [str(value) for value in df[name_col].dropna().astype(str)]
        selected_name = st.selectbox("Choose student to edit", student_options)

    with st.form("student_form"):
        st.write("Fill the student details below")
        inputs = {}
        for col in df.columns:
            if col.lower().startswith("date") or "dob" in col.lower() or "date" in col.lower():
                inputs[col] = st.text_input(col, value="")
            else:
                inputs[col] = st.text_input(col, value="")
        photo_file = st.file_uploader("Student photo", type=["png", "jpg", "jpeg"])
        submitted = st.form_submit_button("Save Student")
        if submitted:
            new_row = {col: inputs[col].strip() for col in df.columns}
            if name_col and not new_row.get(name_col):
                st.error(f"{name_col} is required")
                st.stop()
            if selected_name and selected_name != "New Student" and name_col in df.columns:
                row_id = df.index[df[name_col].astype(str) == selected_name][0]
                for col in df.columns:
                    df.loc[row_id, col] = new_row[col]
            else:
                df = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)
                row_id = len(df) - 1
                if photo_file:
                    photo_path = save_student_photo(row_id, photo_file)
                    save_student_photo_reference(row_id, photo_path)
            save_data(df)
            st.success("Student saved successfully")
            st.rerun()

    if selected_name and selected_name != "New Student" and name_col in df.columns:
        row_id = df.index[df[name_col].astype(str) == selected_name][0]
        row_data = df.loc[row_id].to_dict()
        st.subheader("Student Detail")
        st.write(row_data)
        photo_path = get_student_photo(row_id)
        if photo_path:
            st.image(os.path.join("static", photo_path), width=180)


def render_attendance(df):
    st.title("📅 Attendance Tracking")
    if df.empty:
        st.info("Upload data first to log attendance.")
        return

    class_col = guess_column(df, ["class", "grade", "section", "room"])
    name_col = guess_column(df, ["name"])
    classes = sorted({str(v).strip() for v in df[class_col].dropna() if str(v).strip()}) if class_col else []

    with st.form("attendance_form"):
        attendance_date = st.date_input("Date")
        attendance_class = st.selectbox("Class", classes) if classes else st.text_input("Class")
        present_names = st.text_area("Present students")
        absent_names = st.text_area("Absent students")
        submitted = st.form_submit_button("Save attendance")
        if submitted:
            store = load_json_store(ATTENDANCE_FILE)
            store[f"{attendance_class}-{attendance_date}"] = {
                "class": attendance_class,
                "date": str(attendance_date),
                "present": parse_name_list(present_names),
                "absent": parse_name_list(absent_names),
            }
            save_json_store(ATTENDANCE_FILE, store)
            st.success("Attendance saved")

    st.markdown("---")
    st.subheader("Monthly Summary")
    selected_month = st.text_input("Month (YYYY-MM)", value=pd.Timestamp.today().strftime("%Y-%m"))
    store = load_json_store(ATTENDANCE_FILE)
    monthly_entries = [entry for entry in store.values() if entry.get("date", "").startswith(selected_month)]
    if monthly_entries:
        summary_rows = []
        for entry in monthly_entries:
            class_name = entry.get("class") or "Unassigned"
            summary_rows.append({"Class": class_name, "Present": len(entry.get("present", [])), "Absent": len(entry.get("absent", []))})
        st.table(pd.DataFrame(summary_rows))
    else:
        st.info("No attendance logged for this month")


def render_parent_portal(df):
    st.title("👨‍👩‍👧‍👦 Parent Portal")
    name_col = guess_column(df, ["name"])
    if df.empty:
        st.info("Upload student data first")
        return

    lookup_value = st.text_input("Enter student name or ID")
    if st.button("View child") and lookup_value:
        row_id = None
        try:
            row_id = int(lookup_value)
        except ValueError:
            row_id = None
        selected_row = None
        if row_id is not None and row_id in df.index:
            selected_row = df.loc[row_id]
        elif name_col and name_col in df.columns:
            match = df[df[name_col].astype(str).str.strip().str.lower() == lookup_value.strip().lower()]
            if not match.empty:
                selected_row = match.iloc[0]
                row_id = match.index[0]

        if selected_row is None:
            st.error("No matching student found")
            return

        st.success(f"Showing details for {selected_row[name_col] if name_col else lookup_value}")
        st.write(selected_row.to_dict())
        photo_path = get_student_photo(row_id)
        if photo_path:
            st.image(os.path.join("static", photo_path), width=180)

        fee_history = load_json_store(FEE_HISTORY_FILE).get(str(row_id), [])
        if fee_history:
            st.subheader("Fee History")
            st.table(pd.DataFrame(fee_history))

        attendance_store = load_json_store(ATTENDANCE_FILE)
        recent_attendance = []
        for entry in attendance_store.values():
            if selected_row[name_col] in entry.get("present", []) or selected_row[name_col] in entry.get("absent", []):
                recent_attendance.append(entry)
        if recent_attendance:
            st.subheader("Recent Attendance")
            st.table(pd.DataFrame(recent_attendance))


def main():
    ensure_storage()
    df = load_data()

    with st.sidebar:
        st.header("Little Sprouts")
        page = st.radio("Navigate", ["Dashboard", "Students", "Attendance", "Parent Portal"])
        st.markdown("---")
        uploaded_file = st.file_uploader("Import Excel", type=["xlsx", "xls"])
        if uploaded_file is not None:
            uploaded_df = pd.read_excel(uploaded_file)
            if uploaded_df.empty or len(uploaded_df.columns) == 0:
                st.error("That file looks empty")
            else:
                save_data(uploaded_df)
                st.success("Data imported successfully")
                st.rerun()

    if page == "Dashboard":
        render_dashboard(df)
    elif page == "Students":
        render_students(df)
    elif page == "Attendance":
        render_attendance(df)
    else:
        render_parent_portal(df)


if __name__ == "__main__":
    main()
