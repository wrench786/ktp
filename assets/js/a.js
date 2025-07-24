// Extracted from demo-gallery-navigation.html
// Gallery data for different events
const galleryData = {
    'Art Exhibition': [
        { image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=250&h=200&fit=crop', title: 'Abstract Sunset', description: 'Oil on canvas, 2023' },
        { image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=250&h=200&fit=crop', title: 'Modern Sculpture', description: 'Bronze, 2023' },
        { image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=250&h=200&fit=crop', title: 'Urban Life', description: 'Digital photography, 2023' },
        { image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=250&h=200&fit=crop', title: 'Nature Study', description: 'Watercolor, 2023' },
        { image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=250&h=200&fit=crop', title: 'Mixed Media Art', description: 'Various materials, 2023' },
        { image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=250&h=200&fit=crop', title: 'Digital Creation', description: 'Digital art, 2023' }
    ],
    'Music Festival': [
        { image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=250&h=200&fit=crop', title: 'Main Stage', description: 'Rock performances' },
        { image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=250&h=200&fit=crop', title: 'Acoustic Corner', description: 'Intimate acoustic sets' },
        { image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=250&h=200&fit=crop', title: 'Festival Crowd', description: 'Audience enjoying music' },
        { image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=250&h=200&fit=crop', title: 'Live Performance', description: 'Local band performing' },
        { image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=250&h=200&fit=crop', title: 'DJ Performance', description: 'Electronic music set' },
        { image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=250&h=200&fit=crop', title: 'Behind the Scenes', description: 'Backstage moments' }
    ],
    'Food Fair': [
        { image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=250&h=200&fit=crop', title: 'Italian Corner', description: 'Authentic Italian cuisine' },
        { image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=250&h=200&fit=crop', title: 'Japanese Sushi', description: 'Fresh sushi and sashimi' },
        { image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=250&h=200&fit=crop', title: 'BBQ Station', description: 'Grilled specialties' },
        { image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=250&h=200&fit=crop', title: 'Sweet Treats', description: 'Various desserts' },
        { image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=250&h=200&fit=crop', title: 'Coffee & Beverages', description: 'Fresh coffee and drinks' },
        { image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=250&h=200&fit=crop', title: 'Food Trucks', description: 'Mobile food vendors' }
    ],
    'Tech Conference': [
        { image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=250&h=200&fit=crop', title: 'Keynote Speaker', description: 'Opening presentation' },
        { image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=250&h=200&fit=crop', title: 'AI Workshop', description: 'Hands-on AI session' },
        { image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=250&h=200&fit=crop', title: 'Product Demos', description: 'Latest tech demonstrations' },
        { image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=250&h=200&fit=crop', title: 'Networking Break', description: 'Connecting with peers' },
        { image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=250&h=200&fit=crop', title: 'Panel Discussion', description: 'Industry experts panel' },
        { image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=250&h=200&fit=crop', title: 'Tech Exhibition', description: 'Company booths' }
    ]
};
function showGallery(eventName) {
    document.getElementById('eventsPage').style.display = 'none';
    document.getElementById('galleryPage').style.display = 'block';
    document.getElementById('galleryTitle').textContent = eventName + ' Gallery';
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = '';
    const items = galleryData[eventName] || [];
    items.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="gallery-item-info">
                <div class="gallery-item-title">${item.title}</div>
                <div class="gallery-item-description">${item.description}</div>
            </div>
        `;
        galleryGrid.appendChild(galleryItem);
    });
}
function showEvents() {
    document.getElementById('galleryPage').style.display = 'none';
    document.getElementById('eventsPage').style.display = 'block';
}
window.addEventListener('popstate', function(event) {
    if (document.getElementById('galleryPage').style.display === 'block') {
        showEvents();
    }
}); 