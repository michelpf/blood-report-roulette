# Blood Report Roulette — Test System

This repository contains a demo application that simulates a laboratory report search and preview system (blood-report-roulette). Its purpose is to demonstrate common challenges and behaviors when working with diagnostic reports (legacy formats, pagination, dot-matrix print preview, loading large multi-page documents, etc.).

WARNING: This application is a test/demo system only. All data is fictional and does not represent real patients.

## Purpose
- Demonstrate UX and performance issues when viewing very large reports (many pages, dot-matrix print styling, page navigation).
- Provide a controlled environment for UI testing, print-preview behavior, and simulated PDF export.

## Quick operation guide
1. Start the project's development server (Vite). Example:

```bash
npm run dev
# or use your preferred command: bun dev / pnpm dev
```

2. Open the app in your browser (typically http://localhost:5173).
3. Follow the authentication flow in the UI:
   - Step 1: enter a valid User ID (see below) and click Continue.
   - Step 2: enter an Access Key (any value works for this demo) and confirm.
   - Step 3: accept the terms and click Submit.
4. The system will show a loading animation that simulates loading pages (up to 500). After loading completes, a dot-matrix style preview of the report will appear.
5. Use the controls under the preview to navigate pages, print, or export (simulated).

## Available demo User IDs
- `12345678`
- `PATIENT01`
- `TEST2024`

NOTE: In this demo environment any Access Key / password will be accepted — the focus is on front-end behavior and print preview.

## Additional notes
- The project uses Vite + React + Tailwind CSS.
- Files inside `src/pages` are used to count/generate example pages for the loader.
- Do not use this code in production without removing demo data and implementing real authentication.

If you'd like, I can add production build instructions, automated test examples, or a script to generate sample PDFs.
Working IDs: 12345678, PATIENT01, TEST2024 (any password works)