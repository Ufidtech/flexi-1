// Section animation on scroll
function revealSections() {
  const sections = document.querySelectorAll('section, .about-us, .academic-programs, .admission, .mission-bg');
  const trigger = window.innerHeight * 0.92;
  sections.forEach(function(sec) {
    const top = sec.getBoundingClientRect().top;
    if (top < trigger) sec.classList.add('visible');
  });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('DOMContentLoaded', revealSections);

// Scroll-to-top button
const scrollBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', function() {
  if (window.scrollY > 300) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});
scrollBtn.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Lightbox functionality
const lightbox = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
document.querySelectorAll('.academy-image').forEach(function(img) {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', function() {
    lightboxImg.src = this.src;
    lightboxImg.alt = this.alt;
    lightbox.classList.add('active');
  });
});
lightboxClose.addEventListener('click', function() { lightbox.classList.remove('active'); });
lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox) lightbox.classList.remove('active');
});

// FAQ toggle
 document.querySelectorAll('.faq-question').forEach(function(q) {
  q.addEventListener('click', function() {
    this.parentElement.classList.toggle('open');
  });
});

// Lazy loading image blur removal
document.querySelectorAll('img[loading="lazy"]').forEach(function(img) {
  img.addEventListener('load', function() {
    img.classList.add('loaded');
  });
});
