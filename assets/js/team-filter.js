// Team Filter Dropdown Functionality
document.addEventListener('DOMContentLoaded', function() {
    const teamFilter = document.getElementById('team-filter');
    const teamSections = document.querySelectorAll('.team-section');

    // Function to filter team sections
    function filterTeams(selectedCategory) {
        teamSections.forEach(section => {
            const category = section.getAttribute('data-category');
            
            if (selectedCategory === 'all' || category === selectedCategory) {
                // Show section
                section.classList.remove('hidden');
                // Add smooth animation
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            } else {
                // Hide section
                section.classList.add('hidden');
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
            }
        });
    }

    // Event listener for dropdown change
    teamFilter.addEventListener('change', function() {
        const selectedValue = this.value;
        filterTeams(selectedValue);
        
        // Add visual feedback
        this.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });

    // Initialize - show all sections
    filterTeams('all');
});
