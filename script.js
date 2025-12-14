
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const mainContent = document.getElementById('mainContent');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const contactForm = document.getElementById('contactForm');
const currentYearSpan = document.getElementById('currentYear');
const footerYearSpan = document.getElementById('footerYear');
const clockDateEl = document.getElementById('clockDate');
const clockTimeEl = document.getElementById('clockTime');

// Initialize the application
function init() {
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    currentYearSpan.textContent = currentYear;
    footerYearSpan.textContent = currentYear;

    // Start realtime clock (visible on home section)
    startHomeClock();
    
   
    setupEventListeners();
    
    // Show home section by default
    showSection('home');
}

// Set up all event listeners
function setupEventListeners() {
    // Menu toggle for mobile
    menuToggle.addEventListener('click', toggleSidebar);
    
    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show the target section
            showSection(targetId);
            
            // Close sidebar on mobile after clicking a link
            if (window.innerWidth < 992) {
                sidebar.classList.remove('active');
            }
        });
    });
    
    // Contact form submission
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 992 && 
            !sidebar.contains(e.target) && 
            e.target !== menuToggle && 
            !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Close sidebar on mobile when resizing to desktop
        if (window.innerWidth >= 992) {
            sidebar.classList.add('active');
        }
    });
    
    // Smooth scrolling for anchor links
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

// Start realtime clock for home section
function startHomeClock() {
    if (!clockDateEl || !clockTimeEl) return;

    const updateClock = () => {
        const now = new Date();
        const dateFormatter = new Intl.DateTimeFormat('en', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const timeFormatter = new Intl.DateTimeFormat('en', {
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });

        clockDateEl.textContent = dateFormatter.format(now);
        clockTimeEl.textContent = timeFormatter.format(now);
    };

    updateClock();
    setInterval(updateClock, 1000);
}

// Toggle sidebar visibility on mobile
function toggleSidebar() {
    sidebar.classList.toggle('active');
}

// Show a specific section and hide others
function showSection(sectionId) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Scroll to the section
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Handle contact form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Reset previous error messages
    clearErrorMessages();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation flags
    let isValid = true;
    
    // Validate name
    if (name === '') {
        showError('nameError', 'Name is required');
        isValid = false;
    } else if (name.length < 2) {
        showError('nameError', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        showError('emailError', 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (message === '') {
        showError('messageError', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showError('messageError', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    // If form is valid, show success message
    if (isValid) {
        showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
        contactForm.reset();
        
        // Clear success message after 5 seconds
        setTimeout(() => {
            const formMessage = document.getElementById('formMessage');
            formMessage.style.display = 'none';
            formMessage.className = 'form-message';
        }, 5000);
    } else {
        showFormMessage('Please fix the errors above.', 'error');
    }
}

// Show error message for a specific field
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
}

// Clear all error messages
function clearErrorMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    const formMessage = document.getElementById('formMessage');
    formMessage.style.display = 'none';
    formMessage.className = 'form-message';
}

// Show form message (success or error)
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
}

// View All Projects Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const viewMoreBtn = document.querySelector('.view-more-btn');
    
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hide all sections
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => section.classList.remove('active'));
            
            // Show projects section
            const projectsSection = document.getElementById('projects');
            projectsSection.classList.add('active');
            
            // Smooth scroll to projects section
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Update active nav link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('a[href="#projects"]').classList.add('active');
            
            // Close sidebar on mobile
            const sidebar = document.getElementById('sidebar');
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    }
});

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);