// Runs before the stylesheet so the enhanced mobile header has its final size
// Enable enhanced navigation. If the main module fails, restore the native link list.
if (typeof document !== 'undefined') {
  document.documentElement.classList.add('js');
  window.addEventListener('load', () => {
    if (document.querySelector('.menu-toggle')?.dataset.ready !== 'true') {
      document.documentElement.classList.remove('js');
    }
  }, { once: true });
}


/* CLIENT CONTENT GATE: all unconfirmed business facts belong here.
 * Keep reviewMode true until the client approves the final content.
 * Never add invented details. Text is rendered with textContent, never innerHTML.
 */
const content = {
  reviewMode: true,
  domain: null,
  positioningApproved: false,
  pageCopyApproved: false,
  legalApproved: false,
  seo: null, // { title, description, socialDescription } approved for launch
  // Full international digits, no + or punctuation; set only after verification.
  whatsapp: null,
  admissionsEmail: null,
  contactsVerified: false,
  // Public browser configuration copied from the client-provided old website.
  // Verify recipient, allowed origin and template CAPTCHA in EmailJS before launch.
  enquiry: {
    enabled: true,
    serviceId: 'service_dkms7v6',
    templateId: 'template_0ya6zmc',
    publicKey: '6xiSoFeFiS5dIH5kn',
    deliveryVerified: true,
    captchaSiteKey: null,
    captchaEnabledInTemplate: false
  },
  // Enable only with an approved privacy/analytics setup and a local event consumer.
  analyticsApproved: false,
  courses: [], // { id, title, level, description, subjects: [], duration, mode }
  mentor: null, // { name, role, bio } with client-approved text only
  draftTopics: [
    { id: 'foundations', title: 'Start with the foundations.', level: 'The starting point', description: 'Explore the language of the market, how exchanges work, and the difference between trading and investing.', subjects: ['Market terminology', 'How markets work', 'Trading & investing'] },
    { id: 'chart-reading', title: 'Look beyond the price.', level: 'A closer look', description: 'Get familiar with price charts, candlestick structure, and the questions a chart can help you ask.', subjects: ['Chart structure', 'Candlestick concepts', 'Context & observation'] },
    { id: 'risk-awareness', title: 'Put risk in perspective.', level: 'The essential lens', description: 'Consider uncertainty, position sizing concepts, and the role of a considered decision-making process.', subjects: ['Risk & uncertainty', 'Position sizing concepts', 'Decision discipline'] }
  ]
};


const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

function setupContactForm({ config, interest, emit, form = document.querySelector('#contact-form'), location = 'contact' }) {
  if (!form) return;
  const button = form.querySelector('[type="submit"]');
  const label = button.querySelector('.submit-label');
  const feedback = form.querySelector('[data-form-feedback]') || form.querySelector('#form-feedback');
  const field = (name) => form.elements.namedItem(name);
  let sending = false;
  let lastSentAt = 0;
  let startedAt = Date.now();
  let widgetId;
  const configured = config?.enabled && config.deliveryVerified && config.serviceId && config.templateId && config.publicKey;
  const say = (message, state = 'error', focus = false) => {
    feedback.textContent = message;
    feedback.dataset.state = state;
    if (focus) feedback.focus({ preventScroll: false });
  };
  if (!configured) {
    say('Enquiries are temporarily unavailable. Please try again once admissions details have been confirmed.', 'info');
    return;
  }
  button.disabled = false;
  form.noValidate = true;

  const validationMessage = (input) => {
    const value = input.value.trim();
    if (input.name === 'consent') return input.checked ? '' : 'Please agree to the use of your details so we can respond.';
    if (input.required && !value) return `Please enter your ${input.name === 'message' ? 'question' : input.name === 'name' ? 'full name' : 'email address'}.`;
    if (input.name === 'name' && (value.length < 2 || value.length > 80)) return 'Use between 2 and 80 characters for your name.';
    if (input.name === 'email' && (input.validity.typeMismatch || value.length > 254)) return 'Please enter a valid email address, such as name@example.com.';
    if (input.name === 'phone' && value && (!/^[+()\d\s.\-]+$/.test(value) || value.replace(/\D/g, '').length < 7 || value.replace(/\D/g, '').length > 15)) return 'Use 7–15 digits, including your country code. Spaces, +, ( ), dots and hyphens are allowed.';
    if (input.name === 'message' && (value.length < 10 || value.length > 2000)) return 'Please write between 10 and 2,000 characters.';
    return '';
  };
  const inputs = ['name', 'email', 'phone', 'message', 'consent'].map(field);
  const controls = [...form.querySelectorAll('input, select, textarea')];
  const validate = (input) => {
    const message = validationMessage(input);
    const error = document.getElementById(`${input.id}-error`);
    error.textContent = message;
    error.hidden = !message;
    if (message) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
    return !message;
  };
  inputs.forEach((input) => {
    input.addEventListener('blur', () => { if (input.value || input.hasAttribute('aria-invalid')) validate(input); });
    input.addEventListener(input.type === 'checkbox' ? 'change' : 'input', () => { if (input.hasAttribute('aria-invalid')) validate(input); });
  });

  // Optional reCAPTCHA v2: its secret stays in EmailJS, never in this site.
  if (config.captchaSiteKey) {
    const container = form.querySelector('.captcha-container');
    container.hidden = false;
    window.stockAxisCaptchaReady = () => {
      widgetId = window.grecaptcha.render(container, { sitekey: config.captchaSiteKey, theme: 'dark', size: 'compact' });
      delete window.stockAxisCaptchaReady;
    };
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?onload=stockAxisCaptchaReady&render=explicit';
    script.async = true;
    script.defer = true;
    script.onerror = () => say('The security check could not load. Check your connection and reload this page.');
    document.head.append(script);
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;
    // Keep the honeypot readonly so browser autofill cannot populate it and
    // falsely classify a genuine enquiry as a bot submission. Automated
    // clients can still be rejected when they deliberately set its value.
    if (field('company_url').value.trim()) { say('This enquiry could not be sent. Please reload the page and try again.'); return; }
    const invalid = inputs.filter((input) => !validate(input));
    if (invalid.length) { say('Please check the highlighted fields. Your enquiry has not been sent.'); invalid[0].focus(); return; }
    if (Date.now() - startedAt < 1500) { say('Please take a moment to review your details, then send your enquiry.'); return; }
    if (Date.now() - lastSentAt < 30000) { say('Your previous enquiry was sent. Please wait 30 seconds before sending another.', 'info'); return; }
    const captchaToken = config.captchaSiteKey && widgetId !== undefined ? window.grecaptcha?.getResponse(widgetId) : '';
    if (config.captchaSiteKey && !captchaToken) { say('Please complete the security check before sending your enquiry.', 'error', true); return; }

    sending = true;
    controls.forEach((input) => { input.disabled = true; });
    button.disabled = true;
    form.setAttribute('aria-busy', 'true');
    label.textContent = 'Sending…';
    say('Sending your enquiry…', 'sending');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    const selectedTopic = interest ? interest.options[interest.selectedIndex].textContent : 'General course information';
    try {
      const response = await fetch(EMAILJS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        signal: controller.signal,
        body: JSON.stringify({
          service_id: config.serviceId,
          template_id: config.templateId,
          user_id: config.publicKey,
          template_params: {
            name: field('name').value.trim(),
            email: field('email').value.trim(),
            phone: field('phone').value.trim(),
            message: `Area of interest: ${selectedTopic}\n\n${field('message').value.trim()}`,
            course: selectedTopic,
            website: 'Stock Axis Academy',
            time: new Date().toISOString(),
            ...(captchaToken ? { 'g-recaptcha-response': captchaToken } : {})
          }
        })
      });
      if (response.status === 429) throw new Error('rate-limit');
      if (response.status !== 200 || (await response.text()).trim() !== 'OK') throw new Error('delivery');
      lastSentAt = Date.now();
      emit('lead_submit_success', { topic: interest?.value || 'general', location });
      const topic = interest?.value;
      form.reset();
      if (interest) {
        interest.value = topic;
        interest.dispatchEvent(new Event('change'));
      }
      say('Thank you. Your enquiry was sent. The academy can reply using the contact details you provided.', 'success', true);
    } catch (error) {
      say(error.message === 'rate-limit'
        ? 'Too many enquiries are being sent right now. Please wait a minute and try again. Your details are still here.'
        : error.name === 'AbortError'
          ? 'We could not confirm delivery because the request timed out. Please wait before trying again to avoid sending a duplicate.'
          : 'Your enquiry could not be sent. Check your connection and try again. Your details are still here.', 'error', true);
    } finally {
      clearTimeout(timeout);
      if (config.captchaSiteKey && widgetId !== undefined) window.grecaptcha?.reset(widgetId);
      startedAt = Date.now() - 1500;
      sending = false;
      controls.forEach((input) => { input.disabled = false; });
      button.disabled = false;
      form.removeAttribute('aria-busy');
      label.textContent = 'Send Enquiry';
    }
  });
}


/* AOS is self-hosted. Visibility is enhanced only after successful setup. */
function setupScrollMotion() {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const groups = [
    '.hero-copy', '.market-figure', '.hero-bottom', '.clarity-inner',
    '.chapter', '.section-intro', '.course-row', '.course-footnote',
    '.perspective-heading', '.principles article', '.journey-steps li',
    '.logo-frame', '.about-copy', '.faq-heading', '.faq-list',
    '.contact-grid > div', '.risk-notice'
  ];
  groups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.dataset.aos = selector === '.logo-frame' ? 'zoom-in' : 'fade-up';
      element.dataset.aosDelay = String((index % 3) * 90);
    });
  });
  let initialized = false;
  let revealObserver;
  const bindRevealObserver = () => {
    const elements = [...document.querySelectorAll('[data-aos]')];
    if (!elements.length) return;
    revealObserver?.disconnect();
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('aos-animate'));
      return;
    }
    revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -14% 0px' });
    elements.forEach((element) => revealObserver.observe(element));
  };
  const initialize = () => {
    if (!window.AOS) { root.classList.remove('aos-ready'); return; }
    try {
      if (initialized) window.AOS.refreshHard();
      else {
        window.AOS.init({
          duration: reducedMotion.matches ? 420 : 850,
          once: true,
          offset: reducedMotion.matches ? 24 : 60,
          easing: 'ease-out-cubic',
          mirror: false,
          disableMutationObserver: true
        });
        initialized = true;
      }
      root.classList.add('aos-ready');
      bindRevealObserver();
    } catch { root.classList.remove('aos-ready'); }
  };
  // Initialise as soon as the page structure is ready so the first scroll
  // into a section visibly reveals its content instead of waiting for a
  // separate scroll-triggered setup pass.
  if (document.readyState === 'loading') window.addEventListener('DOMContentLoaded', initialize, { once: true });
  else requestAnimationFrame(initialize);
  reducedMotion.addEventListener('change', initialize);
  if (window.location.hash && !['#home', '#main'].includes(window.location.hash)) {
    window.addEventListener('load', initialize, { once: true });
  }
  // Keyboard focus must never land in an invisible reveal container.
  document.addEventListener('focusin', (event) => {
    let target = event.target.closest('[data-aos]');
    while (target) { target.classList.add('aos-animate'); target = target.parentElement?.closest('[data-aos]'); }
  });
}


/* One scroll controller for every same-page link, including back to top.
 * Wheel/touch scrolling stays native; deliberate input cancels a running tween.
 */
function setupPageScroll({ closeMenu }) {
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const button = document.querySelector('#scroll-top');
  const progress = document.querySelector('#scroll-progress');
  const progressLine = document.querySelector('#scroll-progress-line');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let animation = 0;
  let finishAnimation;
  let ticking = false;
  let scrollRange = 1;

  function measure() { scrollRange = Math.max(1, root.scrollHeight - window.innerHeight); }
  function updateProgress() {
    const ratio = Math.min(1, Math.max(0, window.scrollY / scrollRange));
    progress.style.strokeDashoffset = String(100 * (1 - ratio));
    progressLine.style.transform = `scaleX(${ratio})`;
    button.hidden = window.scrollY < 320 && !root.classList.contains('scrolling-to-top');
    ticking = false;
  }
  function scheduleProgress() {
    if (!ticking) { ticking = true; requestAnimationFrame(updateProgress); }
  }
  function cancel() {
    cancelAnimationFrame(animation);
    animation = 0;
    finishAnimation = undefined;
    root.classList.remove('is-scrolling', 'scrolling-to-top');
    scheduleProgress();
  }
  function navigate(target, hash) {
    cancel();
    closeMenu();
    root.classList.add('is-scrolling');
    measure();
    const start = window.scrollY;
    const top = hash === '#home' ? 0 : Math.max(0, Math.min(scrollRange,
      target.getBoundingClientRect().top + start - header.getBoundingClientRect().height - 24));
    if (top === 0 && start > 320) root.classList.add('scrolling-to-top');
    if (window.location.hash !== hash) history.pushState(null, '', hash);
    const focusTarget = () => {
      if (!target.matches('a,button,input,select,textarea,[tabindex]')) target.tabIndex = -1;
      target.focus({ preventScroll: true });
    };
    const finish = () => {
      window.scrollTo({ top, behavior: 'auto' });
      cancel();
      focusTarget();
    };
    finishAnimation = finish;
    // Skip links should move keyboard focus immediately, even in normal motion.
    if (hash === '#main' || Math.abs(top - start) < 2) { finish(); return; }
    const distance = top - start;
    const duration = reducedMotion.matches
      ? Math.min(700, Math.max(420, 360 + Math.abs(distance) * .08))
      : Math.min(1500, Math.max(850, 640 + Math.abs(distance) * .16));
    let started;
    const frame = (time) => {
      if (started === undefined) started = time;
      const elapsed = Math.min(1, (time - started) / duration);
      const eased = elapsed < .5
        ? 4 * elapsed ** 3
        : 1 - (-2 * elapsed + 2) ** 3 / 2;
      window.scrollTo({ top: start + distance * eased, behavior: 'auto' });
      if (elapsed < 1) animation = requestAnimationFrame(frame);
      else finish();
    };
    animation = requestAnimationFrame(frame);
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const hash = link.getAttribute('href');
    let id;
    try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    navigate(target, hash);
  });
  window.addEventListener('wheel', cancel, { passive: true });
  window.addEventListener('touchstart', cancel, { passive: true });
  window.addEventListener('pointerdown', () => { if (animation) cancel(); }, { passive: true });
  window.addEventListener('keydown', (event) => {
    if (!event.target.closest('input,textarea,select,[contenteditable="true"]') &&
      ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Escape'].includes(event.key)) cancel();
  });
  window.addEventListener('scroll', scheduleProgress, { passive: true });
  window.addEventListener('resize', () => { cancel(); measure(); scheduleProgress(); });
  window.addEventListener('pageshow', () => { measure(); scheduleProgress(); });
  if ('ResizeObserver' in window) new ResizeObserver(() => { measure(); scheduleProgress(); }).observe(document.body);
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) finishAnimation?.(); });
  measure();
  scheduleProgress();
}



if (typeof document !== 'undefined') {
const $ = (selector) => document.querySelector(selector);
const make = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};
const emit = (name, detail = {}) => {
  if (content.analyticsApproved) {
    // An approved analytics adapter may listen locally. No third-party request here.
    window.dispatchEvent(new CustomEvent('stockaxis:analytics', { detail: { name, ...detail } }));
  }
};

// Native navigation remains available if JavaScript is unavailable.
const menuButton = $('.menu-toggle');
const navigation = $('#primary-navigation');
const smallScreen = window.matchMedia('(max-width: 900px)');
menuButton.hidden = false;
function setMenu(open, returnFocus = false) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('.menu-label').textContent = open ? 'Close' : 'Menu';
  navigation.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', (event) => {
  if (menuButton.getAttribute('aria-expanded') !== 'true') return;
  if (event.key === 'Escape') { event.preventDefault(); setMenu(false, true); }
  if (event.key === 'Tab') {
    const focusable = [menuButton, ...navigation.querySelectorAll('a')];
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
smallScreen.addEventListener('change', () => setMenu(false));
navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link || !smallScreen.matches) return;
  setMenu(false);
});
document.addEventListener('click', (event) => {
  if (menuButton.getAttribute('aria-expanded') === 'true' && !event.target.closest('.site-header')) setMenu(false);
  const cta = event.target.closest('[data-event]');
  if (cta) emit(cta.dataset.event, { location: cta.closest('section')?.id || 'navigation' });
});
menuButton.dataset.ready = 'true';

// The review and verified catalogues are deliberately separate.
const topics = content.reviewMode ? content.draftTopics : content.courses;
const courseList = $('#course-list');
const interest = $('#course-interest');
if (!content.reviewMode) {
  document.querySelectorAll('[data-review-only]').forEach((element) => { element.hidden = true; });
  $('#course-status').textContent = topics.length ? 'Explore the confirmed programmes below.' : 'Course information will be available after academy approval.';
}
topics.forEach((course, index) => {
  const article = make('article', 'course-row');
  article.dataset.aos = 'fade-up';
  article.append(make('span', 'course-number', String(index + 1).padStart(2, '0')));
  const heading = make('div', 'course-heading');
  heading.append(make('span', 'technical-label', course.level), make('h3', '', course.title));
  const description = make('div', 'course-description');
  description.append(make('p', '', course.description));
  const subjects = make('ul', 'course-subjects');
  course.subjects.forEach((subject) => subjects.append(make('li', '', subject)));
  description.append(subjects);
  if (!content.reviewMode && course.duration && course.mode) description.append(make('p', 'content-note', `${course.duration} · ${course.mode}`));
  const link = make('a', 'course-cta', '↗');
  link.href = '#contact';
  link.setAttribute('aria-label', `Ask about ${course.title}`);
  link.addEventListener('click', () => {
    interest.value = course.id;
    updateInterest();
    emit('cta_course_click', { topic: course.id, location: 'courses' });
    emit('cta_enquiry_click', { topic: course.id, location: 'courses' });
  });
  article.append(heading, description, link);
  courseList.append(article);
  const option = make('option', '', course.title);
  option.value = course.id;
  interest.append(option);
});

const validWhatsapp = content.contactsVerified && /^\d{8,15}$/.test(content.whatsapp || '') ? content.whatsapp : null;
const validEmail = content.contactsVerified && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(content.admissionsEmail || '') ? content.admissionsEmail : null;
const channel = $('#contact-channel');
let whatsappLink, emailLink, floatingLink;
if (validWhatsapp || validEmail) {
  channel.hidden = false;
  channel.replaceChildren();
  if (validWhatsapp) {
    whatsappLink = make('a', 'button', 'Ask admissions on WhatsApp ↗');
    whatsappLink.target = '_blank';
    whatsappLink.rel = 'noopener noreferrer';
    whatsappLink.addEventListener('click', () => emit('whatsapp_click', { topic: interest.value, location: 'contact' }));
    channel.append(whatsappLink);
    floatingLink = make('a', 'button whatsapp-link', 'WhatsApp ↗');
    floatingLink.setAttribute('aria-label', 'Ask Stock Axis Academy admissions on WhatsApp (opens in a new tab)');
    floatingLink.target = '_blank';
    floatingLink.rel = 'noopener noreferrer';
    floatingLink.addEventListener('click', () => emit('whatsapp_click', { topic: interest.value, location: 'floating' }));
    document.body.append(floatingLink);
  }
  if (validEmail) {
    emailLink = make('a', 'text-link', 'Email admissions ↗');
    emailLink.addEventListener('click', () => emit('cta_enquiry_click', { topic: interest.value, location: 'email' }));
    channel.append(emailLink);
  }
}
function updateInterest() {
  const topic = topics.find((course) => course.id === interest.value);
  $('#interest-feedback').textContent = topic
    ? `Your interest: ${topic.title} Ask about the syllabus, level, format and schedule.`
    : 'Select a topic to give your admissions conversation a starting point.';
  const message = `Hello Stock Axis Academy, I would like to ask about ${topic ? topic.title : 'your courses'}. Please share the confirmed syllabus, prerequisites, format, schedule and fees.`;
  if (whatsappLink) {
    const url = `https://wa.me/${validWhatsapp}?text=${encodeURIComponent(message)}`;
    whatsappLink.href = url;
    floatingLink.href = url;
  }
  if (emailLink) emailLink.href = `mailto:${validEmail}?subject=${encodeURIComponent('Course enquiry — Stock Axis Academy')}&body=${encodeURIComponent(message)}`;
}
interest.addEventListener('change', updateInterest);
updateInterest();
setupContactForm({ config: content.enquiry, interest, emit });

function setupContactPopup() {
  const popup = $('#contact-popup');
  const popupForm = $('#popup-contact-form');
  if (!popup || !popupForm) return;
  let lastFocused;
  const close = () => {
    popup.hidden = true;
    document.body.classList.remove('popup-open');
    lastFocused?.focus();
  };
  const open = () => {
    lastFocused = document.activeElement;
    popup.hidden = false;
    document.body.classList.add('popup-open');
    popup.querySelector('input[name="name"]')?.focus();
  };
  popup.addEventListener('click', (event) => {
    if (event.target.closest('[data-popup-close]')) close();
  });
  document.addEventListener('keydown', (event) => {
    if (popup.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    if (event.key === 'Tab') {
      const focusable = [...popup.querySelectorAll('button, input, textarea, [href]')].filter((element) => !element.disabled);
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  setupContactForm({ config: content.enquiry, emit, form: popupForm, location: 'popup' });
  window.setTimeout(open, 700);
}
setupContactPopup();
if (content.mentor) {
  const mentor = $('#mentor-content');
  mentor.replaceChildren(make('h3', '', content.mentor.name), make('p', 'chapter-label', content.mentor.role), make('p', 'content-note', content.mentor.bio));
}
$('#copyright-year').textContent = new Date().getFullYear();

// Observe the reading band without synchronous geometry reads on scroll.
const sections = [...document.querySelectorAll('main section[id]')];
const links = [...navigation.querySelectorAll('a[href^="#"]')];
function setActiveChapter(active) {
  for (const link of links) {
    if (link.hash === `#${active}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) if (entry.isIntersecting) setActiveChapter(entry.target.id);
  }, { rootMargin: '-20% 0px -70% 0px' });
  sections.forEach((section) => observer.observe(section));
}

setupPageScroll({ closeMenu: () => setMenu(false) });
setupScrollMotion();
}

export { content as siteContent };
