# ProStafff Solution — Corporate Website

Premium React + Vite website for **ProStafff Solution Private Limited**, a retail recruitment and staffing consultancy.

## Stack

- React 19 + Vite
- React Router
- Lightweight custom CSS (no UI framework / animation libraries)

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Architecture

- `src/pages` — route-level pages
- `src/components` — reusable UI and forms
- `src/data/jobs.js` — API-ready job listings
- `src/data/content.js` — company copy and site content

Forms currently validate client-side and log API-ready payloads in development. Replace `submitApplication` / `submitContact` with real endpoints when a backend is available.

## Notes

- Verified company facts only (no fabricated clients, awards, or statistics)
- No employer “Hire Talent” mandate form — Contact Us covers enquiries
