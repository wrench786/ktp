function scrollToSection(sectionId) {
    document.querySelector(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Modern Slider (Improved Version)
(function() {
  const slider = document.getElementById('modernSlider');
  if (!slider) return;
  const track = slider.querySelector('.slider-track');
  const slides = Array.from(slider.querySelectorAll('.slide'));
  const dotsContainer = slider.querySelector('.slider-dots');
  let current = 0, startX = 0, currentX = 0, isDragging = false, autoSlideTimer;

  // Create dots
  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  const dots = Array.from(dotsContainer.children);

  function goToSlide(idx) {
    current = idx;
    track.style.transform = `translateX(-${current * 100}%)`;
    slides.forEach((s, i) => s.classList.toggle('active', i === current));
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    resetAutoSlide();
  }

  function nextSlide() {
    goToSlide((current + 1) % slides.length);
  }

  function prevSlide() {
    goToSlide((current - 1 + slides.length) % slides.length);
  }

  // Touch/drag support
  track.addEventListener('touchstart', e => {
    isDragging = true;
    startX = e.touches[0].clientX;
    track.style.transition = 'none';
  });
  track.addEventListener('touchmove', e => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const dx = currentX - startX;
    track.style.transform = `translateX(calc(${-current * 100}% + ${dx}px))`;
  });
  track.addEventListener('touchend', e => {
    isDragging = false;
    track.style.transition = '';
    const dx = currentX - startX;
    if (Math.abs(dx) > 50) {
      if (dx < 0 && current < slides.length - 1) nextSlide();
      else if (dx > 0 && current > 0) prevSlide();
      else goToSlide(current);
    } else {
      goToSlide(current);
    }
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
