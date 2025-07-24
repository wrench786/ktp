// Extracted from gallery-tree-planting.html
function goBackToEvents() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = 'events.html#upcoming-events';
    }
}
// Attach to button if not inline
const btn = document.querySelector('.btn[onclick]');
if (btn) btn.onclick = goBackToEvents; 