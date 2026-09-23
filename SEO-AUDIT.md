# Website audit — 23 September 2026

Scope: https://sight.ieeekerala.org/; all 12 HTML documents, public assets, navigation and outgoing links. This is a technical and content audit, not a claim about search-engine indexing or rankings.

## Findings and changes

| Area | Finding / action |
| --- | --- |
| Broken link | `https://sight.ieee.org/sight-groups/` returned 404. Both homepage references now use the current official `/groups/` page. |
| Search presentation | Replaced the generic homepage title with humanitarian technology and community-project context. Unique descriptions, canonical URLs, social metadata, one H1 and breadcrumbs already existed and pass checks. |
| Search/AI comprehension | Added visible answers explaining SIGHT Kerala and where to find humanitarian funding, plus a direct college-contact link. All answers are present in HTML without JavaScript. |
| Structured data | Expanded the existing organization entity with parent organization and contact context. Added ItemList data for projects, funding and dated past-event entries, and original-source citations and locations for project pages. No invented ratings, dates or outcomes. |
| Crawler policy | Existing robots.txt allows public crawling and identifies the official sitemap. Verified access for Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot and PerplexityBot. Added explicit page-level indexing and large image/snippet permissions; the error page stays noindex. |
| Sitemap | All 11 indexable pages use the official HTTPS domain. The 404 page is excluded. No fabricated last-modified dates. |
| AI text directory | Added `/llms.txt` as a supplementary page directory with historical-content caveats. It is not a ranking signal or a substitute for normal HTML, robots.txt or indexing. |
| Cache freshness | The host previously cached CSS for seven days without versioned filenames. HTML, code and discovery files now require revalidation; image/font caching remains seven days. Existing gzip compression works. |
| Redirects/errors | Live HTTP and `/index.html` redirect to the HTTPS root. An unknown nested URL returns HTTP 404 rather than a soft 404. |
| Responsive navigation | All seven primary pages checked at desktop and 320px widths without horizontal overflow. The 390px homepage menu opens and navigates to Funding Opportunities. |

## Validation

Run from the project root:

```sh
node build-pages.mjs
python3 check.py
node check.mjs
python3 audit-live.py
python3 audit-live.py --external
```

Static checks cover assets, anchors, duplicate IDs, navigation, metadata, schema references, crawler rules and sitemap coverage. JavaScript checks cover project filters, scroll boundaries and email draft encoding. Repeated builds were byte-identical.

Initial live crawl: 68/70 responses passed immediately; the two transport errors (`fonts.css`, `contact.mjs`) both returned 200 on HTTP/1.1 recheck. The audit script now uses HTTP/1.1 to avoid this client's intermittent HTTP/2 errors. The missing-page 404 is expected.

External crawl: 25 unique destinations. One confirmed broken SIGHT groups URL was corrected. Legacy Hub forums responded 200 on retry. IEEE.org returned automated-client challenge responses (202), and LinkedIn returned 999; these are inconclusive automated checks, not confirmed dead links. Do not remove those legitimate destinations solely on this evidence.

## Remaining operational work

- Verify the site in the owner's Google Search Console and Bing Webmaster Tools; submit `https://sight.ieeekerala.org/sitemap.xml`. No ownership verification, sitemap submission or indexing request is claimed in this audit.
- Review field Core Web Vitals after traffic accumulates. No Lighthouse score, real-device performance measurement or field CWV pass is claimed.
- Maintain the funding directory when official calls change. The displayed review date is a content-verification date, not a build timestamp.
- Keep the Vercel preview canonicalized to the official domain (already configured). Ask external partners to link to the official domain.
- Current site content is English. Add hreflang only if real translated pages are published.

Search and generative-search visibility depend on useful source-backed content, crawlability and indexing. No guaranteed AEO/GEO score or AI citation claim is made. Guidance: [Google AI optimization](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [robots directives](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag), [current IEEE SIGHT groups page](https://sight.ieee.org/groups/).

## Post-deployment verification

cPanel confirmed release `dabae16b15ef7c6f8aa360c2db8a9868748319b0` on 23 September 2026. All **71/71** public page/asset requests returned HTTP 200; the deliberate nonexistent URL returned 404. All 12 HTML documents plus robots.txt, sitemap.xml and llms.txt matched the local release byte-for-byte (the first two pages were rechecked after deployment completed). CSS and robots.txt return the new revalidation policy.

Local requests with Googlebot, bingbot, OAI-SearchBot and PerplexityBot user-agent strings returned 200. This confirms user-agent handling from this test client; it does not prove access from those services' actual crawler IP addresses.

The published new FAQ expands, the project dialog opens, and its full-project link navigates correctly. No browser error logs were recorded in the checked session. GitHub contains the same published site files.
