// ─── NAV SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── MOBILE MENU ───
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ─── PARALLAX HERO ───
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (heroBg && y < window.innerHeight) {
    heroBg.style.transform = `scale(1.05) translateY(${y * 0.3}px)`;
  }
});

// ─── SCROLL REVEAL ───
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

// ─── WHATSAPP BOOKING ───
function bookOnWhatsApp() {
  const name     = document.getElementById('clientName').value.trim();
  const phone    = document.getElementById('clientPhone').value.trim();
  const service  = document.getElementById('serviceSelect').value;
  const date     = document.getElementById('clientDate').value.trim();
  const location = document.getElementById('clientLocation').value.trim();

  if (!name || !service) {
    alert('Please enter your name and select a service.');
    return;
  }

  const msg = `Hello Quixline! 👋\n\n`
    + `*New Booking Request*\n`
    + `━━━━━━━━━━━━━━━━━━\n`
    + `👤 *Name:* ${name}\n`
    + (phone    ? `📞 *Phone:* ${phone}\n`            : '')
    + `✂️ *Service:* ${service}\n`
    + (date     ? `📅 *Preferred Time:* ${date}\n`    : '')
    + (location ? `📍 *Location:* ${location}\n`      : '')
    + `━━━━━━━━━━━━━━━━━━\n`
    + `Please confirm my appointment. Thank you! 🙏`;

  window.open('https://wa.me/237671319479?text=' + encodeURIComponent(msg), '_blank');
}

// ─── PRICING TABS ───
function switchTab(gender, btn) {
  document.querySelectorAll('.pricing-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.pricing-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('panel-' + gender).classList.add('active');
}

// ─── GALLERY LIGHTBOX ───
function openLightbox(src, caption) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lbImg').src = src;
  document.getElementById('lbCaption').textContent = caption || '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// ─── GOLD CURSOR TRAIL ───
document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.85) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position:fixed;left:${e.clientX}px;top:${e.clientY}px;
      width:4px;height:4px;border-radius:50%;
      background:rgba(201,168,76,0.5);
      pointer-events:none;z-index:9999;
      transform:translate(-50%,-50%);
      animation:dotFade 0.8s forwards;
    `;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 800);
  }
});

// ─── NUMBER COUNTER ───
function animateCount(el, target, suffix) {
  let start = 0;
  const duration = 2000;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + (suffix || '');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const nums = e.target.querySelectorAll('.stat-number');
      if (nums[0]) animateCount(nums[0], 500, '+');
      if (nums[1]) animateCount(nums[1], 5, '+');
      statsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
const statsEl = document.querySelector('.about-stats');
if (statsEl) statsObserver.observe(statsEl);
