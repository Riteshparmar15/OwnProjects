"""
Little Sprouts Preschool - Student Management System (v2)
Upload-first flow. Reads WHATEVER columns your Excel has - no fixed schema.
Backend: Flask + Pandas (Excel file is the database)
"""

from datetime import datetime
import json
import os
import re

import pandas as pd
from flask import Flask, flash, redirect, render_template, request, send_file, url_for
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = "preschool-secret-key"

DATA_FILE = "current_data.xlsx"
ATTENDANCE_FILE = "attendance_data.json"
FEE_HISTORY_FILE = "fee_history.json"
PHOTO_STORE_FILE = "student_photos.json"
UPLOAD_FOLDER = os.path.join("static", "uploads")
DEFAULT_CLASS_CAPACITY = 25


def ensure_storage():
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    for file_path in [ATTENDANCE_FILE, FEE_HISTORY_FILE, PHOTO_STORE_FILE]:
        if not os.path.exists(file_path):
            with open(file_path, "w", encoding="utf-8") as handle:
                json.dump({}, handle)


def has_data():
    return os.path.exists(DATA_FILE)


def load_data():
    if not has_data():
        return pd.DataFrame()
    return pd.read_excel(DATA_FILE)


def save_data(df):
    df.to_excel(DATA_FILE, index=False)


def load_json_store(file_path):
    ensure_storage()
    if not os.path.exists(file_path):
        return {}
    with open(file_path, "r", encoding="utf-8") as handle:
        return json.load(handle)


def save_json_store(file_path, data):
    ensure_storage()
    with open(file_path, "w", encoding="utf-8") as handle:
        json.dump(data, handle, indent=2)


def guess_column(df, keywords):
    """Find a column whose name contains any of the given keywords (case-insensitive)."""
    for col in df.columns:
        for kw in keywords:
            if kw.lower() in str(col).lower():
                return col
    return None


def build_field_meta(df):
    """
    Look at each column and decide the best input type for the Add/Edit form:
    - 'date'   -> date columns (DOB, Admission Date, etc.)
    - 'select' -> columns with a small number of repeated values (Class, Gender, Fee Status...)
    - 'text'   -> everything else (Name, Contact Number, Allergies, etc.)
    Also flags which column looks like the "name" field, so it can be marked required.
    """
    name_col = guess_column(df, ["name"])
    meta = {}
    total_rows = len(df)

    for col in df.columns:
        col_lower = str(col).lower()
        values = df[col].dropna().astype(str).unique().tolist()

        if any(k in col_lower for k in ["dob", "birth", "date"]):
            meta[col] = {"type": "date", "options": [], "required": False}
        elif total_rows >= 3 and 1 < len(values) <= 8 and len(values) < total_rows:
            meta[col] = {"type": "select", "options": sorted(values), "required": False}
        else:
            meta[col] = {"type": "text", "options": [], "required": (col == name_col)}

    return meta


def get_class_column(df):
    return guess_column(df, ["class", "grade", "section", "room"])


def get_name_column(df):
    return guess_column(df, ["name"])


def get_student_name(df, row_id, name_col=None):
    if row_id not in df.index:
        return None
    name_col = name_col or get_name_column(df)
    if name_col and name_col in df.columns:
        raw_name = df.loc[row_id, name_col]
        if pd.notna(raw_name) and str(raw_name).strip():
            return str(raw_name).strip()
    return f"Student {row_id + 1}"


def save_student_photo(row_id, uploaded_file):
    if not uploaded_file or not uploaded_file.filename:
        return None
    filename = secure_filename(uploaded_file.filename)
    extension = os.path.splitext(filename)[1] or ".jpg"
    saved_name = f"student_{row_id}{extension}"
    saved_path = os.path.join(UPLOAD_FOLDER, saved_name)
    uploaded_file.save(saved_path)
    return os.path.join("uploads", saved_name)


def get_student_photo(row_id):
    photo_store = load_json_store(PHOTO_STORE_FILE)
    return photo_store.get(str(row_id))


def save_student_photo_reference(row_id, photo_path):
    photo_store = load_json_store(PHOTO_STORE_FILE)
    if photo_path:
        photo_store[str(row_id)] = photo_path
    else:
        photo_store.pop(str(row_id), None)
    save_json_store(PHOTO_STORE_FILE, photo_store)


def parse_name_list(raw_value):
    if not raw_value:
        return []
    return [item.strip() for item in re.split(r"[\n,]+", raw_value) if item.strip()]


def get_student_attendance_summary(df, row_id, attendance_store):
    name = get_student_name(df, row_id)
    class_col = get_class_column(df)
    student_class = df.loc[row_id, class_col] if class_col and row_id in df.index else None
    records = []
    for entry in attendance_store.values():
        if class_col and student_class and str(entry.get("class", "")).strip().lower() != str(student_class).strip().lower():
            continue
        if name in entry.get("present", []) or name in entry.get("absent", []):
            status = "Present" if name in entry.get("present", []) else "Absent"
            records.append({"date": entry.get("date"), "status": status})
    return sorted(records, key=lambda item: item["date"], reverse=True)[:10]


@app.route("/")
def start():
    """Landing page. If no data uploaded yet, show upload screen. Otherwise go to dashboard."""
    if not has_data():
        return render_template("start.html")
    return redirect(url_for("dashboard"))


@app.route("/upload", methods=["GET", "POST"])
def upload_excel():
    if request.method == "POST":
        file = request.files.get("excel_file")
        if file and file.filename.endswith((".xlsx", ".xls")):
            df = pd.read_excel(file)
            if df.empty or len(df.columns) == 0:
                flash("That file looks empty. Please check it and try again.", "error")
                return redirect(url_for("upload_excel"))
            save_data(df)
            flash(f"Imported {len(df)} students with {len(df.columns)} columns successfully!", "success")
            return redirect(url_for("dashboard"))
        flash("Please upload a valid .xlsx or .xls file.", "error")
        return redirect(url_for("upload_excel"))
    return render_template("upload.html", has_data=has_data())


@app.route("/dashboard")
def dashboard():
    if not has_data():
        return redirect(url_for("start"))
    df = load_data()

    total_students = len(df)
    class_col = get_class_column(df)
    total_classes = df[class_col].nunique() if class_col else 0

    fee_col = guess_column(df, ["fee", "payment"])
    fee_summary = {}
    fee_paid_pct = 0
    if fee_col and total_students:
        fee_summary = df[fee_col].astype(str).value_counts().to_dict()
        paid_count = sum(v for k, v in fee_summary.items() if str(k).strip().lower() in ("paid", "yes", "y", "done"))
        fee_paid_pct = int(round((paid_count / total_students) * 100)) if total_students else 0

    class_counts = df[class_col].astype(str).value_counts().to_dict() if class_col else {}
    max_class_count = max(class_counts.values()) if class_counts else 1
    class_bar_data = [
        {"label": cls, "count": count, "pct": int(round((count / max_class_count) * 100)) if max_class_count else 0}
        for cls, count in class_counts.items()
    ]

    name_col = get_name_column(df)
    recent_students = []
    if name_col and total_students:
        recent_students = df[name_col].astype(str).tail(5).tolist()[::-1]

    dob_col = guess_column(df, ["dob", "birth", "date of birth"])
    upcoming_birthdays = []
    if dob_col and name_col:
        try:
            temp = df[[name_col, dob_col]].copy()
            temp[dob_col] = pd.to_datetime(temp[dob_col], errors="coerce")
            current_month = pd.Timestamp.now().month
            this_month = temp[temp[dob_col].dt.month == current_month].dropna()
            upcoming_birthdays = [
                {"name": row[name_col], "day": row[dob_col].day}
                for _, row in this_month.iterrows()
            ]
            upcoming_birthdays.sort(key=lambda item: item["day"])
        except Exception:
            upcoming_birthdays = []

    allergy_col = guess_column(df, ["allerg", "medical", "health"])
    allergy_alerts = []
    if allergy_col and name_col:
        mask = ~df[allergy_col].astype(str).str.strip().str.lower().isin(["none", "nan", "", "no"])
        flagged = df[mask]
        allergy_alerts = [
            {"name": row[name_col], "note": row[allergy_col]}
            for _, row in flagged.iterrows()
        ][:10]

    gender_col = guess_column(df, ["gender", "sex"])
    gender_counts = df[gender_col].astype(str).value_counts().to_dict() if gender_col else {}

    incomplete_rows = 0
    if total_students:
        incomplete_rows = int(df.isnull().any(axis=1).sum() + (df.astype(str) == "").any(axis=1).sum())
    completeness_pct = round(((total_students - incomplete_rows) / total_students) * 100) if total_students else 100

    capacity_limit = request.args.get("capacity", DEFAULT_CLASS_CAPACITY, type=int) or DEFAULT_CLASS_CAPACITY
    capacity_alerts = []
    if class_col:
        for class_name, count in class_counts.items():
            if count > capacity_limit:
                capacity_alerts.append({"class_name": class_name, "count": count, "limit": capacity_limit})

    return render_template(
        "dashboard.html",
        total_students=total_students,
        total_classes=total_classes,
        class_col=class_col,
        class_counts=class_counts,
        class_bar_data=class_bar_data,
        fee_col=fee_col,
        fee_summary=fee_summary,
        fee_paid_pct=fee_paid_pct,
        recent_students=recent_students,
        upcoming_birthdays=upcoming_birthdays,
        allergy_col=allergy_col,
        allergy_alerts=allergy_alerts,
        gender_col=gender_col,
        gender_counts=gender_counts,
        incomplete_rows=incomplete_rows,
        completeness_pct=completeness_pct,
        capacity_alerts=capacity_alerts,
        capacity_limit=capacity_limit,
        columns=df.columns.tolist(),
    )


@app.route("/students")
def students():
    if not has_data():
        return redirect(url_for("start"))
    df = load_data()

    search = request.args.get("search", "").strip().lower()
    name_col = get_name_column(df)
    class_col = get_class_column(df)

    filtered = df.copy()
    if search and name_col:
        filtered = filtered[filtered[name_col].astype(str).str.lower().str.contains(search, na=False)]

    columns = df.columns.tolist()
    rows = []
    for idx, row in filtered.iterrows():
        rows.append({"row_id": idx, "data": row.to_dict()})

    class_options = []
    if class_col and class_col in df.columns:
        class_options = sorted({str(value).strip() for value in df[class_col].dropna() if str(value).strip()})

    return render_template(
        "students.html",
        columns=columns,
        rows=rows,
        search=search,
        name_col=name_col,
        class_col=class_col,
        class_options=class_options,
    )


@app.route("/students/add", methods=["GET", "POST"])
def add_student():
    if not has_data():
        return redirect(url_for("start"))
    df = load_data()
    columns = df.columns.tolist()
    field_meta = build_field_meta(df)
    name_col = get_name_column(df)

    if request.method == "POST":
        new_row = {col: request.form.get(col, "").strip() for col in columns}

        if name_col and not new_row.get(name_col):
            flash(f"'{name_col}' is required.", "error")
            return render_template("student_form.html", columns=columns, row_data=new_row,
                                    row_id=None, field_meta=field_meta)

        if name_col and new_row.get(name_col):
            existing_names = df[name_col].astype(str).str.strip().str.lower().tolist()
            if new_row[name_col].strip().lower() in existing_names:
                flash(f"Note: a student named '{new_row[name_col]}' already exists. Added anyway.", "error")

        df = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)
        row_id = len(df) - 1
        uploaded_file = request.files.get("photo")
        if uploaded_file and uploaded_file.filename:
            photo_path = save_student_photo(row_id, uploaded_file)
            save_student_photo_reference(row_id, photo_path)
        save_data(df)
        flash("Student added successfully!", "success")
        return redirect(url_for("students"))

    return render_template("student_form.html", columns=columns, row_data=None, row_id=None, field_meta=field_meta)


@app.route("/students/edit/<int:row_id>", methods=["GET", "POST"])
def edit_student(row_id):
    if not has_data():
        return redirect(url_for("start"))
    df = load_data()
    columns = df.columns.tolist()
    field_meta = build_field_meta(df)
    name_col = get_name_column(df)

    if row_id not in df.index:
        flash("Student not found.", "error")
        return redirect(url_for("students"))

    if request.method == "POST":
        new_values = {col: request.form.get(col, "").strip() for col in columns}
        if name_col and not new_values.get(name_col):
            flash(f"'{name_col}' is required.", "error")
            return render_template("student_form.html", columns=columns, row_data=new_values,
                                    row_id=row_id, field_meta=field_meta)
        for col in columns:
            df.loc[row_id, col] = new_values[col]
        uploaded_file = request.files.get("photo")
        if uploaded_file and uploaded_file.filename:
            photo_path = save_student_photo(row_id, uploaded_file)
            save_student_photo_reference(row_id, photo_path)
        save_data(df)
        flash("Student updated successfully!", "success")
        return redirect(url_for("students"))

    row_data = df.loc[row_id].to_dict()
    return render_template("student_form.html", columns=columns, row_data=row_data, row_id=row_id, field_meta=field_meta)


@app.route("/students/<int:row_id>")
def student_detail(row_id):
    if not has_data():
        return redirect(url_for("start"))
    df = load_data()
    if row_id not in df.index:
        flash("Student not found.", "error")
        return redirect(url_for("students"))

    name_col = get_name_column(df)
    class_col = get_class_column(df)
    row_data = df.loc[row_id].to_dict()
    photo_path = get_student_photo(row_id)
    fee_history = load_json_store(FEE_HISTORY_FILE).get(str(row_id), [])
    attendance_store = load_json_store(ATTENDANCE_FILE)
    attendance_summary = get_student_attendance_summary(df, row_id, attendance_store)
    return render_template(
        "student_detail.html",
        row_id=row_id,
        row_data=row_data,
        name_col=name_col,
        class_col=class_col,
        photo_path=photo_path,
        fee_history=fee_history,
        attendance_summary=attendance_summary,
    )


@app.route("/students/<int:row_id>/payment", methods=["POST"])
def add_student_payment(row_id):
    if not has_data():
        return redirect(url_for("start"))
    df = load_data()
    if row_id not in df.index:
        flash("Student not found.", "error")
        return redirect(url_for("students"))

    fee_history_store = load_json_store(FEE_HISTORY_FILE)
    history = fee_history_store.get(str(row_id), [])
    history.append(
        {
            "date": request.form.get("payment_date") or datetime.now().strftime("%Y-%m-%d"),
            "amount": request.form.get("amount", "0"),
            "note": request.form.get("note", "")
        }
    )
    fee_history_store[str(row_id)] = history
    save_json_store(FEE_HISTORY_FILE, fee_history_store)
    flash("Payment recorded successfully.", "success")
    return redirect(url_for("student_detail", row_id=row_id))


@app.route("/students/<int:row_id>/id-card")
def student_id_card(row_id):
    if not has_data():
        return redirect(url_for("start"))
    df = load_data()
    if row_id not in df.index:
        flash("Student not found.", "error")
        return redirect(url_for("students"))

    name_col = get_name_column(df)
    class_col = get_class_column(df)
    row_data = df.loc[row_id].to_dict()
    photo_path = get_student_photo(row_id)
    return render_template(
        "id_card.html",
        row_id=row_id,
        row_data=row_data,
        name_col=name_col,
        class_col=class_col,
        photo_path=photo_path,
    )


@app.route("/students/delete/<int:row_id>")
def delete_student(row_id):
    df = load_data()
    if row_id in df.index:
        photo_path = get_student_photo(row_id)
        if photo_path and os.path.exists(os.path.join("static", photo_path)):
            os.remove(os.path.join("static", photo_path))
        photo_store = load_json_store(PHOTO_STORE_FILE)
        photo_store.pop(str(row_id), None)
        save_json_store(PHOTO_STORE_FILE, photo_store)
        df = df.drop(index=row_id).reset_index(drop=True)
        save_data(df)
        flash("Student removed.", "success")
    return redirect(url_for("students"))


@app.route("/students/promote", methods=["POST"])
def promote_students():
    if not has_data():
        return redirect(url_for("start"))
    df = load_data()
    class_col = get_class_column(df)
    from_class = request.form.get("from_class", "").strip()
    to_class = request.form.get("to_class", "").strip()
    if not class_col or not from_class or not to_class:
        flash("Please choose a source class and target class.", "error")
        return redirect(url_for("students"))
    if class_col in df.columns:
        df.loc[df[class_col].astype(str).str.strip().str.lower() == from_class.lower(), class_col] = to_class
        save_data(df)
        flash(f"Promoted students from {from_class} to {to_class}.", "success")
    return redirect(url_for("students"))


@app.route("/attendance", methods=["GET", "POST"])
def attendance():
    if not has_data():
        return redirect(url_for("start"))
    df = load_data()
    class_col = get_class_column(df)
    name_col = get_name_column(df)
    attendance_store = load_json_store(ATTENDANCE_FILE)

    if request.method == "POST":
        attendance_class = request.form.get("attendance_class", "").strip()
        attendance_date = request.form.get("attendance_date") or datetime.now().strftime("%Y-%m-%d")
        present_names = parse_name_list(request.form.get("present_names", ""))
        absent_names = parse_name_list(request.form.get("absent_names", ""))
        attendance_store[f"{attendance_class}-{attendance_date}"] = {
            "class": attendance_class,
            "date": attendance_date,
            "present": present_names,
            "absent": absent_names,
        }
        save_json_store(ATTENDANCE_FILE, attendance_store)
        flash("Attendance saved successfully.", "success")
        return redirect(url_for("attendance"))

    selected_month = request.args.get("month", datetime.now().strftime("%Y-%m"))
    monthly_entries = [entry for entry in attendance_store.values() if entry.get("date", "").startswith(selected_month)]
    summary = {}
    for entry in monthly_entries:
        class_name = entry.get("class") or "Unassigned"
        summary[class_name] = summary.get(class_name, {"present": 0, "absent": 0})
        summary[class_name]["present"] += len(entry.get("present", []))
        summary[class_name]["absent"] += len(entry.get("absent", []))

    return render_template(
        "attendance.html",
        class_col=class_col,
        name_col=name_col,
        selected_month=selected_month,
        monthly_entries=monthly_entries,
        summary=summary,
        classes=sorted({str(value).strip() for value in df[class_col].dropna() if str(value).strip()}) if class_col else [],
    )


@app.route("/parent", methods=["GET", "POST"])
def parent_portal():
    if request.method == "POST":
        student_identifier = request.form.get("student_identifier", "").strip()
        if student_identifier:
            return redirect(url_for("parent_student_view", student_id=student_identifier))
        flash("Please enter a student name or ID.", "error")
    return render_template("parent_portal.html")


@app.route("/parent/<student_id>")
def parent_student_view(student_id):
    if not has_data():
        return redirect(url_for("start"))
    df = load_data()
    row_id = None
    try:
        row_id = int(student_id)
    except ValueError:
        row_id = None

    if row_id is not None and row_id in df.index:
        selected_row = df.loc[row_id]
    else:
        name_col = get_name_column(df)
        selected_row = None
        if name_col and name_col in df.columns:
            matches = df[df[name_col].astype(str).str.strip().str.lower() == student_id.strip().lower()]
            if not matches.empty:
                selected_row = matches.iloc[0]
                row_id = matches.index[0]

    if selected_row is None:
        flash("No student matched that parent lookup. Please try again.", "error")
        return redirect(url_for("parent_portal"))

    name_col = get_name_column(df)
    class_col = get_class_column(df)
    row_data = selected_row.to_dict()
    fee_history = load_json_store(FEE_HISTORY_FILE).get(str(row_id), [])
    attendance_store = load_json_store(ATTENDANCE_FILE)
    attendance_summary = get_student_attendance_summary(df, row_id, attendance_store)
    photo_path = get_student_photo(row_id)
    return render_template(
        "parent_portal.html",
        row_id=row_id,
        row_data=row_data,
        name_col=name_col,
        class_col=class_col,
        fee_history=fee_history,
        attendance_summary=attendance_summary,
        photo_path=photo_path,
        lookup_value=student_id,
    )


@app.route("/export")
def export_excel():
    if not has_data():
        flash("No data to export yet.", "error")
        return redirect(url_for("start"))
    return send_file(DATA_FILE, as_attachment=True, download_name="preschool_students_export.xlsx")


@app.route("/replace-data")
def replace_data():
    """Lets the Head of Preschool upload a fresh sheet, replacing current data."""
    if os.path.exists(DATA_FILE):
        os.remove(DATA_FILE)
    flash("Ready for a new upload.", "success")
    return redirect(url_for("upload_excel"))


if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port=5000)