// Main JavaScript for City Care Hospital Website

// DOM Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize Bootstrap popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    
    // Add active class to current page in navbar
    highlightCurrentPage();
    
    // Add smooth scrolling for anchor links
    addSmoothScrolling();
    
    // Initialize any other page-specific functionality
    initPageSpecificFunctions();
});

// Function to highlight current page in navbar
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        // Remove active class from all links
        link.classList.remove('active');
        
        // Add active class to current page link
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === undefined && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Function to add smooth scrolling
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Function to initialize page-specific functionality
function initPageSpecificFunctions() {
    // Check if we're on the doctors page
    if (document.querySelector('#doctorsContainer')) {
        // Doctors page functionality is already in the HTML
        console.log('Doctors page initialized');
    }
    
    // Check if we're on the appointment page
    if (document.querySelector('#appointmentForm')) {
        // Appointment page functionality is already in the HTML
        console.log('Appointment page initialized');
    }
    
    // Add animation to elements when they come into view
    addScrollAnimations();
}

// Function to add scroll animations
function addScrollAnimations() {
    const animatedElements = document.querySelectorAll('.card, .section-title, .hero-img');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Utility function for formatting phone numbers
function formatPhoneNumber(phoneNumberString) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
}

// Function to toggle mobile menu (if needed)
function toggleMobileMenu() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
    } else {
        navbarCollapse.classList.add('show');
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate__animated {
        animation-duration: 1s;
        animation-fill-mode: both;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translate3d(0, 30px, 0);
        }
        to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }
    }
    
    .animate__fadeInUp {
        animation-name: fadeInUp;
    }
`;
document.head.appendChild(style);