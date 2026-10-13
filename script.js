'use strict';
(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#main-nav');
  const closeMenu = (restoreFocus = false) => {
    navigation?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
    document.body.classList.remove('menu-open');
    if (restoreFocus) menuButton?.focus();
  };
  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
  });
  navigation?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation?.classList.contains('is-open')) closeMenu(true);
    if (event.key === 'Tab' && navigation?.classList.contains('is-open')) {
      const last = navigation.querySelector('a:last-child');
      if (event.shiftKey && document.activeElement === menuButton) {event.preventDefault();last.focus();}
      else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();menuButton.focus();}
    }
  });
  const desktop = window.matchMedia('(min-width: 901px)');
  desktop.addEventListener('change', () => { if (desktop.matches) closeMenu(); });
  document.addEventListener('click', event => {
    if (navigation?.classList.contains('is-open') && !event.target.closest('.site-header')) closeMenu();
  });

  const intro = document.querySelector('.intro');
  let introSeen = false;
  try { introSeen = sessionStorage.getItem('form3d-intro-seen') === 'yes'; } catch { /* Content never depends on storage availability. */ }
  if (intro && !introSeen && !motion.matches) {
    try { sessionStorage.setItem('form3d-intro-seen', 'yes'); } catch { /* The introduction remains optional. */ }
    intro.classList.add('is-active');
    window.setTimeout(() => intro.remove(), 1250);
  } else intro?.remove();

  if ('IntersectionObserver' in window && !motion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.08 });
    document.documentElement.classList.add('reveal-ready');
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    motion.addEventListener('change', () => {
      if (motion.matches) {document.documentElement.classList.remove('reveal-ready'); observer.disconnect();}
    });
  }

  const filters = document.querySelectorAll('[data-filter]');
  filters.forEach(button => button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filters.forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('active', active); filter.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    document.querySelectorAll('[data-category]').forEach(card => {
      card.hidden = selected !== 'all' && card.dataset.category !== selected;
      if (!card.hidden) {count++; card.classList.add('is-visible');}
    });
    document.querySelector('.portfolio-grid')?.classList.toggle('filtered', selected !== 'all');
    const status = document.querySelector('#filter-status');
    if (status) status.textContent = `Showing ${count} ${count === 1 ? 'project' : 'projects'}.`;
  }));

  const projects = [
    {id:'relief',src:'assets/product2.jpg',title:'Sculpted in detail',description:'A detailed Last Supper relief and its matching mold. Explore the fine lines, depth, and architectural detail.',alt:'White Last Supper relief above a matching mint-colored recessed mold.'},
    {id:'character',src:'assets/product1.jpg',title:'A character of its own',description:'Expressive eyes, sculpted fur, and a playful silhouette. A closer look at Form3D’s character design.',alt:'Brown gorilla character with blue eyes, sculpted fur, and an open central compartment.'},
    {id:'christmas',src:'assets/christmas.jpg',title:'The Christmas collection',description:'A gingerbread character, a little house, snowmen, a tree, and a toy train—a collection full of festive personality.',alt:'Six colorful Christmas designs arranged on wood among evergreen branches and warm lights.'}
  ];
  const lightbox = document.querySelector('.lightbox');
  let projectIndex = 0;
  let viewerTrigger = null;
  function showProject(index) {
    projectIndex = (index + projects.length) % projects.length;
    const project = projects[projectIndex];
    const img = document.querySelector('#lightbox-img');
    img.src = project.src; img.alt = project.alt;
    document.querySelector('#lightbox-title').textContent = project.title;
    document.querySelector('#lightbox-description').textContent = project.description;
    document.querySelector('#lightbox-count').textContent = `${String(projectIndex + 1).padStart(2,'0')} / 03`;
  }
  document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
    if (!lightbox) return;
    viewerTrigger = button;
    showProject(projects.findIndex(project => project.id === button.dataset.view));
    lightbox.showModal();
    document.body.classList.add('dialog-open');
    lightbox.querySelector('.lightbox-close').focus();
  }));
  lightbox?.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox?.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    viewerTrigger?.focus({preventScroll:true});
  });
  lightbox?.addEventListener('click', event => {
    if (event.target === lightbox) {
      const bounds = lightbox.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) lightbox.close();
    }
  });
  lightbox?.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') {event.preventDefault();showProject(projectIndex + 1);}
    if (event.key === 'ArrowLeft') {event.preventDefault();showProject(projectIndex - 1);}
  });
  document.querySelectorAll('[data-direction]').forEach(button => button.addEventListener('click', () => showProject(projectIndex + Number(button.dataset.direction))));

  // Light deterrents apply only to the portfolio photographs, never the whole page.
  document.querySelectorAll('.protected-media').forEach(media => {
    media.addEventListener('contextmenu', event => event.preventDefault());
    media.addEventListener('dragstart', event => event.preventDefault());
  });

  document.querySelectorAll('[data-year]').forEach(element => {element.textContent = new Date().getFullYear();});
  const instagram = window.FORM3D?.instagramUrl;
  if (instagram && /^https:\/\/(www\.)?instagram\.com\//i.test(instagram)) {
    document.querySelectorAll('[data-instagram]').forEach(element => {
      element.href = instagram;
      element.target = '_blank';
      element.rel = 'noopener noreferrer';
    });
  }

  const parallax = document.querySelector('[data-parallax]');
  let scheduled = false;
  const updateParallax = () => {
    if (!parallax || motion.matches || window.innerWidth < 901) return;
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(() => {
        parallax.style.setProperty('--parallax', `${Math.min(window.scrollY * .045, 18)}px`);
        scheduled = false;
      });
    }
  };
  if (parallax) window.addEventListener('scroll', updateParallax, {passive:true});

  document.querySelectorAll('a[href]').forEach(link => link.addEventListener('click', event => {
    const url = new URL(link.href, location.href);
    if (motion.matches || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank' || url.origin !== location.origin || url.pathname === location.pathname || !/\.html$/.test(url.pathname)) return;
    event.preventDefault();
    document.body.classList.add('is-leaving');
    window.setTimeout(() => {window.location.href = url.href;}, 170);
  }));
  window.addEventListener('pageshow', () => document.body.classList.remove('is-leaving'));

  const snowfield = document.querySelector('.snowfield');
  const snowToggle = document.querySelector('.motion-toggle');
  let snowPaused = false;
  function renderSnow() {
    if (!snowfield) return;
    snowfield.replaceChildren();
    if (snowToggle) snowToggle.hidden = motion.matches;
    if (motion.matches) return;
    const amount = window.innerWidth < 651 ? 16 : 30;
    for (let i = 0; i < amount; i++) {
      const flake = document.createElement('span'); flake.className = 'snowflake';
      flake.style.cssText = `--x:${(i * 37.1) % 100}%;--size:${2 + (i % 3)}px;--duration:${9 + i % 8}s;--delay:-${(i * 1.7) % 16}s`;
      snowfield.append(flake);
    }
  }
  snowToggle?.addEventListener('click', () => {
    snowPaused = !snowPaused;
    snowfield.classList.toggle('snow-paused', snowPaused);
    snowToggle.textContent = snowPaused ? 'Resume snowfall' : 'Pause snowfall';
    snowToggle.setAttribute('aria-pressed', String(snowPaused));
  });
  document.addEventListener('visibilitychange', () => snowfield?.classList.toggle('snow-paused', document.hidden || snowPaused));
  motion.addEventListener('change', renderSnow);
  renderSnow();
})();
