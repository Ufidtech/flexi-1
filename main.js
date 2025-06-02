// Debounce utility
function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Section animation on scroll using Intersection Observer
function initSectionObserver() {
  const sections = document.querySelectorAll('section, .about-us, .academic-programs, .admission, .mission-bg');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.08 }
    );
    sections.forEach(section => observer.observe(section));
  } else {
    // Fallback to scroll event with debounce
    function revealSections() {
      const trigger = window.innerHeight * 0.92;
      sections.forEach(function(sec) {
        const top = sec.getBoundingClientRect().top;
        if (top < trigger) sec.classList.add('visible');
      });
    }
    window.addEventListener('scroll', debounce(revealSections, 100));
    window.addEventListener('DOMContentLoaded', revealSections);
  }
}

// Scroll-to-top button with ARIA for accessibility
function initScrollToTop() {
  const scrollBtn = document.getElementById('scrollToTopBtn');
  if (!scrollBtn) return;
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  window.addEventListener('scroll', debounce(function() {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  }, 100));
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Lightbox functionality with Escape key support
function initLightbox() {
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  if (!lightbox || !lightboxImg || !lightboxClose) return;

  document.querySelectorAll('.academy-image').forEach(function(img) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function() {
      lightboxImg.src = this.src;
      lightboxImg.alt = this.alt;
      lightbox.classList.add('active');
      lightboxImg.focus();
    });
    img.addEventListener('error', function() {
      this.classList.add('error');
      this.src = 'fallback.jpg'; // fallback image
    });
  });

  lightboxClose.addEventListener('click', function() {
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
    }
  });
}

// FAQ toggle
function initFAQToggle() {
  document.querySelectorAll('.faq-question').forEach(function(q) {
    q.addEventListener('click', function() {
      this.parentElement.classList.toggle('open');
    });
  });
}

// Lazy loading image blur removal with error handling
function initLazyLoading() {
  document.querySelectorAll('img[loading="lazy"]').forEach(function(img) {
    img.addEventListener('load', function() {
      img.classList.add('loaded');
    });
    img.addEventListener('error', function() {
      this.classList.add('error');
      this.src = 'fallback.jpg'; // fallback image
    });
  });
}

// Initialize all features on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  initSectionObserver();
  initScrollToTop();
  initLightbox();
  initFAQToggle();
  initLazyLoading();
});
