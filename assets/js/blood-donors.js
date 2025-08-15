// Blood Donors Page JavaScript

// Sample donor data - in a real application, this would come from a database
const donors = [
    {
        id: 1,
        name: "আহমেদ রহমান",
        age: 28,
        bloodGroup: "A+",
        mobile: "+8801712-123456",
        lastDonation: "2024-01-15",
        location: "Kashipur",
        available: true
    },
    {
        id: 2,
        name: "ফাতেমা বেগম",
        age: 32,
        bloodGroup: "B+",
        mobile: "+8801812-234567",
        lastDonation: "2024-02-20",
        location: "Kashipur",
        available: true
    },
    {
        id: 3,
        name: "মোহাম্মদ আলী",
        age: 25,
        bloodGroup: "O+",
        mobile: "+8801912-345678",
        lastDonation: "2024-01-30",
        location: "Kashipur",
        available: true
    },
    {
        id: 4,
        name: "সাবরিনা আক্তার",
        age: 29,
        bloodGroup: "AB+",
        mobile: "+8801612-456789",
        lastDonation: "2024-02-10",
        location: "Kashipur",
        available: true
    },
    {
        id: 5,
        name: "রফিক আহমেদ",
        age: 35,
        bloodGroup: "A-",
        mobile: "+8801512-567890",
        lastDonation: "2024-01-25",
        location: "Kashipur",
        available: true
    },
    {
        id: 6,
        name: "নাসরিন সুলতানা",
        age: 27,
        bloodGroup: "B-",
        mobile: "+8801412-678901",
        lastDonation: "2024-02-05",
        location: "Kashipur",
        available: true
    },
    {
        id: 7,
        name: "ইমরান হোসেন",
        age: 31,
        bloodGroup: "O-",
        mobile: "+8801312-789012",
        lastDonation: "2024-01-20",
        location: "Kashipur",
        available: true
    },
    {
        id: 8,
        name: "তানিয়া খান",
        age: 26,
        bloodGroup: "AB-",
        mobile: "+8801212-890123",
        lastDonation: "2024-02-15",
        location: "Kashipur",
        available: true
    },
    {
        id: 9,
        name: "শাহরিয়ার ইসলাম",
        age: 33,
        bloodGroup: "A+",
        mobile: "+8801112-901234",
        lastDonation: "2024-01-10",
        location: "Kashipur",
        available: true
    },
    {
        id: 10,
        name: "মেহরিন জাহান",
        age: 30,
        bloodGroup: "B+",
        mobile: "+8801012-012345",
        lastDonation: "2024-02-01",
        location: "Kashipur",
        available: true
    },
    {
        id: 11,
        name: "আরিফুল হক",
        age: 28,
        bloodGroup: "O+",
        mobile: "+8800912-123456",
        lastDonation: "2024-01-28",
        location: "Kashipur",
        available: true
    },
    {
        id: 12,
        name: "রেহানা পারভীন",
        age: 34,
        bloodGroup: "AB+",
        mobile: "+8800812-234567",
        lastDonation: "2024-02-12",
        location: "Kashipur",
        available: true
    }
];

// DOM elements
const donorsGrid = document.getElementById('donorsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');

// Current filter state
let currentFilter = 'all';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderDonors();
    setupEventListeners();
    updateStats();
});

// Setup event listeners
function setupEventListeners() {
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            renderDonors();
        });
    });



    // Phone link functionality
    document.addEventListener('click', function(e) {
        if (e.target.closest('.phone-link')) {
            const phoneLink = e.target.closest('.phone-link');
            const phoneNumber = phoneLink.href.replace('tel:', '');
            
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
}

// Render donors based on current filter
function renderDonors() {
    const filteredDonors = donors.filter(donor => {
        const matchesFilter = currentFilter === 'all' || donor.bloodGroup === currentFilter;
        return matchesFilter;
    });

    if (filteredDonors.length === 0) {
        donorsGrid.innerHTML = `
            <div class="no-donors" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3 style="color: #666; margin-bottom: 0.5rem;">No donors found</h3>
                <p style="color: #999;">Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }

    donorsGrid.innerHTML = filteredDonors.map(donor => createDonorCard(donor)).join('');
}

// Create donor card HTML
function createDonorCard(donor) {
    const lastDonationDate = new Date(donor.lastDonation).toLocaleDateString('bn-BD');
    
    return `
        <div class="donor-card" data-blood-group="${donor.bloodGroup}">
            <div class="donor-header">
                <h3>${donor.name} <span class="blood-group">(${donor.bloodGroup})</span></h3>
            </div>
            
            <div class="donor-details">
                <p><i class="fas fa-map-marker-alt"></i> ${donor.location}</p>
                <p><i class="fas fa-calendar"></i> Last donation: ${lastDonationDate}</p>
            </div>
            
            <div class="donor-contact">
                <div class="contact-info">
                    <a href="tel:${donor.mobile.replace(/\s/g, '')}" class="phone-link">${donor.mobile}</a>
                </div>
            </div>
        </div>
    `;
}



// Update statistics
function updateStats() {
    const totalDonors = donors.length;
    const bloodGroups = [...new Set(donors.map(d => d.bloodGroup))].length;
    
    // Update hero stats if they exist
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 3) {
        statNumbers[0].textContent = totalDonors;
        statNumbers[1].textContent = bloodGroups;
    }
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation for better UX
function showLoading() {
    donorsGrid.innerHTML = `
        <div class="loading" style="grid-column: 1 / -1;">
            <i class="fas fa-spinner"></i>
            <p>Loading donors...</p>
        </div>
    `;
}



// Add keyboard navigation for filter buttons
filterButtons.forEach((button, index) => {
    button.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
    
    // Add tabindex for keyboard navigation
    button.setAttribute('tabindex', '0');
});



// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe donor cards for animation
function observeDonorCards() {
    const donorCards = document.querySelectorAll('.donor-card');
    donorCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        observer.observe(card);
    });
}

// Call observe function after rendering
const originalRenderDonors = renderDonors;
renderDonors = function() {
    originalRenderDonors();
    setTimeout(observeDonorCards, 100);
}; 