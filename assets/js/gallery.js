// Extracted from event-gallery.html
// Get event from URL
const params = new URLSearchParams(window.location.search);
const eventKey = params.get('event');
const gallery = galleries[eventKey];
const header = document.getElementById('gallery-header');
const imagesDiv = document.getElementById('gallery-images');
if (gallery) {
  header.innerHTML = `<h1>${gallery.title}</h1><p>${gallery.description}</p>`;
  imagesDiv.innerHTML = gallery.images.map(img => `<img src="${img}" alt="">`).join('');
} else {
  header.innerHTML = `<h1>Gallery Not Found</h1><p>The requested event gallery does not exist.</p>`;
  imagesDiv.innerHTML = '';
} 