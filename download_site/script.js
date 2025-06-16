// Note: movieData is now loaded from config.js

// DOM Elements
const modal = document.getElementById('movie-modal');
const closeModal = document.querySelector('.close-modal');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Setup event listeners
    setupEventListeners();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    // Setup header scroll effect
    setupHeaderScrollEffect();
    
    // Add loading animation
    document.body.classList.add('loaded');
}

function setupEventListeners() {
    // Modal events
    if (closeModal) {
        closeModal.addEventListener('click', closeMovieModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeMovieModal();
        }
    });
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Download button events
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('download-btn') || 
            event.target.closest('.download-btn')) {
            handleDownload(event);
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeMovieModal();
        }
    });
}

function setupSmoothScrolling() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
}

function setupHeaderScrollEffect() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(20, 20, 20, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(20, 20, 20, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const bars = hamburger.querySelectorAll('.bar');
    if (hamburger.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
}

function openMovieModal(movieId) {
    const movie = movieData[movieId];
    if (!movie) return;
    
    // Populate modal content
    document.getElementById('modal-title').textContent = movie.title;
    document.getElementById('modal-rating').textContent = movie.rating;
    document.getElementById('modal-year').textContent = movie.year;
    document.getElementById('modal-duration').textContent = movie.duration;
    document.getElementById('modal-description').textContent = movie.description;
    document.getElementById('modal-director').textContent = movie.director;
    document.getElementById('modal-cast').textContent = movie.cast;
    document.getElementById('modal-genre').textContent = movie.genre;
    document.getElementById('modal-poster').src = movie.poster;
    document.getElementById('modal-poster').alt = movie.title;
    
    // Update download links
    updateDownloadLinks(movie.downloads);
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'slideInDown 0.3s ease';
}

function closeMovieModal() {
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'slideOutUp 0.3s ease';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

function updateDownloadLinks(downloads) {
    const downloadOptions = document.querySelectorAll('.download-option');
    
    downloadOptions.forEach(option => {
        const btn = option.querySelector('.download-btn');
        const quality = btn.getAttribute('data-quality');
        
        if (downloads[quality]) {
            btn.href = downloads[quality];
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
        } else {
            btn.href = '#';
            btn.style.opacity = '0.5';
            btn.style.pointerEvents = 'none';
        }
    });
}

function handleDownload(event) {
    const btn = event.target.closest('.download-btn');
    const quality = btn.getAttribute('data-quality');
    
    // Prevent default if no valid link
    if (!btn.href || btn.href === '#' || btn.href.includes('#')) {
        event.preventDefault();
        showNotification('Download link not available', 'error');
        return;
    }
    
    // Show download started notification
    showNotification(`Starting download for ${quality} quality...`, 'success');
    
    // Add download animation
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 150);
    
    // Track download (you can integrate analytics here)
    trackDownload(quality);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function trackDownload(quality) {
    // You can integrate Google Analytics or other tracking here
    console.log(`Download tracked: ${quality} quality`);
    
    // Example: Google Analytics event tracking
    // gtag('event', 'download', {
    //     'event_category': 'Movie',
    //     'event_label': quality,
    //     'value': 1
    // });
}

// Intersection Observer for animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.movie-card, .wanted-card, .section-title').forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations after DOM load
document.addEventListener('DOMContentLoaded', setupScrollAnimations);

// Add slide out animation for modal close
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutUp {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-100px);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;
document.head.appendChild(style);

// Search functionality (for future expansion)
function initializeSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search movies...';
    searchInput.className = 'search-input';
    
    // Add search functionality here if needed
}

// Movie request functionality (for future expansion)
function initializeMovieRequests() {
    // Add movie request form functionality here
    console.log('Movie request system ready');
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeMovieRequests();
});
