# Cloudflare Pages — Deployment Guide

Static Next.js 14 export (`output: "export"`) → **Cloudflare Pages** (not Workers, not OpenNext).

Live site: **https://arivoai.in**

---

## Architecture (why this setup)

| Option | Use for this project? | Why |
|--------|----------------------|-----|
| **Cloudflare Pages (static)** | ✅ **Yes** | Site is fully static HTML/CSS/JS in `out/` |
| `wrangler pages deploy out` | ✅ CI / manual upload | Correct command to push `out/` to Pages |
| Cloudflare Git build (no deploy cmd) | ✅ Recommended | Pages auto-uploads `out/` after build |
| `wrangler deploy` / Workers | ❌ No | Requires Worker entry-point or `assets` block |
| OpenNext / `@cloudflare/next-on-pages` | ❌ No | For SSR/edge Next.js — not needed for static export |
| Next.js adapter (Vercel) | ❌ No | Site targets Cloudflare Pages |

No middleware, no SSR, no edge runtime. Images use `unoptimized: true` (required for static export).

---

## Root cause of deploy failures

1. **Critical:** Cloudflare dashboard deploy command was `npx wrangler deploy` (Workers). This project has no Worker script → `Missing entry-point to Worker script or assets directory`.
2. **Fixed:** `_redirects` had absolute URLs — Cloudflare Pages only allows relative paths.
3. **Fixed:** `wrangler.jsonc` had an `assets` block — invalid for Pages projects.

---

## Cloudflare Dashboard (required one-time setup)

**Workers & Pages** → **arivo-landing-page** → **Settings** → **Build**:

| Setting | Value |
|---------|--------|
| Production branch | `main` |
| Framework preset | None |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Deploy command** | *(leave completely empty)* |
| Root directory | `/` |
| Node.js version | `22` (or use `.node-version` in repo) |

### If deploy command cannot be empty

Use only:
```
npm run deploy
```

Never use `npx wrangler deploy` or `npx wrangler versions upload`.

### Environment variables (Production)

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://arivoai.in` |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | your Web3Forms key |
| `NODE_VERSION` | `22` (optional, `.node-version` is in repo) |

### Custom domains & SSL

1. Add `arivoai.in` and `www.arivoai.in` under **Custom domains**
2. **SSL/TLS** → **Always Use HTTPS** → ON
3. **Rules** → **Redirect Rules** → `www.arivoai.in/*` → `https://arivoai.in/$1` (301)

---

## Deployment options

### Option A — Cloudflare Git (recommended)

Push to `main` → Cloudflare builds → uploads `out/` automatically.

Ensure deploy command is **empty**.

### Option B — GitHub Actions

`.github/workflows/deploy.yaml` runs on push to `main`:

1. `npm ci`
2. `npm run build`
3. `wrangler pages deploy out --project-name=arivo-landing-page`

Required GitHub secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`

Disable Cloudflare Git builds if using Actions only (avoid double deploys).

### Option C — Manual local deploy

```bash
npm ci
npm run build
npm run deploy
```

Requires `wrangler login` or `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`.

### Local preview

```bash
npm run cf:preview
# or: npm run build && npm run pages:preview
```

---

## Files reference

| File | Purpose |
|------|---------|
| `next.config.mjs` | `output: "export"`, `trailingSlash: true`, unoptimized images |
| `wrangler.jsonc` | Pages config only (`pages_build_output_dir: out`) |
| `public/_redirects` | Relative trailing-slash redirects |
| `public/_headers` | Security headers + cache rules |
| `.node-version` | Node 22 for Cloudflare + CI |
| `.github/workflows/deploy.yaml` | GitHub Actions deploy pipeline |

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `Missing entry-point to Worker script` | Remove `npx wrangler deploy` from deploy command |
| `Pages does not support "assets"` | Remove `assets` from `wrangler.jsonc` |
| `Only relative URLs allowed` in `_redirects` | No `http://` or `https://` in `_redirects` |
| `wrangler deploy` on Pages project warning | Use empty deploy cmd or `npm run deploy` |
| Build succeeds, deploy fails | Deploy command is wrong — see above |

---

## Production checklist

- [ ] Build command: `npm run build`
- [ ] Output directory: `out`
- [ ] Deploy command: empty (or `npm run deploy`)
- [ ] `NEXT_PUBLIC_*` env vars set in Cloudflare
- [ ] Custom domain `arivoai.in` attached
- [ ] Always Use HTTPS enabled
- [ ] www → non-www redirect rule
- [ ] Verify `https://arivoai.in/robots.txt` and `/sitemap.xml`
- [ ] Test waitlist/contact forms (Web3Forms)
