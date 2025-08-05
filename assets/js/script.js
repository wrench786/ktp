function scrollToSection(sectionId) {
    document.querySelector(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Simple Image Slider
(function() {
  const slider = document.getElementById('simpleSlider');
  if (!slider) return;
  const slides = Array.from(slider.querySelectorAll('.simple-slides img'));
  const dotsContainer = slider.querySelector('.simple-dots');
  let current = 0, autoSlideTimer;

  // Create dots
  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'simple-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  const dots = Array.from(dotsContainer.children);

  function goToSlide(idx) {
    slides.forEach((img, i) => img.classList.toggle('active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    current = idx;
    resetAutoSlide();
  }

  function nextSlide() {
    goToSlide((current + 1) % slides.length);
  }

  // Touch support
  let startX = 0, currentX = 0, isDragging = false;
  slider.addEventListener('touchstart', e => {
    isDragging = true;
    startX = e.touches[0].clientX;
  });
  slider.addEventListener('touchmove', e => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
  });
  slider.addEventListener('touchend', e => {
    if (!isDragging) return;
    const dx = currentX - startX;
    if (Math.abs(dx) > 40) {
      if (dx < 0) nextSlide();
      else goToSlide((current - 1 + slides.length) % slides.length);
    }
    isDragging = false;
    startX = currentX = 0;
  });

  // Auto-slide
  function resetAutoSlide() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(nextSlide, 5000);
  }
  resetAutoSlide();

  // Init
  goToSlide(0);
})();

// Mobile Menu Toggle (used in multiple pages)
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('nav')) {
        navMenu.classList.remove('active');
      }
    });
  }
});
