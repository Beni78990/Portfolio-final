/* ============================================================
   PORTFOLIO BENGALY DOUMBIA — main.js (Redesign 2026)
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
    icon.textContent = isLight ? '🌙' : '☀️';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });


  /* ─── HAMBURGER MENU ─── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });


  /* ─── SCROLL REVEAL ─── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // Stagger children if they have reveal class
        const children = e.target.querySelectorAll('.reveal-child');
        children.forEach((child, i) => {
          setTimeout(() => child.classList.add('visible'), i * 100);
        });
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(
    'section, .skill-card, .tl-item, .stat-block, .bts-option, .bts-domain, .article-card, .projet-card, .cert-card, .tendance, .ccl-pt, .stage-banner, .veille-obj'
  ).forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });


  /* ─── ACTIVE NAV LINK ─── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => navObserver.observe(s));


  /* ─── PROJET ACCORDION ─── */
  document.querySelectorAll('.projet-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.dataset.target;
      const body = document.getElementById(targetId);
      const icon = btn.querySelector('.toggle-icon');
      const isOpen = body.classList.contains('open');

      // Close all
      document.querySelectorAll('.projet-body').forEach(b => b.classList.remove('open'));
      document.querySelectorAll('.projet-toggle').forEach(t => {
        t.classList.remove('open');
        t.querySelector('.toggle-icon').textContent = '+';
        t.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        body.classList.add('open');
        btn.classList.add('open');
        icon.textContent = '−';
        btn.setAttribute('aria-expanded', 'true');
        // Smooth scroll to project
        setTimeout(() => {
          body.closest('.projet-card').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    });

    // Allow clicking the header too
    const header = btn.closest('.projet-header');
    if (header) {
      header.addEventListener('click', (e) => {
        if (!e.target.closest('.projet-toggle')) btn.click();
      });
      header.style.cursor = 'pointer';
    }
  });


  /* ─── VEILLE TABS ─── */
  document.querySelectorAll('.vtab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      document.querySelectorAll('.vtab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.veille-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('veille-' + target);
      if (panel) panel.classList.add('active');
    });
  });


  /* ─── NAVBAR SCROLL EFFECT ─── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.style.borderBottomColor = 'rgba(249,115,22,0.15)';
    } else {
      navbar.style.borderBottomColor = '';
    }
  }, { passive: true });

});
