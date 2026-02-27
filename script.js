/* ════════════════════════════════════════════
   script.js — ডাঃ সানজিদা ইসলাম চৌধুরী
   Template 2 — All Interactivity
   ════════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initBurger();
  initMobileLinks();
  initSmoothScroll();
  initActiveNav();
  initScrollHeader();
  initBackToTop();
  initFAQ();
  initCounters();
  initScrollReveal();
  initAppointmentForm();
  initContactForm();
  initRatingBars();
});

/* ─── 1. BURGER / MOBILE MENU ────────────── */
function initBurger() {
  const burger     = document.getElementById('burger');
  const mobileNav  = document.getElementById('mobileNav');
  if (!burger || !mobileNav) return;

  burger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    burger.setAttribute('aria-label', isOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন');
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    const header = document.getElementById('header');
    if (mobileNav.classList.contains('open') && header && !header.contains(e.target)) {
      mobileNav.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

function initMobileLinks() {
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      const mobileNav = document.getElementById('mobileNav');
      const burger    = document.getElementById('burger');
      if (mobileNav) mobileNav.classList.remove('open');
      if (burger) burger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ─── 2. SMOOTH SCROLL ───────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerH = document.getElementById('header')?.offsetHeight || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 6;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ─── 3. ACTIVE NAV ──────────────────────── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav__link');
  if (!sections.length || !links.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(s => io.observe(s));
}

/* ─── 4. SCROLL HEADER ───────────────────── */
function initScrollHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ─── 5. BACK TO TOP ─────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('btt');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ─── 6. FAQ ACCORDION ───────────────────── */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-q');
    const ans = item.querySelector('.faq-a');
    if (!btn || !ans) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      items.forEach(i => {
        i.classList.remove('open');
        const a = i.querySelector('.faq-a');
        if (a) a.style.maxHeight = null;
      });
      // Open clicked
      if (!isOpen) {
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });

  // Open first FAQ by default
  if (items[0]) {
    items[0].classList.add('open');
    const a = items[0].querySelector('.faq-a');
    if (a) a.style.maxHeight = a.scrollHeight + 'px';
  }
}

/* ─── 7. ANIMATED COUNTERS ───────────────── */
function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;

  const countUp = (el) => {
    const target   = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const step     = Math.max(1, Math.ceil(target / (duration / 16)));
    let current    = 0;

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString('bn-BD');
      if (current >= target) clearInterval(timer);
    }, 16);
  };

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(c => {
    c.textContent = '০';
    io.observe(c);
  });
}

/* ─── 8. SCROLL REVEAL ───────────────────── */
function initScrollReveal() {
  const selectors = [
    '.feat-item', '.astat', '.qual-card',
    '.cert-card', '.tl-card', '.srv-card',
    '.fees-table-wrap', '.fees-note-box',
    '.ch-card', '.rev-card', '.vid-card',
    '.blog-post', '.media-item', '.team-card',
    '.faq-item', '.con-card', '.about-text > p'
  ];

  const targets = document.querySelectorAll(selectors.join(', '));
  targets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = Array.from(entry.target.parentNode.children);
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${Math.min(idx * 70, 400)}ms`;
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => io.observe(el));
}

/* ─── 9. RATING BARS ANIMATION ───────────── */
function initRatingBars() {
  const fills = document.querySelectorAll('.rbar__fill');
  if (!fills.length) return;

  // Store original widths and reset
  fills.forEach(el => {
    const targetW = el.style.width;
    el.style.width = '0';
    el.dataset.target = targetW;
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        setTimeout(() => {
          fill.style.width = fill.dataset.target;
        }, 200);
        io.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  fills.forEach(el => io.observe(el));
}

/* ─── 10. APPOINTMENT FORM ───────────────── */
function initAppointmentForm() {
  const form = document.getElementById('apptForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'aName',  errId: 'aNameErr',  msg: 'নাম লিখুন।' },
      { id: 'aPhone', errId: 'aPhoneErr', msg: 'সঠিক নম্বর দিন।', pattern: /^01[3-9]\d{8}$/ },
      { id: 'aDate',  errId: 'aDateErr',  msg: 'তারিখ বেছে নিন।' },
      { id: 'aTime',  errId: 'aTimeErr',  msg: 'সময় বেছে নিন।' },
    ];

    // Clear errors
    fields.forEach(f => {
      const errEl = document.getElementById(f.errId);
      const input = document.getElementById(f.id);
      if (errEl) errEl.textContent = '';
      if (input) input.style.borderColor = '';
    });

    // Validate
    fields.forEach(f => {
      const input = document.getElementById(f.id);
      const errEl = document.getElementById(f.errId);
      if (!input || !errEl) return;
      const val = input.value.trim();
      if (!val || (f.pattern && !f.pattern.test(val))) {
        errEl.textContent = f.msg;
        input.style.borderColor = '#dc2626';
        valid = false;
      }
    });

    if (valid) {
      const ok = document.getElementById('apptOk');
      if (ok) {
        ok.style.display = 'flex';
        ok.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      form.reset();
      fields.forEach(f => {
        const input = document.getElementById(f.id);
        if (input) input.style.borderColor = '';
      });
    }
  });
}

/* ─── 11. CONTACT FORM ───────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const required = ['cName', 'cPhone', 'cMsg'];
    let valid = true;

    required.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.borderColor = '';
      if (!el.value.trim()) {
        el.style.borderColor = '#dc2626';
        valid = false;
      }
    });

    if (valid) {
      const ok = document.getElementById('contactOk');
      if (ok) {
        ok.style.display = 'flex';
        ok.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      form.reset();
      required.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.borderColor = '';
      });
    }
  });
}