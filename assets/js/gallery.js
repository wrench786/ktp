// Gallery functionality for event-gallery.html
document.addEventListener('DOMContentLoaded', function() {
  // Get event from URL
  const params = new URLSearchParams(window.location.search);
  const eventKey = params.get('event');
  
  // Get DOM elements
  const header = document.getElementById('gallery-header');
  const imagesDiv = document.getElementById('gallery-images');
  
  // Check if elements exist and galleries data is available
  if (!header || !imagesDiv) {
    console.error('Gallery elements not found');
    return;
  }
  
  if (typeof galleries === 'undefined') {
    console.error('Galleries data not loaded');
    header.innerHTML = '<h1>Gallery Error</h1><p>Gallery data could not be loaded.</p>';
    return;
  }
  
  const gallery = galleries[eventKey];
  
  if (gallery) {
    header.innerHTML = `<h1>${gallery.title}</h1><p>${gallery.description}</p>`;
    imagesDiv.innerHTML = gallery.images.map(img => `<img src="${img}" alt="">`).join('');
  } else {
    header.innerHTML = '<h1>Gallery Not Found</h1><p>The requested event gallery does not exist.</p>';
    imagesDiv.innerHTML = '';
  }
}); 