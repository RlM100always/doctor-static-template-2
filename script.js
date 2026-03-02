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

  const modal = document.getElementById("successModal");
  const closeBtn = document.getElementById("closeModalBtn");

  // Close modal button click
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  // Close modal if click outside card
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Validation fields
    const fields = [
      { id: 'aName',  errId: 'aNameErr',  msg: 'নাম লিখুন।' },
      { id: 'aPhone', errId: 'aPhoneErr', msg: 'সঠিক মোবাইল নম্বর দিন।', pattern: /^01[3-9]\d{8}$/ },
      { id: 'aDate',  errId: 'aDateErr',  msg: 'তারিখ নির্বাচন করুন।' },
      { id: 'aTime',  errId: 'aTimeErr',  msg: 'সময় নির্বাচন করুন।' }
    ];

    // Clear previous errors
    fields.forEach(f => {
      const errEl = document.getElementById(f.errId);
      if (errEl) errEl.textContent = '';
      const input = document.getElementById(f.id);
      if (input) input.style.borderColor = '';
    });

    // Validate
    fields.forEach(f => {
      const input  = document.getElementById(f.id);
      const errEl  = document.getElementById(f.errId);
      if (!input || !errEl) return;

      const val = input.value.trim();

      if (!val) {
        errEl.textContent = f.msg;
        input.style.borderColor = '#e53e3e';
        valid = false;
        return;
      }

      if (f.pattern && !f.pattern.test(val)) {
        errEl.textContent = f.msg;
        input.style.borderColor = '#e53e3e';
        valid = false;
      }
    });

    if (!valid) return;

    // Prepare data
    const data = {
      name: document.getElementById("aName").value,
      phone: document.getElementById("aPhone").value,
      date: document.getElementById("aDate").value,
      time: document.getElementById("aTime").value,
      problem: document.getElementById("aNote").value
    };

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    fetch("https://script.google.com/macros/s/AKfycbzYJjGfQvrtR6mD86p32LovCA295ZYl0NMoeGrHEzg916vRuMaV5xzMhQ_6Oena2dyDCA/exec", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      redirect: "follow"
    })
    .then(res => res.json())
    .then(response => {
      if (response.result === "success") {
        modal.style.display = "flex";
        form.reset();
      } else {
        throw new Error(response.error);
      }
    })
    .catch(err => {
      console.error("Error sending data:", err);
      alert("ডাটা পাঠাতে সমস্যা হয়েছে। আপনার ইন্টারনেট কানেকশন চেক করুন।");
    })
    .finally(() => {
      if (submitBtn) submitBtn.disabled = false;
    });
  });
}

/* ─── 11. CONTACT FORM ───────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const modal = document.getElementById('contactSuccessModal');
  const closeBtn = document.getElementById('closeContactModal');
  if (!form) return;

  // Close modal handlers
  if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('show'));
  if (modal) modal.addEventListener('click', e => { if(e.target === modal) modal.classList.remove('show'); });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const requiredFields = ['cName', 'cPhone', 'cMsg'];
    requiredFields.forEach(id => {
      const el = document.getElementById(id);
      if (!el.value.trim()) {
        el.style.borderColor = '#dc2626';
        valid = false;
      } else {
        el.style.borderColor = '';
      }
    });

    if (!valid) return;

    // Prepare data
    const data = {
      name: document.getElementById('cName').value,
      phone: document.getElementById('cPhone').value,
      email: document.getElementById('cEmail').value,
      message: document.getElementById('cMsg').value
    };

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    // Replace with your Google Apps Script URL
    fetch("https://script.google.com/macros/s/AKfycbxwIzFWC8Asfk978mMEqNimXS6lATM5XD5oAImK_5lwiKbjBO9irHwswLezTgSPanO-/exec", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "text/plain;charset=utf-8" }
    })
    .then(res => res.json())
    .then(response => {
      if (response.result === "success") {
        modal.classList.add('show');  // ✅ Show popup
        form.reset();
      } else {
        throw new Error(response.error || 'Error sending data');
      }
    })
    .catch(err => {
      console.error(err);
      alert("ডাটা পাঠাতে সমস্যা হয়েছে। ইন্টারনেট চেক করুন।");
    })
    .finally(() => {
      if (submitBtn) submitBtn.disabled = false;
    });
  });
}







/* ══════════════════════════════════════════
   11. BLOG
══════════════════════════════════════════ */

const blogData = {
  blog1: `
    <h2>ডায়াবেটিস নিয়ন্ত্রণের কার্যকর উপায়</h2>

    <p>ডায়াবেটিস একটি ক্রনিক রোগ যা সঠিক নিয়ন্ত্রণে থাকলে স্বাস্থ্যকর জীবন যাপন সম্ভব। খাদ্যাভ্যাস, ব্যায়াম এবং মানসিক স্বাস্থ্য সব মিলিয়ে গুরুত্বপূর্ণ ভূমিকা রাখে।</p>

    <h3>খাদ্যাভ্যাস</h3>
    <p>প্রতিদিনের খাদ্য তালিকায় রাখুন:</p>
    <ul>
      <li>সবজি ও স্যালাড: ব্রোকলি, স্পিনাচ, গাজর</li>
      <li>ডাল ও লেগিউম: ছোলা, মুগ ডাল</li>
      <li>ফাইবার সমৃদ্ধ শস্য: ওটস, চিড়া</li>
      <li>চিনি ও প্রসেসড খাবার সীমিত</li>
    </ul>
    <img src="https://www.example.com/images/diabetes-food.jpg" alt="ডায়াবেটিস খাদ্য" style="width:100%; max-width:600px; margin:10px 0; border-radius:8px;">

    <h3>ব্যায়াম</h3>
    <p>সপ্তাহে কমপক্ষে ৫ দিন ৩০ মিনিট হালকা বা মাঝারি ব্যায়াম করুন। উদাহরণ:</p>
    <ul>
      <li>প্রাতঃকালে হাঁটা বা জগিং</li>
      <li>সাঁতার</li>
      <li>সাইক্লিং</li>
      <li>যোগব্যায়াম বা হালকা স্ট্রেচিং</li>
    </ul>
    <video width="100%" controls style="margin:10px 0; border-radius:8px;">
      <source src="https://www.example.com/videos/exercise-tips.mp4" type="video/mp4">
      আপনার ব্রাউজার ভিডিও ট্যাগ সাপোর্ট করে না।
    </video>

    <h3>রিয়েল লাইফ উদাহরণ</h3>
    <p>মিসেস আফরিন সকালবেলা হালকা হাঁটাহাঁটি ও দুপুরে হালকা ডায়েট মেনে চলার মাধ্যমে মাত্র তিন মাসে ইনসুলিনের ডোজ কমাতে পেরেছেন।</p>
    <p>তার অভিজ্ঞতা অনুযায়ী, প্রতিদিনের নিয়মিত ফলোআপ এবং খাদ্য-ব্যায়াম রুটিন জীবন রক্ষা ও উন্নত স্বাস্থ্য নিশ্চিত করতে সাহায্য করে।</p>

    <h3>অন্যান্য পরামর্শ</h3>
    <p>ডায়াবেটিস নিয়ন্ত্রণে রাখতে:</p>
    <ul>
      <li>ব্লাড সুগার নিয়মিত মাপুন</li>
      <li>ডাক্তারের পরামর্শ মেনে চলুন</li>
      <li>স্ট্রেস কমানোর জন্য মেডিটেশন বা হালকা হাঁটা</li>
    </ul>

    <p>আরও পড়ুন: <a href="https://www.healthline.com/nutrition/diabetes-diet" target="_blank">Healthline: Diabetes Diet Tips</a></p>
  `,
  blog2: `
    <h2>উচ্চ রক্তচাপের লক্ষণ ও করণীয়</h2>
    <p>উচ্চ রক্তচাপের প্রাথমিক লক্ষণগুলো চিনুন এবং সময়মতো চিকিৎসা নিন।</p>
    <p>জীবনধারা পরিবর্তন ও খাদ্য নিয়ন্ত্রণ অত্যন্ত গুরুত্বপূর্ণ।</p>
  `,
  blog3: `
    <h2>হার্ট অ্যাটাকের প্রাথমিক চিকিৎসা</h2>
    <p>হার্ট অ্যাটাক হলে প্রথম ১০ মিনিটে কী করবেন তা জানুন।</p>
    <p>সঠিক পদক্ষেপ নিলে জীবন বাঁচানো সম্ভব।</p>
  `
};

document.querySelectorAll('.blog-link').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();

    const id = btn.closest('.blog-post').dataset.content;
    const modal = document.getElementById('blog-modal');
    const body = document.getElementById('blog-modal-body');

    body.innerHTML = blogData[id];
    modal.style.display = 'flex';
  });
});

document.querySelector('.close-modal').addEventListener('click', () => {
  document.getElementById('blog-modal').style.display = 'none';
});

document.getElementById('blog-modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) {
    e.currentTarget.style.display = 'none';
  }
});