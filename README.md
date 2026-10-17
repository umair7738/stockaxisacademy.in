# Stock Axis Academy

A single-page, static design review in the **Precision Editorial FinTech** direction. HTML5, custom CSS and vanilla JavaScript, with self-hosted AOS scroll animations. Fonts and presentation assets are local. The contact form uses the EmailJS configuration supplied in the client's old reference website. No custom backend or framework is required.

**Status: design implementation complete; client content and launch approval outstanding.** The page visibly labels draft learning themes. Admissions contact details, course offerings, educators and commercial terms are not assumed. Testimonials and unverified proof are omitted.

## Preview locally

Install Node.js if it is not already available. No `npm install` is needed.

```sh
npm run preview
```

Open `http://127.0.0.1:4173`. Keep that terminal running; press Ctrl+C to stop. Use an HTTP server, rather than double-clicking the HTML file, because the content configuration uses JavaScript modules. If the port is occupied, set the `PORT` environment variable before starting.

```sh
npm run check
npm run build
node scripts/serve.mjs --dist
```

The default build puts a **noindex design review** in `dist/`. Do not publish that as the final client site. The preview server is for local development, not internet hosting.

## Where to edit

| File | Purpose |
| --- | --- |
| `index.html` | Semantic page, editorial copy, FAQ answers and disclaimer |
| `assets/css/styles.css` | Exact brand tokens, responsive layouts, typography, focus and motion |
| `assets/js/site-content.js` | Review mode, draft topics, verified courses, mentor, contact and approval settings |
| `assets/js/main.js` | Mobile menu, selected topic, verified-channel links, active navigation and opt-in event adapter |
| `assets/js/navigation-boot.js` | Tiny early enhancement marker to prevent header layout shift, with native navigation fallback if modules fail |
| `assets/js/contact-form.js` | EmailJS delivery, accessible validation, sending/error/success states, consent and anti-spam checks |
| `assets/js/motion.js` | AOS setup, reduced-motion preferences, visible-content fallback and focus handling |
| `assets/js/scroll.js` | Shared eased section/back-to-top scrolling, interruption, header offset, focus/history and SVG scroll-progress ring |
| `assets/vendor/aos/` | Self-hosted AOS 2.3.4 and its MIT license |
| `assets/img/market-study.svg` | Original conceptual market illustration; no data feed |
| `assets/stock-axis-logo-original.png` | Unmodified client logo, intentionally framed against black |
| `assets/img/stock-axis-logo-*.webp` | Resized, losslessly encoded logo renditions for header/footer; same design, no cropping or recoloring |
| `assets/fonts/` | Self-hosted Manrope Latin variable font and SIL Open Font License |
| `docs/CONTENT_REQUIRED.md` | Specific missing facts and launch blockers |
| `docs/QA_REVISION.md` | Current reference-driven revision checks, measured results and limitations |
| `docs/QA_CHECKLIST.md` | Historical baseline before the reference-driven revision |
| `docs/DESIGN_NOTES.md` | Art direction, design decisions and implementation phases |

## Add real client information

1. Work through `docs/CONTENT_REQUIRED.md`. Obtain approved copy; replace review references throughout the HTML, including FAQs, About and the no-JavaScript course fallback. Approval flags are attestations after editorial review, not automatic verification.
2. Add confirmed courses to `courses` in `site-content.js`. Each needs a unique `id`, `title`, `level`, `description`, `subjects`, `duration` and `mode`. Draft themes live in a separate array and are selected only in review mode.
3. Verify the existing EmailJS service/template in the client dashboard: recipient, template field mapping, account quota and allowed production origin. The old reference's public browser configuration is already in `enquiry` in `site-content.js`; no private key is used. After a real delivery check, set `enquiry.deliveryVerified` to true. Configure a reCAPTCHA v2 site key in `enquiry.captchaSiteKey`, enable verification in the EmailJS template and set `captchaEnabledInTemplate` after checking it. The CAPTCHA secret belongs only in EmailJS. The production build requires these checks for an enabled form. Direct WhatsApp and email links remain optional; enable them only after verifying ownership using `contactsVerified`.
4. Add a mentor only with an approved name, role and bio. Add photos or testimonials only with permission. There are no fictional profiles to replace.
5. Set the confirmed HTTPS origin in `domain`. The repository folder name is not treated as domain ownership confirmation. Set approved `seo.title`, `seo.description` and `seo.socialDescription`.
6. After client sign-off, set `positioningApproved`, `pageCopyApproved`, `legalApproved` to true and `reviewMode` to false. Review audience, legal/policy requirements and the privacy implications of external contact services. Add approved policy content and real destinations when supplied.
7. Run `npm run build:production`. It intentionally fails while required information is absent. A successful production build emits canonical/social URLs, the original logo as the social image, an origin-specific sitemap and indexable robots rules. No unverified organization/course/review schema is added.

## Static hosting

After content approval and successful production build, upload **the contents of `dist/`** to any conventional static hosting service. Node is needed only for local tooling; the hosted page needs no Node server. No deployment has been performed.

Enable HTTPS, HTTP-to-HTTPS redirection and compression at the host. Serve `.woff2` as `font/woff2`, `.webp` as `image/webp`, `.js` as JavaScript and `.svg` as `image/svg+xml`. Keep HTML revalidating; use sensible asset cache durations and purge on updates. Suggested security headers include `X-Content-Type-Options: nosniff` and `Referrer-Policy: strict-origin-when-cross-origin`. A Content Security Policy must allow `https://api.emailjs.com` in `connect-src` for form delivery. When enabling reCAPTCHA, allow its documented Google script, frame and connection origins too; test the actual widget under the deployed policy. Keep ordinary scripts, fonts and illustrations restricted to self, and use `object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'none'` (the form sends by fetch). Enable HSTS only after the domain is serving HTTPS correctly.

Check the deployed URL on real devices, verify recipient links, and re-run Lighthouse after hosting. The local report does not establish field Core Web Vitals or compliance with local financial-advertising requirements.

## Analytics and enquiries

Analytics are off by default. After privacy approval, `analyticsApproved` enables local `stockaxis:analytics` events; connect an approved consumer separately. Events identify CTA location/topic without names, emails or phone numbers: `cta_course_click`, `cta_enquiry_click`, and `whatsapp_click` when its actual link is clicked. `lead_submit_success` is emitted only after EmailJS returns its documented `200 OK` confirmation. It records provider acceptance, not a completed conversation or guaranteed inbox delivery.

The contact form sends name, email, optional phone and message only when a visitor checks consent and submits. It preserves the old template's `name`, `email`, `phone`, `message`, `website` and `time` fields, and includes the selected topic in the message so templates do not need a new field to show it. Details are not stored in localStorage or analytics. Invalid fields, provider rejection, rate limits, network errors and timeouts never produce a success message. Duplicate submits are locked while sending; a honeypot, minimum fill time and success cooldown add client-side friction. Those checks are not server-side bot protection: enable reCAPTCHA verification in EmailJS and configure its domain allowlist before public launch. Browser QA intercepts all test sends; no real inbox delivery has been claimed.

Implementation follows the official [EmailJS send API](https://www.emailjs.com/docs/rest-api/send/) and [reCAPTCHA v2 setup](https://www.emailjs.com/docs/user-guide/adding-captcha-verification/). No provider account settings were changed by this task.

Git was initialized in the previously unversioned folder. Original assets and the supplied specification are preserved. Build output and local QA artifacts are ignored.
