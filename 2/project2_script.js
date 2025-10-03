// Computer Vision Portfolio JavaScript

// Progress bar functionality
function updateProgressBar() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    const progressBar = document.querySelector('.progress-bar');
    
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}

// Scroll reveal animations
function revealOnScroll() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
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
}

// Image lazy loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Floating action button
function createFloatingButton() {
    const floatingBtn = document.createElement('button');
    floatingBtn.className = 'floating-btn';
    floatingBtn.innerHTML = '↑';
    floatingBtn.setAttribute('aria-label', 'Back to top');
    
    floatingBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(floatingBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            floatingBtn.style.display = 'flex';
        } else {
            floatingBtn.style.display = 'none';
        }
    });
}

// Create progress bar
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);
}

// Table row highlighting
function initTableInteractions() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
        const rows = table.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            });
            
            row.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            });
        });
    });
}

// Image modal functionality
function initImageModals() {
    const images = document.querySelectorAll('.image-item img');
    
    images.forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                cursor: pointer;
            `;
            
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 8px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            `;
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            modal.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        });
    });
}

// Keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.querySelector('.image-modal');
            if (modal) {
                document.body.removeChild(modal);
            }
        }
        
        if (e.key === 'Home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        if (e.key === 'End') {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    });
}

// Performance monitoring
function initPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        });
    }
}

// Initialize all functionality
function init() {
    createProgressBar();
    createFloatingButton();
    initSmoothScrolling();
    initLazyLoading();
    initTableInteractions();
    initImageModals();
    initKeyboardNavigation();
    initPerformanceMonitoring();
    
    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        updateProgressBar();
        revealOnScroll();
    });
    
    // Initial call for elements already in view
    revealOnScroll();
    
    // Add loading animation completion
    document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('loaded');
    });
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export functions for potential external use
window.ComputerVisionPortfolio = {
    updateProgressBar,
    revealOnScroll,
    initSmoothScrolling,
    initLazyLoading,
    createFloatingButton,
    createProgressBar,
    initTableInteractions,
    initImageModals,
    initKeyboardNavigation,
    initPerformanceMonitoring,
    init
};
