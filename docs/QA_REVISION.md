# Reference-driven revision QA — 16 October 2026

This is the current QA record. `QA_CHECKLIST.md` retains the initial implementation's historical baseline.

## Latest refinement: copy and scrolling

Removed the review utility strip and footer development label. Removed delivery-provider wording from visible form text. The form integration and launch/content gates remain unchanged.

All same-page links now share an explicit requestAnimationFrame scroll tween (850–1,500ms in the default mode, with a shorter gentle reduced-motion mode), fixed-header offset, URL updates and destination focus. The up-arrow includes an SVG progress ring; it fills on scroll, drains during return and resets at the actual page top. Native wheel/touch scrolling is preserved, deliberate input interrupts the tween, and skip links stay immediate. AOS reveals use an 850ms cubic easing curve with a 52px fade-up, blur-to-sharp transition and 90ms stagger.

Targeted browser checks: **15 assertions passed**, including measured intermediate positions for both section navigation and the up-arrow (no instant jump), ring fill/reset, topic preservation, heading offset, focus/history, wheel cancellation, mobile menu closure, reduced motion and clean page copy. All six widths (320–1440px) fit. Axe reported **zero violations** at 390px and 1440px. Commands used `playwright-cli -s=stockaxis run-code --filename output/playwright/scroll-qa.js --json`; results and screenshots are in `scroll-results.json`, `scroll-progress.png` and `smooth-hero-*.png` in that directory. Static checks and review export passed. Lighthouse was not rerun for this refinement; scores below belong to the preceding reference-driven revision.

## Requested changes delivered

- Self-hosted AOS 2.3.4 scroll animation library, MIT license included; restrained fade-up/zoom-in reveals, reduced-motion handling and visible-content fallback.
- Supplied Stock Axis logo in both header and footer. Original file unchanged; uncropped 160px/240px WebP renditions keep navigation downloads small.
- Fixed up-arrow, visible after 480px of scroll, keyboard accessible, with hero focus restoration and reduced-motion support.
- Actual contact form using public EmailJS service/template configuration from the client-supplied `C:/Users/Umair shaikh/Desktop/prime pips index.html`. Name, email, optional phone, selected topic, message and explicit consent. The selected topic is included in the existing template's message field.

The reference was treated as source material, not a new instruction file. Its EmailJS field mapping and requested interaction patterns informed the revision. The Stock Axis brand and the existing content-integrity rules still govern the page.

## Checks run and results

`node scripts/check.mjs`: PASS — 44 unique IDs, all local assets and anchor targets, exact brand tokens, eight AA text-color calculations, form/consent/honeypot configuration, both logo placements, AOS and fixed up-arrow.

`node --check assets/js/index.js`: PASS. `node scripts/build.mjs`: PASS. `node scripts/build.mjs --production`: expected refusal while client approvals, delivery verification, provider-side CAPTCHA, confirmed courses and domain are outstanding.

Browser command used the existing local Playwright CLI installation:

```sh
playwright-cli -s=stockaxis run-code --filename output/playwright/revision-qa.js --json
node output/playwright/lighthouse-run.mjs
```

The command wrapper was the cached CLI entry point recorded in the baseline QA file. The isolated harness and raw result are saved locally as `output/playwright/revision-qa.js` and `revision-results.json`. They are ignored build/QA artifacts, not runtime dependencies.

**27 browser assertions passed**, covering AOS initialization and on-scroll reveal, both loaded logo renditions, arrow visibility/return/focus, live reduced-motion changes, form validation and error focus, selected-topic payload, provider rejection, rate limiting, network failure, non-OK response rejection, disabled pending state, duplicate prevention, confirmed success, data clearing/topic preservation, success cooldown, honeypot, header CTA hover/active contrast, no-JavaScript behavior and failed-script/module fallbacks. No uncaught site errors were observed.

**All six widths passed:** 320, 375, 390, 768, 1024 and 1440px. No horizontal overflow in main content, header or footer. Desktop/mobile form and full-page screenshots were inspected and are available as `revision-1440.png`, `revision-390.png`, `contact-1440.png` and `contact-390.png` in `output/playwright/`.

**Axe: zero violations** at 390px and 1440px, with 48 and 49 passing rules respectively. During this revision, the active/hover header CTA was found to inherit white navigation text; the selector now keeps dark-on-emerald button text. Native labels, inline errors, focus handling, pending state and status messages are available to keyboard/assistive technology. Real screen-reader and device testing remain outstanding.

## Email delivery test boundary

All **five** attempted provider submissions in browser QA were intercepted locally: failure, rate limit, network failure, an invalid success body and confirmed success. No real test email was sent, no client account setting was changed, and inbox delivery is not claimed. The tests use reserved example addresses and no client/customer personal data. Invalid fields, missing consent, duplicate submissions, cooldown and honeypot do not produce outgoing provider requests. `lead_submit_success` fires only on a confirmed `200 OK` response when the optional local analytics adapter is enabled; no personal information is included in that event.

Timeout handling is implemented with AbortController and retains form values, but the 20-second timeout branch was not separately exercised. Live recipient delivery, production-domain allowlisting, quotas and reCAPTCHA server verification need checking in the existing EmailJS account. The browser honeypot/timing/cooldown checks are not a substitute for server-side bot protection. The reCAPTCHA secret belongs only in the provider dashboard. See `CONTENT_REQUIRED.md` and the official EmailJS links in the README.

## Performance record

Final Lighthouse 13.4.1 local mobile run (simulated throttling, Chromium 153), completed successfully without warnings:

| Category / metric | Measured result |
| --- | --- |
| Performance | **94** |
| Accessibility | **100** |
| Best practices | **100** |
| SEO | **66**, intentional noindex/robots review block |
| First Contentful Paint | 1.3s |
| Largest Contentful Paint | 1.8s |
| Total Blocking Time | 280ms |
| Cumulative Layout Shift | **0** |
| Speed Index | 2.1s |

Raw reports: `output/playwright/lighthouse-mobile.report.html` and `.json`. Early diagnostic runs exposed a startup scroll-position read and a header layout shift; both were repaired. AOS geometry work now starts after scroll activity, outside the first-paint path. A concurrent-browser diagnostic was CPU-contended and was not used as the final measurement. These are the revised page's scores; the initial implementation's 100 performance score is historical. Lab scores do not establish field INP or p75 Core Web Vitals. Recheck once real content and production hosting are integrated.
