# 🌻 Little Sprouts Preschool - Student Management System (v2)

Upload-first design. Works with **your Excel's actual column names** —
no fixed schema, no more `KeyError`.

## Setup

1. Install dependencies:
```
pip install flask pandas openpyxl
```

2. Run the app:
```
python app.py
```

3. Open your browser to:
```
http://localhost:5000
```

## How it works

1. **First screen** → Upload your Excel file (any column names).
2. The app reads your headers automatically and builds:
   - A **dashboard** with student count and smart breakdowns (it looks for
     columns with "class"/"grade"/"section" in the name, and "fee"/"payment"
     in the name — if found, it shows summaries for those).
   - A **students list** with a column for every field in your sheet.
   - **Add / Edit / Delete** forms built automatically from your columns.
3. **Export** anytime to get an updated Excel file back.
4. Want to load a different sheet? Go to **Upload Excel** in the nav bar — it
   will replace the current data (export first if you want a backup).

## File Structure
```
preschool_app_v2/
├── app.py                  # Flask backend (dynamic column handling)
├── current_data.xlsx       # Created automatically after your first upload
├── templates/
│   ├── base.html            # Shared layout + preschool styling
│   ├── start.html           # First screen: upload your Excel
│   ├── dashboard.html
│   ├── students.html        # Dynamic columns
│   ├── student_form.html    # Dynamic add/edit form
│   └── upload.html
```

## Notes for your real file
- First row of your Excel must be column headers (any names are fine).
- Avoid duplicate column names in the same file.
- Very large files (thousands of rows) will still work but may load a
  little slower — let me know if you're at that scale and I'll switch the
  backend from Excel to a proper database (SQLite) for speed.

## Ideas to add next
- Attendance tracking
- Daily activity/parent reports
- Login for Head of Preschool vs Teacher roles
- SMS/email notifications for fee reminders
