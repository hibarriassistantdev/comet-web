# COMET website

The project is split into two services:

- `frontend/`: React/Vite public website and `/admin` superadmin interface.
- `backend/`: Express API, MongoDB models, authentication, analytics, and content endpoints.

## Local development

Requirements: Node.js 20+ and a MongoDB instance (local or Atlas).

1. Copy `backend/.env.example` to `backend/.env`. Set `MONGODB_URI`, a random `JWT_SECRET`, and a strong `SUPERADMIN_PASSWORD` of at least 14 characters.
2. In `backend/`, run `npm install`, then `npm run seed:admin` once to create the superadmin, then `npm run dev`.
3. In `frontend/`, run `npm install`, then `npm run dev`.
4. Open the Vite URL and visit `/admin`. Vite proxies `/api` requests to the backend on port 4000.

In production, configure `VITE_API_BASE_URL` to the API origin at frontend build time and set `FRONTEND_ORIGIN` to the deployed site origin in the backend. Serve both over HTTPS. The backend does not create default credentials; the admin seed script requires environment credentials.

## Current MVP scope

- Superadmin login with an HTTP-only JWT cookie and login rate limiting.
- Visitor and page-view totals, daily unique visitor chart, and popular pages.
- Draft/published pages and posts served at `/content/:slug`, with basic SEO metadata.
- The admin organic-search panel queries Google Search Console for clicks, impressions, and average position. Enable the Search Console API, grant the backend service-account email access to the verified property, and configure `GOOGLE_SEARCH_CONSOLE_SITE_URL`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, and `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` in the backend environment. Queries end three days before today to account for Search Console reporting delays.
- Visitor analytics uses a random browser identifier stored in local storage. Add the appropriate privacy notice/consent flow for the site's jurisdictions before production deployment.