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

  // Phone link functionality for all pages
  document.addEventListener('click', function(e) {
    if (e.target.closest('.phone-link')) {
      const phoneLink = e.target.closest('.phone-link');
      
      // Add visual feedback for phone link clicks
      phoneLink.style.transform = 'scale(0.95)';
      phoneLink.style.backgroundColor = 'rgba(26, 95, 122, 0.2)';
      
      setTimeout(() => {
        phoneLink.style.transform = '';
        phoneLink.style.backgroundColor = '';
      }, 200);
      
      // Show notification for mobile users
      if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        showNotification('Opening phone dialer...', 'info');
      }
    }
  });
});

// Notification function for phone links
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#27ae60' : '#3498db'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}
