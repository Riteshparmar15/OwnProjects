# Developer test cases

Run against a local site (`npm run dev`). Videos are saved under `test-results/`.

```bash
npm.cmd install
npx playwright install chromium
npm.cmd test
npm.cmd run test:demo
```

| ID | Area | Steps | Expected |
| --- | --- | --- | --- |
| TC-01 | Public home | Open `/` | Brand, hero, and primary nav render |
| TC-02 | Job board | Filter Management, click Apply Now | Seeker form opens with role prefilled |
| TC-03 | Job seeker | Fill all fields, upload PDF, submit | Success: recorded by the company; Excel + resume stored |
| TC-04 | Employer | Fill hire-talent form, submit | Success: recorded by the company; Excel row stored |
| TC-05 | Validation | Submit empty seeker form | Required-fields error, no fake success |
| TC-06 | Admin auth | Login with wrong password | Error, stay on login |
| TC-07 | Admin records | Login as admin, open Candidates and Employers | Tables load |
| TC-08 | Job publish | Add a job in dashboard, open public site | New job appears in Job Openings |
| TC-09 | Job edit | Click Edit, change title, save | Table shows updated title (not a crash on `form.title`) |
| DEMO | End-to-end | Visitor submits both forms, admin reviews, publishes a job | Full recorded video of the live flow |

Dashboard login (local `.env`): `admin` / `ProStafff@2026`
