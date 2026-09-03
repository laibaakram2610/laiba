/* ==========================================================
   KINDLING COFFEE CO. — interactions & animations
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Scroll progress bar ---------- */
  const scrollBar = document.getElementById('scrollBar');
  function updateScrollProgress() {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    scrollBar.style.width = scrolled + '%';
  }

  /* ---------- Nav: scroll state + mobile toggle ---------- */
  const nav = document.getElementById('siteNav');
  const burger = document.getElementById('navBurger');

  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
    updateScrollProgress();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  burger.addEventListener('click', () => nav.classList.toggle('is-open'));
  document.getElementById('navLinks').querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('is-open'))
  );
  document.getElementById('navCta').addEventListener('click', () => {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- Custom cursor (desktop only) ---------- */
  const cursor = document.getElementById('cursorDot');
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (canHover) {
    window.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .gallery__item').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-active'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
    });
  } else {
    cursor.style.display = 'none';
  }

  /* ---------- Falling coffee beans in hero ---------- */
  const beanField = document.getElementById('beanField');
  const beanCount = window.innerWidth < 700 ? 8 : 16;
  for (let i = 0; i < beanCount; i++) {
    const b = document.createElement('span');
    b.textContent = '●';
    b.style.left = Math.random() * 100 + '%';
    b.style.fontSize = (8 + Math.random() * 10) + 'px';
    b.style.animationDuration = (9 + Math.random() * 10) + 's';
    b.style.animationDelay = (Math.random() * 10) + 's';
    b.style.opacity = 0.15 + Math.random() * 0.3;
    beanField.appendChild(b);
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealTargets = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  /* ---------- Menu tabs ---------- */
  const tabs = document.querySelectorAll('.menu__tab');
  const panels = document.querySelectorAll('.menu__panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.dataset.cat;
      tabs.forEach(t => t.classList.toggle('is-active', t === tab));
      panels.forEach(p => {
        const active = p.dataset.panel === cat;
        p.classList.toggle('is-active', active);
        if (active) { p.style.animation = 'none'; void p.offsetWidth; p.style.animation = ''; }
      });
    });
  });

  /* ---------- Gallery lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  document.querySelectorAll('.gallery__item').forEach(item => {
    item.addEventListener('click', () => {
      lightboxImg.src = item.dataset.full;
      lightboxImg.alt = item.querySelector('img').alt;
      lightbox.classList.add('is-open');
    });
  });
  const closeLightbox = () => lightbox.classList.remove('is-open');
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  /* ---------- Reviews slider ---------- */
  const track = document.getElementById('reviewsTrack');
  const slides = track.children.length;
  const dotsWrap = document.getElementById('reviewsDots');
  let current = 0;
  let autoTimer;

  for (let i = 0; i < slides; i++) {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  }
  const dots = dotsWrap.querySelectorAll('button');

  function goTo(index) {
    current = (index + slides) % slides;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
    resetAutoplay();
  }
  function resetAutoplay() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }
  resetAutoplay();

  /* swipe support */
  let touchStartX = 0;
  track.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff > 50) goTo(current - 1);
    if (diff < -50) goTo(current + 1);
  }, { passive: true });

  /* ---------- Back to top ---------- */
  document.getElementById('toTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
