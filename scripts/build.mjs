import { mkdir, cp, readFile, writeFile, unlink } from 'node:fs/promises';
import { siteContent as content } from '../assets/js/index.js';
import './check.mjs';

const production = process.argv.includes('--production');
let html = await readFile('index.html', 'utf8');
if (production) {
  const missing = [];
  if (content.reviewMode) missing.push('reviewMode is still enabled');
  if (!content.positioningApproved) missing.push('approved positioning and final page copy');
  if (!content.pageCopyApproved) missing.push('approved complete page copy, including FAQs');
  if (!content.seo?.title || !content.seo?.description || !content.seo?.socialDescription) missing.push('approved SEO and social metadata');
  if (!content.legalApproved) missing.push('approved disclaimer, privacy and enrolment policy content');
  const validWhatsapp = content.contactsVerified && /^\d{8,15}$/.test(content.whatsapp || '');
  const validEmail = content.contactsVerified && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(content.admissionsEmail || '');
  const form = content.enquiry;
  const verifiedForm = form?.enabled && form.deliveryVerified && form.serviceId && form.templateId && form.publicKey;
  if (!(validWhatsapp || validEmail || verifiedForm)) missing.push('verified admissions contact or verified form recipient');
  if (form?.enabled && !verifiedForm) missing.push('EmailJS recipient/template delivery verification for the new domain');
  if (form?.enabled && (!form.captchaSiteKey || !form.captchaEnabledInTemplate)) missing.push('reCAPTCHA v2 site key and server-side verification enabled in the EmailJS template');
  if (!content.courses.length) missing.push('confirmed course catalogue');
  for (const course of content.courses) if (!course.title || !course.level || !course.description || !course.subjects?.length || !course.duration || !course.mode) missing.push(`complete course fields for ${course.id || 'unnamed course'}`);
  let domain;
  try { domain = new URL(content.domain); if (domain.protocol !== 'https:' || domain.pathname !== '/' || domain.search || domain.hash) throw new Error(); } catch { missing.push('confirmed HTTPS production origin'); }
  if (missing.length) { console.error(`Production build blocked:\n- ${missing.join('\n- ')}\nSee docs/CONTENT_REQUIRED.md.`); process.exit(1); }
  const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  html = html.replace(/<title>.*?<\/title>/, () => `<title>${escape(content.seo.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(">)/, (_, start, end) => `${start}${escape(content.seo.description)}${end}`)
    .replace(/(<meta (?:property|name)="(?:og:title|twitter:title)" content=")[^"]*(">)/g, (_, start, end) => `${start}${escape(content.seo.title)}${end}`)
    .replace(/(<meta (?:property|name)="(?:og:description|twitter:description)" content=")[^"]*(">)/g, (_, start, end) => `${start}${escape(content.seo.socialDescription)}${end}`);
  // Copy must be reviewed before the two approval flags above are enabled.
  html = html.replace('<meta name="robots" content="noindex, nofollow">', `<meta name="robots" content="index, follow">\n  <link rel="canonical" href="${domain.origin}/">\n  <meta property="og:url" content="${domain.origin}/">`);
  html = html.replace('</head>', `  <meta property="og:image" content="${domain.origin}/assets/stock-axis-logo-original.png">\n  <meta property="og:image:width" content="1080">\n  <meta property="og:image:height" content="1080">\n  <meta property="og:image:alt" content="Stock Axis Academy original logo">\n  <meta name="twitter:image" content="${domain.origin}/assets/stock-axis-logo-original.png">\n</head>`);
  // Review banners must be absent even with JavaScript disabled.
  html = html.replaceAll('data-review-only', 'data-review-only hidden');
  await mkdir('dist', { recursive: true });
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${domain.origin}/sitemap.xml\n`);
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${domain.origin}/</loc></url></urlset>\n`);
} else {
  await mkdir('dist', { recursive: true });
  await cp('robots.txt', 'dist/robots.txt');
  await unlink('dist/sitemap.xml').catch((error) => { if (error.code !== 'ENOENT') throw error; });
}
await cp('assets', 'dist/assets', { recursive: true });
await writeFile('dist/index.html', html);
console.log(`Built ${production ? 'production' : 'noindex design review'} into dist/. No hosting or deployment performed.`);
