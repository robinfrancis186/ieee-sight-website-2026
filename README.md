# IEEE SIGHT Website 2026

**Live website: [sight.ieeekerala.org](https://sight.ieeekerala.org)**

Official website of IEEE Kerala Section SIGHT (Special Interest Group on Humanitarian Technology): 2026 leadership directory, mission and vision, documented community projects, past events, funding opportunities and contact.

| | URL |
| --- | --- |
| Live (official) | https://sight.ieeekerala.org |
| Sitemap | https://sight.ieeekerala.org/sitemap.xml |
| AI page directory | https://sight.ieeekerala.org/llms.txt |
| Vercel preview (canonicalised to the official domain) | https://ieee-sight-kerala.vercel.app |

## Pages

| Page | Path |
| --- | --- |
| Home | [/](https://sight.ieeekerala.org/) |
| Mission, vision & scope | [/mission.html](https://sight.ieeekerala.org/mission.html) |
| Project archive | [/projects.html](https://sight.ieeekerala.org/projects.html) — [Water](https://sight.ieeekerala.org/project-water.html), [LUMEN](https://sight.ieeekerala.org/project-lumen.html), [STEAM](https://sight.ieeekerala.org/project-steam.html) |
| Past events | [/events.html](https://sight.ieeekerala.org/events.html) |
| Funding opportunities | [/funding.html](https://sight.ieeekerala.org/funding.html) |
| Team 2026 | [/team.html](https://sight.ieeekerala.org/team.html) |
| Contact | [/contact.html](https://sight.ieeekerala.org/contact.html) |
| Sources & credits | [/sources.html](https://sight.ieeekerala.org/sources.html) |

## Local preview

Static, dependency-free site. Serve over HTTP (the application script is an ES module).

```sh
python3 -m http.server 5178 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:5178/

## Editing content

- **Team roster, page copy and funding directory:** `build-pages.mjs`, then run `node build-pages.mjs` to regenerate the static pages.
- **Project summaries:** `dist/app.mjs` and the corresponding cards in `dist/index.html`.
- **Layout:** `dist/style.css` and `dist/pages.css`.
- **Source citations and asset credits:** `dist/sources.html`.
- **Design review notes and scope:** `design-qa.md`.

The contact page opens a mailto draft in the visitor's mail application; it never sends email from a server. No email credentials or third-party form service is configured.

Funding programmes and the dated status review are maintained in `build-pages.mjs`. Verify official links and deadlines before updating the review date. The directory links directly to programme applications and does not collect applications itself.

## Checks

```sh
node build-pages.mjs
python3 check.py
node check.mjs
python3 audit-live.py              # read-only crawl of the live site
python3 audit-live.py --external   # also checks outgoing links
```

Static checks cover assets, anchors, navigation, metadata, structured data, crawler rules and sitemap coverage. JavaScript checks cover project filters, scroll boundaries and email draft encoding.

## Deployment (official site on cPanel)

1. Build and check (commands above), commit and push to `main`.
2. In cPanel **Git Version Control**, open `repositories/ieee-sight-website-2026` → **Manage → Pull or Deploy → Update from Remote → Deploy HEAD Commit**.
3. Run `python3 audit-live.py` to confirm the release is live.

A GitHub push alone does not publish to cPanel. `.cpanel.yml` runs `deploy-cpanel.sh`, which backs up the current document root under `site-backups/release-*` before copying only `dist/` into `public_html`. The repository and backup directories are not public.

`dist/.htaccess` configures the HTTPS redirect, the `/index.html` → `/` redirect, JavaScript module MIME types, security headers, cache revalidation for HTML/code and the custom 404.

No hosting credentials belong in this repository.

The Vercel preview runs `node build-pages.mjs` before deployment (`vercel deploy --prod`). Do not deploy project files or `.openai/` configuration.

## Search and AI discovery

- `robots.txt` allows public crawling and points to the sitemap; `llms.txt` is a supplementary page directory.
- Every page has a unique title, description, canonical URL, Open Graph/Twitter metadata and JSON-LD structured data.
- Audit findings and verification results: [`SEO-AUDIT.md`](SEO-AUDIT.md) and [`site-audit.md`](site-audit.md).

Still to do by the site owners: verify the domain in Google Search Console and Bing Webmaster Tools and submit the sitemap, and ask partner sites (including the legacy SIGHT Hub and ieeekerala.org) to link to the official domain.

## Asset rights

IEEE marks and documentary photos remain with their respective rights holders. Leadership portraits come from the supplied 2026 announcements. Generated illustrations are labelled. See `dist/sources.html` for credits. Font and icon licences are included alongside their assets. This repository does not grant an open licence to IEEE marks or third-party photos.
