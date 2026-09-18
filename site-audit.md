# Website audit — 19 September 2026

## Changes shipped

- Consistent seven-link navigation across every page; Contact and About are reachable from the mobile homepage menu.
- Home project links now point to the site's own stories, including when JavaScript is disabled or a link is opened in a new tab.
- Mobile homepage navigation remains available without JavaScript.
- Breadcrumbs on internal pages and a custom 404 with working links even for nested missing URLs.
- Unique titles/descriptions, canonical URLs, Open Graph and Twitter sharing metadata across all pages.
- Organization, WebSite, page-type and BreadcrumbList JSON-LD, using existing visible facts and the supplied logo.
- Sitemap includes all public content pages, including source credits; excludes the noindex 404 page.
- Permanent redirect from /index.html to / to consolidate the homepage URL.
- Hero heading is visible immediately instead of fading from zero opacity.
- MIME-sniffing, frame embedding, referrer and unnecessary browser-permission headers.
- Static checks cover shared navigation, sitemap completeness, metadata uniqueness and valid JSON-LD. Repeated builds are deterministic.

## Verification

- 12 pages inspected in Chromium at 1440, 1024, 390 and 320 pixel viewport widths: no horizontal overflow or JavaScript page errors.
- Browser checks: mobile menu toggle/Escape, Education project filter, project dialog open/Escape, navigation to Contact, empty form rejected and completed form valid.
- No broken sourced images found. The initial sweep flagged the unused dialog image before a project was selected; this has no src until the dialog opens and is not a failed asset request.
- Local asset paths, internal page links and fragments pass check.py. Pure filtering, scroll and email encoding checks pass check.mjs.
- Desktop home and mobile events screenshots reviewed; captures kept locally under output/playwright/.
- External URL audit: 26 distinct links checked. Many IEEE domains returned HTTP 403 to automated requests; they are unverified, not proven broken. No 404 response was observed. Other results include 200 and IEEE's 202 challenge responses.

## Search and AI discovery boundaries

This improves technical discovery and content interpretation, not a guarantee of indexing, rankings, rich results or AI citations. No fabricated reviews, event locations, organisation addresses or funding claims were added. Funding status remains explicitly dated 18 September 2026.

Google Search Console / Bing Webmaster ownership and sitemap submission were not configured or verified. Field Core Web Vitals and physical-device performance were not measured. The contact form still opens a mail draft; no message was sent during testing.

Reference: https://developers.google.com/search/docs/appearance/ai-features
