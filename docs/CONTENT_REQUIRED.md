# Client content and launch gate

All items below are **unconfirmed** unless supplied by the client. The original brand/logo and the EmailJS browser configuration in the supplied old reference have been provided. That reference does not establish the current recipient, allowed origin or account status. Generic educational copy and the proposed tagline still require approval.

| Required information | Current treatment | Before launch |
| --- | --- | --- |
| Vector or transparent original logo, if available | Original PNG preserved; contained, optimised renditions in header/footer and original image in About | Optional asset upgrade, with client permission; do not redraw |
| Exact positioning, tagline, hero and page copy | Proposed copy and visible design-review status | Approve all text, including framework and suggested journey; set positioning/page-copy flags only after review |
| Real course names, level, syllabus, duration, modes, schedule, languages and fees | Three clearly labelled **draft learning themes**, stored separately from verified courses | Populate verified catalogue; never treat samples as offerings; remove review descriptions and update no-JS fallback |
| Audience, country/city, geographical restrictions | No location, currency, age or audience claims | Confirm intended audience; adapt copy, language and regulatory review |
| Verified WhatsApp and admissions email | Not invented; form uses the existing reference's EmailJS service | Optional direct channels: verify ownership and recipient before enabling |
| Physical address and map link, if applicable | Omitted | Add only if confirmed and relevant; omit for online-only businesses |
| Founder/mentors, credentials, biographies and permissioned media | Honest fallback about pending academy information; no invented educator | Add approved material or retain a generic academy section without credential claims |
| Genuine testimonials with permission | Entire section omitted | Optional; remain omitted if none supplied |
| Admission process and lead recipient | Enquiry form uses the public EmailJS configuration from the supplied reference; submission stays disabled until delivery is verified | Confirm recipient/template mapping, quota and allowed origin; do a real delivery check and set `enquiry.deliveryVerified` |
| Server-side spam verification | Honeypot, minimum fill time, pending-submit lock and cooldown implemented; reCAPTCHA v2 integration ready | Supply site key, enable verification and secret in EmailJS, verify widget/domain, then set `captchaEnabledInTemplate`; no secret in browser |
| Domain and hosting | No canonical, sitemap or registration assumed from folder name | Confirm HTTPS origin and static host; generate production sitemap/canonical and verify HTTPS |
| Privacy, risk disclaimer, enrolment/refund/certificate policies | General educational risk notice; no invented policy links or terms | Obtain approved content and real destinations; complete financial-advertising review for intended market; set legal flag after review |
| Analytics authorization and privacy handling | No trackers; event adapter off | Remain off unless approved; no fake conversions; configure consent if required |

## Review versus launch behavior

`reviewMode: true` selects the explicitly labelled draft learning topics. The review utility strip and footer development status have been removed at the user's request. The page and robots file still prevent indexing, and approval checks remain in the production build. `npm run build` exports this review state, not an approved public launch.

With `reviewMode: false`, JavaScript uses only confirmed `courses`. Unknown mentor and direct-contact details have safe fallback states. The production build checks approved copy, legal review, metadata, a verified contact route, a complete course catalogue and an HTTPS origin. An enabled form additionally requires recipient delivery verification and configured server-side reCAPTCHA verification. The build checks presence and formatting; client approval and factual correctness still require a human review.

Until those requirements are met, **do not launch**. Do not remove noindex just to improve an audit score. No production domain, phone, fees, mentor credentials or testimonials have been fabricated.
