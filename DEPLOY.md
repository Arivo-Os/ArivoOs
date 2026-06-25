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

### Build settings (Cloudflare Git integration)

Use **one** of these setups depending on how the project was created in the dashboard.

#### Option A — Workers (deploy command: `npx wrangler versions upload`)

| Setting | Value |
|---------|--------|
| Build command | `npm run pages:build` |
| Deploy command | `npx wrangler versions upload` |
| Root directory | `/` |

`wrangler.jsonc` must include `assets.directory: "./out"` (already configured in this repo).

#### Option B — Pages (recommended; no deploy command)

| Setting | Value |
|---------|--------|
| Framework preset | None |
| Build command | `npm run pages:build` |
| Build output directory | `out` |
| Deploy command | *(leave empty)* |
| Node.js version | 22 |

#### Option C — GitHub Actions only

Push to `main` — `.github/workflows/deploy.yaml` runs `wrangler pages deploy out` automatically. Disable Cloudflare Git builds if you use this to avoid double deploys.

### Environment variables (Cloudflare Pages dashboard)

Set for **Production** (and Preview if needed):

- `NEXT_PUBLIC_SITE_URL` = `https://arivoai.in`
- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` = your Web3Forms key

## Notes

- The site uses `output: 'export'` — fully static HTML/JS/CSS in `out/`
- Waitlist and contact forms call Web3Forms from the browser (no server required)
- `trailingSlash: true` ensures clean routing on static hosting
