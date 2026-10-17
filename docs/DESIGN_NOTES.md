# Design and implementation record

The exact three-paragraph creative direction in `STOCK_AXIS_CODEX_SPEC.md`, section 1, remains the governing brief. Brand tokens follow section 2 verbatim.

## Visual decision

Two compositions were considered before implementation: an editorial type-led split with a quiet annotated market study, and an illustration-led arrangement with the headline overlaying a larger chart. The type-led split was selected for headline legibility, a strong mobile reading order and a clearer separation between education and illustrative market geometry. The second composition was not shipped.

The visual story proceeds from the hero's question of perspective into numbered learning themes, a divided educational framework, a linear suggested reading path, the original identity, honest FAQs and a calm next step. Emerald leads action and emphasis. Crimson marks bearish geometry and the risk principle. No price labels, live tickers, badges, profit claims or fabricated proof appear.

Manrope is self-hosted as one 24.8 KB Latin variable WOFF2, with its SIL Open Font License. System monospace captions provide technical contrast. Numbered rules, open rows and restrained section changes provide rhythm without a repeating card template. Main explanatory copy is 16px or larger; smaller captions are subordinate. The original logo is unaltered and contained in a deliberately black frame. Header/footer include optimised renditions of that same logo beside readable brand text. The simple candlestick favicon is a site utility graphic.

## Phases

| Phase | Completed work |
| --- | --- |
| A — Audit | Read the entire specification and starter note; inspected logo and all existing files; no prior implementation or Git repository existed; initialized Git and preserved inputs |
| B — Foundation | Exact color variables, local font/license, responsive containers, spacing, buttons, sticky navigation, focus styles and semantic landmarks |
| C — Hero | Selected the type-led variant; built original lightweight SVG; supplied descriptive illustration caption; desktop entrance sequence and static reduced-motion fallback |
| D — Full page | All requested chapters, clearly gated draft themes, generic framework and suggested journey, original-logo academy fallback, truthful FAQs, enquiry status and footer; no fake proof |
| E — Interactions | Accessible mobile menu, focus loop/Escape/scroll lock, contextual interest selector, native FAQ disclosure, active-section observer, opt-in analytics adapter, contact verification gate |
| F — QA | Static validation, contrast calculations, six viewport checks, desktop/mobile screenshots, keyboard/no-JavaScript/reduced-motion checks, axe and Lighthouse; details in QA checklist |
| G — Handoff | Editable content config, preview/build scripts, production approval checks, content blockers and static-hosting instructions |

The requested AOS 2.3.4 library is self-hosted with its MIT license. Reveals run once for 500ms with a considered cubic easing curve, modest vertical movement and stagger; the logo panel has a restrained scale reveal. Geometry setup happens in an idle moment after scrolling begins, because these effects apply below the first screen. Styles only conceal unrevealed items after successful initialization. Reduced-motion preference changes and script failure leave content visible. Keyboard focus reveals its parent container immediately. The fixed up-arrow appears beyond 320px of scroll, with an SVG progress ring that fills while reading and drains on return. Every same-page link uses one eased scroll controller with a fixed-header offset, URL update and destination focus. Wheel, touch and keyboard input can cancel it. Reduced motion and skip links stay immediate. The review utility strip is removed and form copy no longer exposes its delivery provider. A tiny early navigation marker gives the mobile header its final size before first paint; if a module fails, native links are restored at load.

The contact section now contains a real enquiry form with the supplied old reference's EmailJS public configuration. Name/email/optional phone/topic/message and consent are laid out within the established palette. The left editorial headline remains in view on desktop while the visitor completes the form. No stock photo, generated raster illustration, custom server, database or tracking request is needed. AOS, fonts, scripts and ordinary page assets remain same-origin; only an intentional form submission uses EmailJS. A configured reCAPTCHA widget loads Google only when its site key is supplied. Live delivery and provider-side spam verification still require the client account checks documented in `CONTENT_REQUIRED.md`.
