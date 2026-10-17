# Initial QA record — 16 October 2026 (historical baseline)

**This initial record predates the reference-driven revision.** Header/footer logos, self-hosted AOS, a fixed up-arrow and the EmailJS contact form have since been added. Current results and remaining provider checks are in [QA_REVISION.md](QA_REVISION.md). The no-form assertions and original Lighthouse scores below describe only the initial implementation.

Status: **design review passed local checks; public launch blocked by missing client information**. Tested in bundled Chromium 153 on Windows. Automated results and screenshots are in the ignored local `output/playwright/` directory. No public deployment was performed.

## Checks actually run

| Check | Result |
| --- | --- |
| `npm run check` / `node scripts/check.mjs` | PASS — 23 unique IDs, one H1, local assets, all fragment targets, locked tokens, metadata, content-safety checks and 8 AA text contrast combinations |
| `node --check assets/js/main.js` and `assets/js/site-content.js` | PASS |
| `node --check scripts/serve.mjs` and `scripts/build.mjs` | PASS |
| `npm run build` | PASS — static noindex review exported to `dist/` |
| `npm run build:production` | EXPECTED REFUSAL (exit 1) — reports missing approvals, metadata, verified contact, course catalogue and HTTPS origin |
| Browser widths 320, 375, 390, 768, 1024, 1440px | PASS — document width equals viewport; no main-content element extends outside viewport |
| Visual inspection of desktop, mobile, narrow mobile and tablet screenshots | PASS — readable hierarchy, original graph and framed original logo, distinct section layouts; narrow-screen headline adjusted to retain three lines |
| Mobile menu on click/touch-sized control | PASS — expanded state, page scroll lock, Tab/Shift+Tab loop, Escape return focus, destination focus and closure |
| Mobile-open to desktop resize | PASS — scroll lock removed and menu state reset |
| Topic CTA to contact / manual selector change | PASS — selected theme carried into labelled selector and live-region text |
| FAQ Enter / Space | PASS — native disclosure opens and closes with keyboard |
| Skip link | PASS — first keyboard stop; activation focuses main |
| Anchor offset and active chapter | PASS — tested courses target begins ~113px below viewport top at 1024px, clear of 89px sticky header; correct active state |
| Reduced-motion emulation | PASS — smooth scrolling disabled; entrance/transitions removed |
| JavaScript disabled, 320px | PASS — headline and expanded native navigation remain visible, layout fits viewport, clear learning-theme fallback |
| Browser console/page errors | PASS — none from the website |
| Requests | PASS — same-origin HTML, CSS, two modules, SVG illustration, favicon and local font; no external runtime calls |
| Contact integrity | PASS — no form, unverified phone/email/WhatsApp link, simulated success or conversion event |
| Testimonials/credentials/prices | PASS — no invented claims; testimonials omitted; course samples explicitly labelled draft |

Browser checks used the locally cached Playwright CLI 0.1.18, an isolated browser session and a local-only preview at `http://127.0.0.1:4174`. Native Chrome initially failed inside the sandbox; the installed Chromium executable and a preview server outside the sandbox resolved the local tooling issue. No site change was required for that connection problem.

Commands used for the browser test bodies (the actual cached CLI entry point was `C:/Users/Umair shaikh/AppData/Local/npm-cache/_npx/31e32ef8478fbf80/node_modules/@playwright/cli/playwright-cli.js`):

```sh
playwright-cli -s=stockaxis open http://127.0.0.1:4174 --config output/playwright/cli.config.json
playwright-cli -s=stockaxis run-code --filename output/playwright/browser-qa.js --json
playwright-cli -s=stockaxis run-code --filename output/playwright/layout-refinements.js --json
node output/playwright/lighthouse-run.mjs
```

The local harness and tool paths are QA artifacts, not project runtime dependencies. For a different machine, use its installed Playwright CLI, browser and axe path. `browser-results.json` records six widths and 17 interaction assertions; `layout-results.json` records additional screenshot, focus and observer checks.

## Accessibility

Final axe runs: **zero violations** at 390px and 1440px, and with the mobile menu open (WCAG A/AA through 2.2 plus best-practice rules). The test reported 46 passing rules on mobile and 45 on desktop. A review-banner landmark and a spaced-letter wordmark accessible-name issue were corrected during QA.

Axe marked contrast as needing manual review for decorative arrow glyphs and four timeline number labels because of nearby pseudo-elements. They were inspected: emerald on base is **9.72:1**, main text on base **17.09:1**, and muted text on base exceeds AA. Timeline pseudo-elements do not cover the labels. Other tested combinations: muted/surface **8.23:1**, emerald/surface **8.90:1**, dark text/default CTA **9.25:1**, dark text/hover CTA **6.97:1**, crimson/surface **4.67:1**, muted/elevated **7.52:1**. Structural divider rules are decorative; select boundaries use a higher-contrast muted border. Focus rings use emerald, and interactive meaning does not depend on color alone.

This is not a certification of WCAG conformance. Screen-reader checks with NVDA/VoiceOver, real touch hardware, browser zoom and forced-colors device review remain to be completed.

## Lighthouse mobile — measured local lab results

Lighthouse 13.4.1, mobile simulated throttling, Chromium 153, local source preview. Final report: `output/playwright/lighthouse-mobile.report.html` and `.json`.

| Category or metric | Final result |
| --- | --- |
| Performance | **100** |
| Accessibility | **100** |
| Best practices | **100** |
| SEO | **66** — deliberately blocked from indexing |
| First Contentful Paint | 1.2s |
| Largest Contentful Paint | 1.6s |
| Total Blocking Time | 10ms |
| Cumulative Layout Shift | 0 |
| Speed Index | 1.6s |

The only scored SEO failure is intentional `noindex`/robots blocking. Canonical, sitemap and absolute social-image URLs depend on a confirmed production origin. No production SEO score is claimed. The first measured run was 93/100/100/66 with 310ms blocking time; replacing startup/scroll geometry reads with IntersectionObserver removed the observed forced-layout work. The first CLI audit wrote valid reports but exited during temporary-profile cleanup; the final API run used an explicit local QA profile and completed successfully with no warnings. The final responsive headline refinement and skip-link focus attribute were additionally checked in browser.

These are lab results, not field p75 measurements. INP and field Core Web Vitals were **not measured**. Repeat after integrating final content and deploying with HTTPS, compression and cache headers.

## Not tested / not yet applicable

- Real WhatsApp/email recipient delivery and approved-channel URL behavior: blocked by missing verified details; no invented test contact was put into the site.
- Actual enquiry submission and spam handling: no form or approved delivery endpoint exists.
- Production indexing, canonical URL, sitemap submission and social-network preview rendering: blocked by missing domain and approved copy.
- Production export's successful approved-content path: blocked by the same content gate. The refusal path was tested. Review export was tested successfully.
- Safari, Firefox, real iOS/Android, screen readers and field performance: not run in this environment.
- Financial-advertising, privacy and enrolment policy approval for the intended market: outstanding client review, as required by the brief.
- Analytics delivery/consent: disabled and unconfigured; local event adapter is supplied for a future approved integration.

## Recheck before public release

Complete `CONTENT_REQUIRED.md`, replace review copy, validate real course/contact data, approve policies and metadata, then build production. Check the exported page, all final contact paths, focus/contrast after content changes, real-device layout, deployed security headers and Lighthouse at the confirmed HTTPS origin. Keep unverified testimonials, credentials, structured data and policies omitted.
