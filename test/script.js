const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let autoSlideInterval;

// Function to go to a specific slide
function goToSlide(index) {
  // Update active slide and dot
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    dots[i].classList.remove('active');
  });

  // Show the selected slide
  slides[index].classList.add('active');
  dots[index].classList.add('active');

  // Move the slider
  slider.style.transform = `translateX(-${index * 100}%)`;

  // Update the currentIndex
  currentIndex = index;
}

// Auto-slide functionality
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
  }, 3000); // Change slide every 3 seconds
}

// Event listeners for manual controls
next.addEventListener('click', () => {
  clearInterval(autoSlideInterval);
  currentIndex = (currentIndex + 1) % slides.length;
  goToSlide(currentIndex);
  startAutoSlide();
});

prev.addEventListener('click', () => {
  clearInterval(autoSlideInterval);
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  goToSlide(currentIndex);
  startAutoSlide();
});

// Event listeners for dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    goToSlide(index);
    startAutoSlide();
  });
});

// Initialize slider
goToSlide(0);
startAutoSlide();
