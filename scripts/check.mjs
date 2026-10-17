import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { siteContent } from '../assets/js/index.js';

const html = await readFile('index.html', 'utf8');
const css = await readFile('assets/css/index.css', 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML IDs');
assert.equal([...html.matchAll(/<h1\b/g)].length, 1, 'Exactly one H1');
for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(id), `Broken anchor #${id}`);
for (const [, file] of html.matchAll(/(?:href|src)="(assets\/[^"#?]+)(?:\?[^"#]*)?"/g)) assert((await stat(file)).isFile(), `Missing asset ${file}`);
for (const token of ['#00D49C', '#00B889', '#F43F5E', '#0B1220', '#111C2B', '#172435', '#273647', '#F1F5F9', '#A8B5C5', '#071B17']) assert(css.includes(token), `Missing token ${token}`);
assert(html.includes('noindex, nofollow'), 'Review must not be indexed');
assert(html.includes('name="description"'), 'Missing meta description');
assert(html.includes('property="og:title"') && html.includes('name="twitter:card"'), 'Missing social metadata');
assert(css.includes('prefers-reduced-motion'), 'Missing motion fallback');
assert(html.includes('id="contact-form"'), 'Missing contact form');
assert(html.includes('name="consent"') && html.includes('name="company_url"'), 'Missing consent or honeypot');
assert(siteContent.enquiry?.serviceId && siteContent.enquiry?.templateId && siteContent.enquiry?.publicKey, 'Missing reference EmailJS configuration');
assert.equal([...html.matchAll(/class="brand-image"/g)].length, 2, 'Original logo must appear in header and footer');
assert(html.includes('id="scroll-top"'), 'Missing fixed back-to-top control');
assert(html.includes('assets/vendor/aos/aos.js'), 'Missing self-hosted AOS');
assert(!/href="(?:#|javascript:|tel:)"/.test(html), 'Inert or unverified destination');
assert(!/\.innerHTML\s*=|\beval\s*\(/.test(await readFile('assets/js/index.js', 'utf8')), 'Unsafe DOM construction');
assert.equal(new Set(siteContent.draftTopics.map((topic) => topic.id)).size, siteContent.draftTopics.length);
// WCAG contrast: test actual text states, including hovered CTA and red label.
const linear = (value) => { const n = value / 255; return n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4; };
const luminance = (hex) => { const rgb = hex.match(/[a-f\d]{2}/gi).map((n) => linear(parseInt(n, 16))); return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722; };
const contrast = (a, b) => { const values = [luminance(a), luminance(b)].sort((x, y) => y - x); return (values[0] + .05) / (values[1] + .05); };
for (const [fg, bg, label] of [
  ['#F1F5F9', '#0B1220', 'Main text/base'], ['#A8B5C5', '#111C2B', 'Muted/surface'],
  ['#00D49C', '#0B1220', 'Emerald/base'], ['#00D49C', '#111C2B', 'Emerald/surface'],
  ['#071B17', '#00D49C', 'CTA/default'], ['#071B17', '#00B889', 'CTA/hover'],
  ['#F43F5E', '#111C2B', 'Crimson label/surface'], ['#A8B5C5', '#172435', 'Muted/elevated']
]) { const ratio = contrast(fg, bg); assert(ratio >= 4.5, `${label}: ${ratio}`); console.log(`${label}: ${ratio.toFixed(2)}:1 PASS`); }
console.log(`PASS: document structure, ${ids.length} unique IDs, anchors, assets, brand tokens, content safety and metadata.`);
