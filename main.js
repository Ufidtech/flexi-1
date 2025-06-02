function revealSections() {
  const sections = document.querySelectorAll('section, .about-us, .academic-programs, .admission, .mission-bg');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  sections.forEach(sec => observer.observe(sec));
}
window.addEventListener('DOMContentLoaded', revealSections);

const scrollBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});
if (scrollBtn) {
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const lightbox = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
document.querySelectorAll('.academy-image').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', function () {
    if (lightbox && lightboxImg) {
      lightboxImg.src = this.src;
      lightboxImg.alt = this.alt;
      lightbox.classList.add('active');
    }
  });
});
if (lightboxClose) {
  lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
}
if (lightbox) {
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });
}

document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', function () {
    document.querySelectorAll('.faq.open').forEach(openFaq => {
      if (openFaq !== q.parentElement) openFaq.classList.remove('open');
    });
    this.parentElement.classList.toggle('open');
  });
});

document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  img.addEventListener('load', function () {
    img.classList.add('loaded');
  });
});

const navToggle = document.getElementById('navToggle');
const navBar = document.getElementById('navBar');

if (navToggle && navBar) {
  navToggle.addEventListener('click', function () {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    navBar.classList.toggle('nav-open');
    navToggle.classList.toggle('open');
  });
  navBar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navBar.classList.remove('nav-open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('click', (e) => {
    if (
      navBar.classList.contains('nav-open') &&
      !navBar.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navBar.classList.remove('nav-open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const navLinks = document.querySelectorAll('.nav-bar a');
const sectionIds = Array.from(navLinks).map(link => link.getAttribute('href')).filter(href => href && href.startsWith('#'));
const sections = sectionIds.map(id => document.querySelector(id));

function highlightNav() {
  let scrollPos = window.scrollY || window.pageYOffset;
  let offset = 120;
  let found = false;
  for (let i = sections.length - 1; i >= 0; i--) {
    const sec = sections[i];
    if (sec && sec.offsetTop - offset <= scrollPos) {
      navLinks.forEach(link => link.classList.remove('active'));
      navLinks[i].classList.add('active');
      found = true;
      break;
    }
  }
  if (!found) {
    navLinks.forEach(link => link.classList.remove('active'));
  }
}
window.addEventListener('scroll', highlightNav);
window.addEventListener('DOMContentLoaded', highlightNav);
