# Frontend (my-v0-project)

Next.js frontend for the authentication demo.

This app is built with Next.js and standard React components. It expects a backend API to handle registration, login and session verification.

## Prerequisites
- Node.js (LTS recommended)
- pnpm recommended (this repo includes a `pnpm-lock.yaml`), but npm/yarn will also work

## Install
From the `frontend/` directory:

Using pnpm:

    pnpm install

Or using npm:

    npm install

If you see errors about peer deps during installs in this project use --legacy-peer-deps

    npm install --legacy-peer-deps

## Available scripts
- `npm run dev` / `pnpm dev` — start Next.js in development mode
- `npm run build` / `pnpm build` — build for production
- `npm start` / `pnpm start` — start the production server after building
- `npm run lint` — run ESLint

These are defined in `package.json` and map to the standard Next.js scripts.

## Environment variables
Create a `.env.local` in `frontend/` for local development. Common variables you may need:

- `NEXT_PUBLIC_API_URL` — URL of the backend API (e.g. `http://localhost:4000`). Use this from client code to call the backend.

Example `.env.local`:

    NEXT_PUBLIC_API_URL=http://localhost:4000

Note: Do NOT commit `.env.local` to the repository.

## Development
Start the frontend in development mode:

    npm run dev

Open your browser at http://localhost:3000 (Next's default). If your backend runs on a different port (e.g. 4000), make sure the backend's `FRONTEND_ORIGIN` or CORS settings allow `http://localhost:3000`.

## Build & Run (production)
Build the app:

    npm run build

Start the production server:

    npm start

## Deployment
This Next.js app can be deployed to Vercel, Netlify (with adapter), or any Node.js host that can run `next start`.

## Notes
- If you change the API URL, rebuild or restart the dev server to pick up changes in some cases.
- For secure cookies to work in production, ensure your backend and frontend use HTTPS and correct cookie settings.

## License
Add license information here if applicable.

## Deploy to Render

You can deploy the frontend as a Node (Next.js) web service on Render. The repository includes a `render.yaml` that declares the `ex-frontend` and `ex-backend` services.

Steps:

1. Push your repo (with `render.yaml` at the root) to GitHub and open the Render dashboard.
2. Connect your repository and allow Render to create the resources from `render.yaml` or create services manually.
3. Configure environment variables for the frontend service:
    - `NEXT_PUBLIC_API_URL` — set to your backend URL (for example `https://ex-backend.onrender.com`).

Notes:
- If you use the service names in `render.yaml` (`ex-frontend`/`ex-backend`), Render will expose them at `https://ex-frontend.onrender.com` and `https://ex-backend.onrender.com` (assuming the names are available). Update `NEXT_PUBLIC_API_URL` accordingly.
- For better security, keep cookies secure by using HTTPS in production and configuring CORS on the backend.
