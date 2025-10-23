// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const menuLinks = document.querySelectorAll('.mobile-menu a');
    const body = document.body;

    // Toggle menu function
    function toggleMenu() {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (mobileMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }

    // Close menu function
    function closeMenu() {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.style.overflow = '';
    }

    // Toggle menu on hamburger click
    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close menu on close button click
    closeBtn.addEventListener('click', closeMenu);

    // Close menu when clicking on links
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            closeMenu();
        }
    });

    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Update active link in mobile menu based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    
    mobileLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});