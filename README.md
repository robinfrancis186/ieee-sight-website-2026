# IEEE SIGHT Website 2026

Live website: https://sight.ieeekerala.org

Vercel preview: https://ieee-sight-kerala.vercel.app

2026 leadership directory, mission and vision, documented projects, and contact information for IEEE Kerala Section SIGHT.

Static, dependency-free site. Serve over HTTP (the application script is an ES module).

```sh
python3 -m http.server 5178 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:5178/

Checks:
```sh
python3 check.py
node check.mjs
```

Publish the contents of `dist/` using an HTTPS static host. No dependencies, secrets or database are required. Vercel runs `node build-pages.mjs` to regenerate the static pages before deployment. Do not deploy project files or `.openai/` configuration. Local preview uses Python only for development.

Edit project summaries in `dist/app.mjs` and corresponding cards in `dist/index.html`; layout lives in `dist/style.css`. Source citations and asset credits are in `dist/sources.html`. Review notes and scope are in `design-qa.md`.

## Team, archive and contact pages

Edit the 2026 roster and page copy in `build-pages.mjs`; run `node build-pages.mjs` to regenerate the static pages. Project content reuses `dist/app.mjs`. The contact page opens a mailto draft, never sends email from a server. No email credentials or third-party form service is configured.

## Deployment

```sh
node build-pages.mjs
python3 check.py
node check.mjs
vercel deploy --prod
```

The contact form creates an email draft in the visitor’s mail application; it does not send email from a backend.

## Asset rights

IEEE marks and documentary photos remain with their respective rights holders. Leadership portraits come from the supplied 2026 announcements. Generated illustrations are labelled. See `dist/sources.html` for credits. Font and icon licences are included alongside their assets. This repository does not grant an open licence to IEEE marks or third-party photos.

## Funding directory

Funding programmes and the dated status review are maintained in `build-pages.mjs`. Verify official links and deadlines before updating the review date; regenerate with `node build-pages.mjs`. The directory links directly to programme applications and does not collect applications itself.

## Official hosting (cPanel)

The official domain is `https://sight.ieeekerala.org/`. cPanel Git Version Control manages the public GitHub checkout at `repositories/ieee-sight-website-2026`, outside `public_html`. After building, checking and pushing changes, use **Manage → Pull or Deploy → Update from Remote → Deploy HEAD Commit**. A GitHub push alone does not publish to cPanel.

`.cpanel.yml` runs `deploy-cpanel.sh`, which backs up the current document root under `site-backups/release-*` before copying only `dist/` into `public_html`. The repository and backup directories are not public. `dist/.htaccess` configures HTTPS, the homepage canonical redirect, JavaScript module MIME types and the custom 404. No hosting credentials belong in this repository.
