## Meter Reading UI Test Task

A small React + TypeScript single-page app for uploading CSV files containing meter readings. The app provides a simple upload UI and posts the CSV file to a backend API (configured via `axiosInstance`). This repository is a test task / demo meant to exercise frontend file-upload behavior and basic integration with an API.

### Features

- Single-page React app (Create React App) written in TypeScript
- Upload a .csv file via the UI and send it as multipart/form-data to the backend
- Simple success / error messaging and a small response summary (success/failed counts)

### Project structure

- `src/index.tsx` — app entry, renders the `UploadCSV` component
- `src/components/upload-csv.tsx` — main UI component for selecting and uploading CSV files
- `src/infrastructure/axiosInstance.ts` — axios instance with `baseURL` pointing to the meter readings API
- `src/infrastructure/meterReadingService.ts` — wrapper service that calls the backend `uploads` endpoint
- `public/` — static CRA public files (index.html, manifest, etc.)

### Quick start

Prerequisites: Node.js (recommended LTS) and npm or yarn.

1. Install dependencies

```powershell
npm install
```

2. Start development server

```powershell
npm start
```

This runs the app in development mode (Create React App). Open http://localhost:3000 if your browser doesn't open automatically.

### Backend API

The frontend expects a backend API at the base URL configured in `src/infrastructure/axiosInstance.ts`:

```ts
const meterReadingServiceUrl = 'http://localhost:5245/api/v1/meter-readings';
```

When uploading a CSV the app calls the `POST uploads` endpoint (i.e. `POST {baseURL}/uploads`) and sends the file as `multipart/form-data`.

If your backend runs at a different host/port/path, update `meterReadingServiceUrl` accordingly or use an environment-based configuration.

### Scripts

Available npm scripts (from `package.json`):

- `npm start` — run the development server
- `npm test` — run test runner (Create React App)
- `npm run build` — build production bundle
- `npm run eject` — eject CRA config (one-way)

### Testing

There is a test file `src/components/upload-csv.test.tsx` (React Testing Library) that covers the upload component. Run tests with:

```powershell
npm test
```

### Notes and implementation details

- The upload component lives at `src/components/upload-csv.tsx`. It uses local component state for file, messages, and response counts. When the user clicks `Upload` the component builds a `FormData` instance and calls `uploadMeterReaedings` from `src/infrastructure/meterReadingService.ts`.
- `axiosInstance` sets the default `Content-Type` to `application/json`, but the upload request explicitly sets `multipart/form-data` in the request options. Axios will set the correct multipart boundary automatically when `FormData` is provided.
- The project uses React 19 and TypeScript.

### Common troubleshooting

- If uploads fail with CORS errors, ensure the backend allows requests from `http://localhost:3000` or your dev host.
- If the backend path differs, update the `meterReadingServiceUrl` constant.

### Next improvements (suggestions)

- Add environment variable support for the API base URL (e.g., `REACT_APP_API_URL`) and fallback to the existing constant.
- Improve UX: show validation of CSV format, preview rows, and better error details from the server.
- Add CI test run and linting rules.

---

If you want, I can also add environment-based configuration for the API base URL or expand the README with example CSV format and screenshots. Which would you like next?
