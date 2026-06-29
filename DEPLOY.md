# Arivo Frontend Deployment Guide (Railway)

The Arivo frontend is deployed as a dynamic Next.js application on **Railway** to support the Backend-for-Frontend (BFF) proxy.

---

## Architecture Overview

All client-side API requests are proxied through Next.js Route Handlers:

```text
Browser ──[ /api/* ]──> Next.js Route Handler (BFF Proxy) ──[ https://backend.arivoai.in/api/* ]──> NestJS Backend
```

Benefits:
- Eliminates browser CORS issues.
- Hides the target backend domain from public browser code.
- Centralizes authentication forwarding and logs.

---

## Railway Build & Deployment Settings

Railway automatically detects the Node.js project using buildpacks and runs:
- **Build Command:** `npm run build` (runs `next build`)
- **Start Command:** `npm run start` (runs `next start`)

### Environment Variables

You must configure the following variables in the Railway dashboard:

| Variable | Value | Description |
|----------|-------|-------------|
| `PORT` | `8080` (or dynamic) | Port standard for Railway container binding |
| `NEXT_PUBLIC_SITE_URL` | `https://arivoai.in` | Root production site URL |
| `NEXT_PUBLIC_API_URL` | `/api` | Tells frontend Axios client to route requests through Next.js Route Handlers |
| `BACKEND_API_URL` | `https://backend.arivoai.in/api` | Target backend URL that the BFF proxy forwards requests to |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | `...` | OAuth Google client ID |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | `...` | Marketing email form key |
