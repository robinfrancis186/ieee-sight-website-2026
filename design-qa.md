# IEEE SIGHT Kerala redesign review

Reviewed 17 September 2026. Local preview: http://127.0.0.1:5178/

## Design comparison

The generated full-page reference and the implementation capture were inspected together in one comparison call. The generated project-dialog reference and implemented dialog were also inspected together. The reference is a composition target, not evidence of real projects.

Reference: outputs/website-design-reference.png. Desktop implementation: outputs/website-desktop.png at 1440 × 1000. Dialog: outputs/project-detail-design-reference.png and outputs/project-detail.png. Mobile: outputs/website-mobile.png at 390 × 844. Additional minimum-width check: 320 × 740.

The implementation follows the blue Kerala landscape hero, large white title, restrained serif accent, pale recognition strip, asymmetric project grid, navy community section, editorial resources, landscape invitation and contextual project dialog. Typography, spacing, colours, imagery and copy were reviewed. It intentionally uses a verified water-project photograph and historical volunteer photograph instead of synthetic documentary imagery. Illustrations are labelled. Verified copy replaces unsupported mockup claims. An approach section and FAQ provide useful organisational context beyond the visual reference.

The original design relied on repetitive layouts and awkward photo crops. The redesign uses a coherent landscape direction and distinct section structures. Fixed during review: desktop menu visibility, stretched community image, sticky-header anchor target, and stale active navigation state. Hero weight was aligned more closely with the reference.

A full-page browser capture produced stitching artefacts; it was discarded. Actual viewport captures and direct section inspection were used for the final review. No pixel-perfect claim is made.

## Checks

- `python3 check.py`: internal links, anchors, duplicate IDs, local HTML/CSS/dynamic image assets, basic accessibility hooks and event-free scope passed.
- `node check.mjs`: project filtering and bounded scroll progress passed.
- Browser: all three project categories return expected cards; project dialog opens with matching context and source. Escape closes it, releases page scrolling and restores focus to the originating card. Mobile close button works.
- Browser: mobile menu opens and closes after navigation; FAQ expands; selecting college participation updates the contact invitation.
- Browser: motion pause control and reload persistence checked. Active scrolling produced parallax and progress changes. OS reduced-motion support is implemented; an OS-level preference change was not performed.
- Browser: desktop 1440 and mobile 390/320 widths have no horizontal page overflow. Hero, project grid, community, CTA and dialog were visually inspected. Back-to-top returns scroll position 0. Active navigation clears at the top.
- Browser console: no warnings or errors observed.
- Four generated web images compressed from 7,851,795 bytes to 450,774 bytes. Entire static directory approximately 1.4 MB. Fonts/icons self-hosted with licences. No runtime framework, trackers or form submission service.

## Release scope

This is a complete static communications website with source-backed historical projects, participation links, resources and accessible interactive UI. It does not migrate the old forum/accounts or provide an administrative CMS. Contact links use the verified Kerala LinkedIn page and global SIGHT membership page. The three planned events are excluded as requested.

Published to Vercel at https://ieee-sight-kerala.vercel.app. Domain/DNS changes, production-host configuration, physical-device testing and formal accessibility certification are outside the verified local result. Existing organisational image rights and official brand approval remain with IEEE; credits do not imply an open licence.

## 18 September update

Added 35 named leadership cards (15 professional, 20 student) from the three user-supplied 2026 posters. Portraits use CSS crops of the supplied images; no generated faces. Added an archive, three permanent project pages, contact page, sitemap and robots.txt. The user supplied the contact email.

Checked desktop at 1440 pixels and mobile at 390 pixels: portrait positioning, all 35 names/roles in the accessibility tree, contact layout without overflow, required form fields, archive-to-project navigation and homepage-dialog-to-project navigation. No browser errors observed. Email draft encoding and validation pass the Node check. The operating-system email client launch and actual delivery were not exercised; the page explicitly requires the visitor to review and send the draft in their mail app.

final result: passed
