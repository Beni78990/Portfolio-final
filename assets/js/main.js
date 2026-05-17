/* ============================================================
   PORTFOLIO BENGALY DOUMBIA — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── THEME TOGGLE ─── */
  const toggle = document.getElementById('theme-toggle');
  const icon   = document.getElementById('theme-icon');
  const saved  = localStorage.getItem('theme');

  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.body.classList.add('light');
      icon.textContent = '🌙';
    } else {
      document.body.classList.remove('light');
      icon.textContent = '☀️';
    }
  };

  applyTheme(saved || 'dark');

  toggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light');
    const theme = isLight ? 'light' : 'dark';
    icon.textContent = isLight ? '🌙' : '☀️';
    localStorage.setItem('theme', theme);
  });


  /* ─── SCROLL REVEAL ─── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(
    'section, .skill-card, .exp-card, .tl-item, .stat-card, .bts-card, .contact-card, .veille-placeholder, .stage-box'
  ).forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });


  /* ─── ACTIVE NAV LINK ─── */
  const sections = document.querySelectorAll('section[id], #home');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => navObserver.observe(s));


  /* ─── VEILLE TECHNO TABS ─── */
  const tabs   = document.querySelectorAll('.vtab');
  const panels = document.querySelectorAll('.veille-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('veille-' + target)?.classList.add('active');
    });
  });


  /* ─── SMOOTH HERO PARALLAX ─── */
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const bg = document.querySelector('.hero-bg');
    const grid = document.querySelector('.grid-lines');
    if (bg)   bg.style.transform   = `translateY(${y * 0.25}px)`;
    if (grid) grid.style.transform = `translateY(${y * 0.1}px)`;
  }, { passive: true });

});
