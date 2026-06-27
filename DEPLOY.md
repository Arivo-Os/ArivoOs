# Cloudflare Pages — Arivo landing site

Static Next.js export deployed to Cloudflare Pages at **https://arivoai.in**.

## Local preview

```bash
npm run pages:build
npm run pages:preview
```

## Manual deploy

```bash
npm run pages:deploy
```

Requires `wrangler login` or `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` env vars.

## GitHub Actions (recommended)

On push to `main`, `.github/workflows/deploy.yaml` builds and deploys automatically.

### Required GitHub secrets

| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | API token with **Cloudflare Pages — Edit** permission |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms access key for waitlist/contact forms |

Create the token: Cloudflare Dashboard → My Profile → API Tokens → Create Token → Edit Cloudflare Workers template (includes Pages).

### Cloudflare dashboard setup (one-time)

1. **Workers & Pages** → **Create application** → **Pages** → **Connect to Git** (optional if using GitHub Actions only)
2. Or create an empty project named `arivo-landing-page` — the workflow will deploy to it
3. **Custom domains** → Add `arivoai.in` and `www.arivoai.in`
4. Remove old Workers route if it conflicts with the same domain
5. **SSL/TLS** → **Edge Certificates** → enable **Always Use HTTPS**
6. **Rules** → **Redirect Rules** → redirect `www.arivoai.in/*` → `https://arivoai.in/$1` (301). Cloudflare `_redirects` only allows relative URLs, so HTTP/www must be set here.

### Build settings (Cloudflare Git integration)

Your build **succeeds** — the failure is only the **deploy command**. Cloudflare is currently running `npx wrangler deploy` (Workers). This site is a static Pages project.

Go to **Workers & Pages** → your project → **Settings** → **Build** and set:

| Setting | Value |
|---------|--------|
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `out` |
| Deploy command | *(leave empty — recommended)* |

Cloudflare Pages will upload the `out/` folder automatically after a successful build. **Do not** set deploy to `npx wrangler deploy` or `npx wrangler versions upload`.

**Alternative** (if your dashboard requires a deploy command):

```
npm run deploy
```

Replace `arivo-landing-page` in `package.json` if your Pages project has a different name (check **Workers & Pages** in the dashboard).

### Troubleshooting

| Error | Fix |
|-------|-----|
| `Missing entry-point to Worker script` | Deploy command is `wrangler deploy` — clear it or use `npm run deploy` |
| `Pages projects does not support "assets"` | Remove `assets` from `wrangler.jsonc` (already fixed in repo) |
| `Only relative URLs are allowed` in `_redirects` | Remove absolute `http://` / `https://` rules (already fixed in repo) |

Alternatively, disable Cloudflare Git builds and use **GitHub Actions only** (`.github/workflows/deploy.yaml` runs `pages deploy out` on push to `main`).

### Environment variables (Cloudflare Pages dashboard)

Set for **Production** (and Preview if needed):

- `NEXT_PUBLIC_SITE_URL` = `https://arivoai.in`
- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` = your Web3Forms key

## Notes

- The site uses `output: 'export'` — fully static HTML/JS/CSS in `out/`
- Waitlist and contact forms call Web3Forms from the browser (no server required)
- `trailingSlash: true` ensures clean routing on static hosting
