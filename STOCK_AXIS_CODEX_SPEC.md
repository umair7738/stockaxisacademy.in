# Stock Axis Academy — Codex Website Blueprint

**Project:** A single-page, mobile-first, premium marketing website for a real trading/stock-market education academy.
**Primary business goal:** Convert suitable visitors into genuine course enquiries/admission conversations without hype or misleading investment claims.
**Status:** Implementation-ready design/engineering brief. Client-specific facts are NOT confirmed; see Content Gate.
**Supplied asset:** `assets/stock-axis-logo-original.png` is the client's original 1080×1080 raster logo. Preserve its identity. It has an opaque near-black background: don't display it unframed as a visible black square on midnight-slate cards. Ask for a transparent/vector original if possible; until then, use a tasteful contained treatment and a text-based compact navbar wordmark without pretending it's an official alternate logo. Do not redraw or mutate the logo without approval.

## 0. Instructions to Codex — read before editing

You are an experienced design engineer, frontend architect, conversion-focused UX designer, technical SEO reviewer and web accessibility reviewer. Build a *real working website*, not an inert mockup or a generic AI-generated template. Work in the current repository. Inspect the codebase first; do not destroy an existing implementation. Execute in small, testable stages, maintain a clear file structure, and tell me what you tested and what still needs real client content or configuration.

If repository is empty, prefer semantic HTML5, custom CSS and vanilla JavaScript. This is a STATIC one-page brochure/lead-generation site, not an LMS. Do not introduce React, Next.js, Tailwind, an unnecessary backend, a database, dashboard, authentication or a bulky component library. CSS Grid/Flex and accessible HTML are enough. GSAP is optional for 1–2 carefully chosen premium animations, but prefer performant CSS/IntersectionObserver and provide no-motion fallback. The client brand is non-negotiable; the attached style-generator prompt influences *creative atmosphere*, NOT the business concept, brand colors or the requirement to use exactly one cohesive scrolling page.

Use the exact brand design direction and constraints below. Do not invent course prices, course titles presented as facts, educator bios, credentials, student numbers, success rates, testimonials, legal registration, contact details, phone numbers or physical addresses. If unknown, use visibly marked editable placeholders in source/config and either hide the section in production or write accurate generic educational copy with a clear pending approval note in documentation. Never publish fake credibility signals.

## 1. Lock the design: Precision Editorial FinTech

**Chosen style (intentional hybrid, NOT random):** Dark-Mode First × Swiss/International typography × Editorial composition × subtle Kinetic detailing. Emotional characteristics: cerebral, trustworthy, precise, premium, measured and motivating. Not casino-like, no neon crypto dashboard, no overcrowded glowing cards, no vague floating blobs, no stock-image traders staring at screens, and no unoriginal three-card-everywhere template.

### The creative-art-direction prompt — EXACTLY THREE PARAGRAPHS

Design a single cohesive scrolling landing page for **Stock Axis Academy**, a real stock-market education brand, in a distinctive **Precision Editorial FinTech** style combining dark-mode-first elegance, Swiss grid discipline, editorial typography and restrained kinetic storytelling. The mood should be quietly confident, intellectually engaging and optimistic without suggesting easy money. A visitor should feel that complex markets can be understood through structured learning: from curiosity in the hero, to clarity in the curriculum, to trust in the educators, to calm confidence at the final enquiry CTA. Use emerald green and crimson red purposefully as the academy's bullish/bearish identity, with generous dark neutral space that makes their colors feel meaningful.

Treat the page as a carefully paced learning narrative, not a stack of unrelated template sections. Let typography carry authority through bold, considered headlines, elegant asymmetry, generous breathing room and measured line lengths. Visuals should evoke market structure through fine grids, abstract price paths and subtle candlestick geometry rather than fake live trading data. Interactions should feel precise and quiet: smooth anchor transitions, tiny hover responses, one memorable hero reveal, and optional gentle chart motion that never competes with reading. As visitors scroll, the feeling should progress from intrigue to understanding, from understanding to genuine evidence of teaching credibility, then to a welcoming, low-friction invitation to enquire.

Take abstract inspiration from the precision of an architectural blueprint, the quiet concentration of a design library, the rhythm of an editorial financial journal, and the material restraint of a premium instrument. Let alignment, typography, contrast, technical linework and motion choreography suggest expert craftsmanship without referencing or imitating any named platform or brand. The result must remain **ONE COHESIVE SINGLE-PAGE LANDING PAGE**, not multiple pages, an admin interface, a trading terminal or an e-learning portal. Make it original through composition and visual intelligence rather than decoration for its own sake.

## 2. Brand tokens — locked from prior approved design discussion

| Token | Value | Where to use |
|---|---|---|
| Emerald / Bull | `#00D49C` | Primary CTAs, active states, select highlights |
| Emerald hover | `#00B889` | Hover state; check contrast before using |
| Crimson / Bear | `#F43F5E` | Bear-market conceptual visuals, small editorial accents, errors with labels |
| Page background | `#0B1220` | Main midnight-slate canvas, not pure black |
| Surface | `#111C2B` | Alternating sections, nav, cards |
| Elevated | `#172435` | Hover layers and select panels |
| Border | `#273647` | Fine dividers, outlines |
| Main text | `#F1F5F9` | Headings, body |
| Muted text | `#A8B5C5` | Explanations, labels |
| Dark-on-green CTA text | `#071B17` | Green buttons |

**Composition ratio (guideline):** 60% base dark / 30% differentiated surfaces / 8% emerald / 2% crimson. Use color with semantic meaning, not as a section-by-section decoration. Red is NOT the default CTA color. Use icons/text as well as red/green for meaning. Avoid white tiny text on crimson buttons; white-on-`#F43F5E` is only ~3.67:1, insufficient for normal-text WCAG AA. Verified combinations from earlier evaluation: main text on base ~17.09:1; muted on base ~8.99:1; muted on surface ~8.23:1; green on base ~9.72:1; dark-on-green ~9.25:1. Recheck all real final UI states.

**Typography:** Try Manrope or Inter (licensed and optimized), strong headline rhythm, intentional hierarchy, no more than two font families, readable body 16–18px desktop/mobile. Use responsive `clamp()` sizes, disciplined tracking and line-height. Maximum content width approx 1160–1240px; generous gutters; hero may use an asymmetrical 55/45 split on desktop and readable stacked order on mobile. Use custom grid and editorial rules rather than cookie-cutter card grids. Respect `prefers-reduced-motion`.

## 3. Single-page sitemap and content/UX behavior

Use semantic landmarks: skip link, header/nav, main with meaningful section IDs, footer. Anchor nav: `Courses`, `Why Us`, `Learning Journey`, `About`, `FAQs`, `Contact` (hide or adapt unverified sections). Fixed/sticky nav only if it remains compact and does not consume too much small-screen space.

1. **Nav / utility strip:** Brand logo or approved compact text treatment, anchor links, contrasting `Enquire Now` button, accessible hamburger menu on mobile, active-section indication, smooth anchor navigation with fixed-header offset.
2. **Hero — signature visual:** Eyebrow `STOCK MARKET EDUCATION` (verify preferred wording); bold original headline candidate **“Read the Market. Not the Hype.”**; supporting line about learning market concepts, discipline and risk awareness; main CTA `Explore Courses` to #courses, second CTA `Ask About Admissions` to #contact. On right/behind, a custom vector/canvas-free **illustrative** candlestick-grid composition with bull/bear accents. No fake “live” ticker, real-time pricing, winning trades, guaranteed returns or invented statistics. Include a small visual label `Illustrative market graphic` if it resembles data.
3. **Clarity strip / what students will explore:** compact editorial rail of themes such as *market foundations*, *chart reading*, *risk awareness* (these are draft topics only; verify offerings before publishing). This replaces generic unverified numeric achievement counters.
4. **Courses / programs:** Two or three visually distinct modules with actual confirmed course names, intended level, key subjects, delivery format, duration and real CTA when provided. If unknown, structure data in a single editable config/data file and show design-review sample content clearly separated from production content. Never fabricate prices or course certificates.
5. **Why learn here:** Four concise evidence-backed reasons explaining instructional method, practice/examples, conceptual clarity and risk-first mindset — claims only once verified by client. Use asymmetric editorial tiles, not four indistinguishable gradient cards.
6. **Learning journey:** Minimal visual progression (`Explore` → `Understand` → `Practice` → `Enquire/Continue`) only if consistent with actual teaching. An abstract educational-process timeline, not a false promise of a student experience that hasn't been confirmed.
7. **About / mentor:** Real founder/mentor bio, teaching credentials and authentic photographs only after client confirmation. Before that, design a flexible layout with an appropriate hide/fallback state instead of a fictional instructor.
8. **Testimonials / proof:** Only real, approved, permissioned reviews. If none are available, omit the section in the production page; do not manufacture student names, star ratings, screenshots, logos or success metrics.
9. **FAQ:** Actual questions/answers about prerequisites, delivery mode, schedule, language, fees and certificate/refund policy, once provided. Use a real keyboard-operable accessible disclosure interface (`details/summary` or suitable ARIA accordion). Never answer unknown commercial terms by guessing.
10. **Lead-conversion section:** Strong supportive headline `Start With Better Questions About the Market.` and low-friction option to contact admissions, choose a course of interest and enquire. Only enable working CTA destinations. Persistent WhatsApp control after number verification, with accessible label and tracking event. If enquiry form is requested, build proper server-side delivery through an approved endpoint/service, with validation, error/success states, consent notice, anti-spam protection and no exposed secrets. A visual-only form is NOT acceptable for launch.
11. **Footer:** Real business/brand details, contact methods, relevant legal pages, copyright and education/risk notice. Link to privacy/disclaimer policy only once actual destination/content is supplied. Educational disclaimer must not imply trading profits are guaranteed.

**Conversion funnel:** Hero CTA → Courses → individual `Enquire about this course` (preselects course in enquiry field if present) → verified WhatsApp/contact channel → completed admission conversation. On mobile prioritize quick, understandable actions; no intrusive popups or auto-open chats. Track actual goal events only with privacy-compliant tools: `cta_course_click`, `cta_enquiry_click`, `whatsapp_click`, and `lead_submit_success` (the latter only if submission succeeds).

## 4. Art direction: detailed components and motion

- **Hero visual:** original SVG geometric candlesticks, fine horizontal grid, line segments, highlighted bull/bear formations, gentle diffuse emerald focus, red used as counterpoint. Design it as a polished editorial abstract illustration, not a trading chart asserting actual prices. Decorative elements should be `aria-hidden` and avoid heavy DOM counts.
- **Editorial rhythm:** alternate full-bleed dark background and contained elevated surface sections; introduce distinctive number tags, thin editorial rules, large typographic chapter labels, off-center composition and occasionally overlapping visual geometry. Maintain consistency rather than randomly changing styles.
- **Microinteractions:** navigation hover underline, green CTA with subtle lift/color transition, course border emphasis, accordion animation respecting reduced motion, one entrance motion sequence on hero, scroll reveals no longer than ~500ms and never hiding content if JS fails.
- **Do NOT:** fake terminal UI, infinite horizontal carousels, auto-playing audio/video, unreadable tiny text, several competing glowing colors, decorative 3D clutter, parallax-heavy mobile animations, pulsing buttons, fabricated proof.
- **Imagery:** client logo is a real supplied asset; remaining visuals may use code-authored vector illustrations and simple branded patterns. Stock photos only when licensed, relevant and approved. Avoid remote unlicensed logos.

## 5. Suggested static project structure

```
/
  index.html
  assets/
    stock-axis-logo-original.png
    css/styles.css
    js/main.js
    img/                # Generated original lightweight SVG illustrations
  docs/
    CONTENT_REQUIRED.md
    QA_CHECKLIST.md
  README.md
  robots.txt            # Add correct rules at launch
  sitemap.xml           # Use real domain ONLY after domain provided
```

You may adjust layout to fit the actual repository. Put content that requires client replacement in a clean config/data object (for example `assets/js/site-content.js`) or plainly marked semantic HTML regions. Do not embed secret credentials anywhere. Avoid external runtime dependencies unless necessary. If using fonts hosted externally, be mindful of licensing, fallback, latency and privacy.

## 6. Functional/technical acceptance criteria

- **Responsive:** widths from 320px upward; manually check 320, 375/390, 768, 1024, 1440; no horizontal scroll or clipped nav/headings; correct menu focus/escape/body scroll; touch targets ~44×44px where feasible.
- **Accessibility:** WCAG 2.2 AA target, keyboard-only navigation, skip link, proper focus-visible, semantic heading order, alt text for meaningful photos, accessible `<label>` + helpful validation for forms, reduced-motion alternative, text/border contrast verification.
- **Performance:** aspirational Lighthouse mobile Performance ≥90, Accessibility ≥95, SEO ≥95 when real production content/assets are integrated, but never claim scores without actually testing. Field Core Web Vitals targets at p75: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1. Optimize LCP hero, image dimensions, fonts, JS defer, SVG complexity; lazy-load only below-fold media.
- **SEO:** unique accurate title and meta description, one logical H1, correct heading hierarchy, semantic HTML, Open Graph/Twitter preview, accessible anchor IDs, robots directives, actual sitemap & canonical only after production domain confirmed. `EducationalOrganization` schema only if true official organization details provided; accurate `Course` schema only for verified real courses. No fabricated stars, rich results or false FAQ markup claims.
- **Security/privacy:** HTTPS deployment, no secret keys in browser, no untrusted `innerHTML`, no bogus backend, consent/privacy where required, reliable spam protection and safe processing for any real enquiry form. Only enable analytics after client approves the setup and appropriate privacy handling.
- **Functional:** every link and CTA goes to a real section, URL or verified contact channel; course CTA supplies useful context; FAQ operates with keyboard; menu works on touch; failed submissions show helpful states. No dead buttons, lorem ipsum or fake social proof in published site.
- **Legal:** clearly position offering as **education**. Do not advertise guaranteed outcomes, fixed daily returns, investment recommendations or license claims without documentation. Review applicable financial advertising/regulatory requirements for the intended market before launch.
- **Operational:** work from Git, preserve existing code, keep source editable, produce a simple README with local preview and deployment steps (static hosting), and include a QA checklist with honest pass/fail/test-not-run status.

## 7. Client Content Gate (get these before final launch)

**Required:** 1) final brand/logo vector or transparent PNG if available; 2) approved exact academy positioning and tagline; 3) real courses with title, syllabus, duration, modes, timings, languages, fees; 4) audience/country/city; 5) verified WhatsApp number and admissions email; 6) academy physical address/maps link, if applicable; 7) founder/mentor names, credentials and approved media; 8) genuine testimonials with permission; 9) enrollment workflow and lead recipient; 10) domain and hosting choice; 11) approved privacy notice, financial-education disclaimer and relevant policy content; 12) authorization for analytics/tracking.

If information is missing, build the design faithfully using draft copy and explicit development markers, but do NOT silently publish guesses as facts. Add a `docs/CONTENT_REQUIRED.md` checklist of all blockers and whether each affected section should be hidden in a launch build.

## 8. Implementation sequence — execute, don't stop after the plan

**Phase A — Repo audit + architecture:** Examine existing files, note conflicts and preservation plan. Create/confirm structure and token sheet.

**Phase B — Design foundation:** Implement font strategy, background grid, responsive page container, spacing scale, typography, branded buttons and nav. Use original logo carefully and avoid black image box mismatch.

**Phase C — Distinctive hero:** Develop high-quality original hero and SVG illustration. Ensure first mobile fold is impressive, fast and readable. For design quality, explore 2 variations privately (one stronger editorial type-led composition, one art-directed market visual), then select the stronger that respects the brand and implement only one coherent style.

**Phase D — Full page sections:** Build each section from Section 3 with content gated appropriately, unique compositions and reusable CSS components. Use polished but truthful placeholders in dev; hide unverified credibility in production.

**Phase E — Interactions + lead channel:** working sticky nav, mobile menu, FAQs, actual CTA paths, and functional WhatsApp/enquiry delivery when verified details exist. No pretend submissions.

**Phase F — QA and refinement:** Test breakpoints, keyboard, reduced-motion, hover/focus, slow loading, semantic SEO and links. Run automated checks if environment allows and report exact test commands/results. Manually inspect screenshots at mobile and desktop if screenshot/browser tools are available. Improve any defects found.

**Phase G — Handoff:** Provide a summary of files changed, design choices, how to preview, how to deploy, missing client data, possible risks, and what was actually tested. Do not say 'production ready' if client content, phone, form endpoint or legal review remain unresolved.

## 9. Definition of done

An original visually impressive yet credible single-page site exists; all client brand tokens are respected; the hero is not generic; mobile navigation and CTAs work; content sections are clearly distinguishable; verified data is separated from placeholders; on-page SEO/accessibility/performance fundamentals are present; no claims or statistics are fabricated; and a nontechnical owner can easily find where to edit courses and contact details. Anything not ready is listed as a specific blocking item, not silently approximated.
