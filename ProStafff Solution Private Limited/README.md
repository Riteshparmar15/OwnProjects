# ProStafff Solution Private Limited — website

Public retail staffing site plus a company dashboard that stores every enquiry in Excel.

## Run locally

```bash
npm install
npm run dev
```

- Public website: http://localhost:5173/
- Company dashboard: http://localhost:5173/admin.html

Default dashboard login (change in `.env`):

- Username: `admin`
- Password: `ProStafff@2026`

## What happens on submit

Visitor details are saved into `data/ProStafff-Records.xlsx` (Job Seekers and Employers sheets). Resumes are stored in `data/resumes/`. An email is also sent to the main company inbox.

Jobs added in the dashboard appear on the public Job Openings section immediately.

## Production

```bash
npm run build
npm start
```

## Developer tests and demo video

```bash
npx playwright install chromium
npm run test
npm run test:demo
```

Videos land in `test-results/`. Case list: `tests/TEST-CASES.md`.
