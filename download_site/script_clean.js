// Movie Database - Your actual Google Drive movies
console.log('Script loading...');
console.log('Testing: Script file is being executed');

const moviesDatabase = [
    {
        id: 1,
        title: "Warfare",
        year: 2025,
        duration: "104 min",
        rating: 7.2,
        genres: ["Action", "War", "Thriller"],
        director: "Ray Mendoza, Alex Garland",
        cast: ["D'Pharaoh Woon-A-Tai", "Kit Connor", "Finn Bennett", "Taylor John Smith", "Alex Neustaedter"],
        synopsis: "A series of unfolding war stories told through the eyes of soldiers in different eras, from the American Civil War to modern combat. An intense and immersive war experience.",
        poster: "assets/posters/warfare.jpg",
        trailer: "dQw4w9WgXcQ",
        qualities: {
            "1080p": { 
                size: "2.15 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1rO1eTg63F83jOUrxBfN3DtAV5RgW-GkF&export=download"
            },
            "720p": { 
                size: "750 MB", 
                downloadLink: "https://drive.usercontent.google.com/download?id=1UYn_ijt--XsDC0NgCiaWTlB6tpvz3VHP&export=download"
            },
            "480p": { 
                size: "397 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1ebQmCRv9p2XVKKXGFYexBTRdFBzL5E_S&export=download"
            }
        }
    },
    {
        id: 2,
        title: "Final Destination: Bloodlines",
        year: 2025,
        duration: "110 min",
        rating: 7.3,
        genres: ["Horror", "Thriller", "Supernatural"],
        director: "Zach Lipovsky, Adam Stein",
        cast: ["Kaitlyn Santa Juana", "Teo Briones", "Richard Harmon", "Owen Patrick Joyner", "Anna Lore", "Brec Bassinger", "Tony Todd"],
        synopsis: "A college student inherits visions of a deadly 1968 tower collapse from her dying grandmother and discovers that Death is coming for her family. As descendants of survivors from a prevented disaster, they must find a way to break Death's design before it claims them all.",
        poster: "assets/posters/final-destination-bloodlines.jpg",
        trailer: "p8hGx8Rd8L8",
        qualities: {
            "1080p": { 
                size: "1.51 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1IJA2eeDiKv5I9dyIELvtncCsC3B6jDT5&export=download"
            }
        }
    }
];

// Test if we can access the movies database
console.log('Movies database test:', typeof moviesDatabase);
console.log('Movies database:', moviesDatabase);

// Global variables
let currentMovies = [...moviesDatabase];
let currentGenre = 'all';
let currentSort = 'title';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('====== DOM LOADED - APP STARTING ======');
    console.log('DOM loaded, initializing app...');
    console.log('Movies database:', moviesDatabase);
    console.log('Movies database length:', moviesDatabase.length);
    
    // Test basic DOM access
    console.log('Testing basic DOM access:');
    console.log('- document.body exists:', !!document.body);
    console.log('- document.getElementById function exists:', typeof document.getElementById);
    
    // DOM elements - get them after DOM is loaded
    const moviesGrid = document.getElementById('moviesGrid');
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sortSelect');
    const modal = document.getElementById('movieModal');
    let closeBtn = document.getElementById('modalCloseBtn');
    const movieCountElement = document.getElementById('movieCount');

    console.log('DOM elements found:', {
        moviesGrid: !!moviesGrid,
        moviesGridId: moviesGrid ? moviesGrid.id : 'NOT FOUND',
        searchInput: !!searchInput,
        searchInputValue: searchInput ? searchInput.value : 'not found',
        filterBtns: filterBtns.length,
        sortSelect: !!sortSelect,
        modal: !!modal,
        closeBtn: !!closeBtn,
        currentGenre: currentGenre
    });

    if (!moviesGrid) {
        console.error('Movies grid element not found!');
        return;
    }
    
    // Clear search input to make sure it's empty
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Initialize with all movies first
    console.log('About to call displayMovies...');
    displayMovies(currentMovies, moviesGrid);
    updateMovieCount(movieCountElement);
    
    // Set up event listeners after initial display
    setupEventListeners(searchInput, filterBtns, sortSelect, closeBtn, modal, moviesGrid, movieCountElement);
    console.log('App initialized successfully');
});

// Setup event listeners
function setupEventListeners(searchInput, filterBtns, sortSelect, closeBtn, modal, moviesGrid, movieCountElement) {
    // Search functionality
    if (searchInput) {
        console.log('Setting up search input listener');
        searchInput.addEventListener('input', debounce(() => handleSearch(searchInput, moviesGrid, movieCountElement), 300));
    }
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Filter button clicked:', this.dataset.genre);
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentGenre = this.dataset.genre;
            filterAndDisplayMovies(searchInput, moviesGrid, movieCountElement);
        });
    });
    
    // Sort functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            console.log('Sort changed to:', this.value);
            currentSort = this.value;
            filterAndDisplayMovies(searchInput, moviesGrid, movieCountElement);
        });
    }
    
    // Modal close functionality
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeModal();
        });
        console.log('Close button event listener attached');
    } else {
        console.error('Close button not found');
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
        if (e.target === document.getElementById('trailerModal')) {
            closeTrailerModal();
        }
    });
    
    // Trailer modal controls
    const trailerCloseBtn = document.getElementById('trailerCloseBtn');
    if (trailerCloseBtn) {
        trailerCloseBtn.addEventListener('click', closeTrailerModal);
    }
    
    // Escape key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
            closeTrailerModal();
        }
    });
    
    console.log('All event listeners set up');
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle search
function handleSearch(searchInput, moviesGrid, movieCountElement) {
    filterAndDisplayMovies(searchInput, moviesGrid, movieCountElement);
}

// Filter and display movies
function filterAndDisplayMovies(searchInput, moviesGrid, movieCountElement) {
    console.log('filterAndDisplayMovies called');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    let filteredMovies = moviesDatabase.filter(movie => {
        // Genre filter
        const genreMatch = currentGenre === 'all' || 
            movie.genres.map(g => g.toLowerCase()).includes(currentGenre);
        
        // Search filter
        const searchMatch = !searchTerm || 
            movie.title.toLowerCase().includes(searchTerm) ||
            movie.director.toLowerCase().includes(searchTerm) ||
            movie.cast.some(actor => actor.toLowerCase().includes(searchTerm)) ||
            movie.genres.some(genre => genre.toLowerCase().includes(searchTerm));
        
        return genreMatch && searchMatch;
    });
    
    // Sort movies
    filteredMovies.sort((a, b) => {
        switch(currentSort) {
            case 'year':
                return b.year - a.year;
            case 'rating':
                return b.rating - a.rating;
            case 'duration':
                return parseInt(a.duration) - parseInt(b.duration);
            case 'title':
            default:
                return a.title.localeCompare(b.title);
        }
    });
    
    currentMovies = filteredMovies;
    displayMovies(currentMovies, moviesGrid);
    updateMovieCount(movieCountElement);
}

// Display movies in grid
function displayMovies(movies, moviesGrid) {
    console.log('displayMovies called with:', movies);
    console.log('displayMovies moviesGrid:', moviesGrid);
    console.log('displayMovies movies length:', movies ? movies.length : 'movies is null/undefined');
    
    if (!moviesGrid) {
        console.error('Movies grid element not found in displayMovies!');
        return;
    }
    
    if (movies.length === 0) {
        console.log('No movies to display');
        moviesGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; color: white; padding: 2rem;">
                <i class="fas fa-film" style="font-size: 4rem; opacity: 0.3; margin-bottom: 1rem;"></i>
                <h3 style="color: white; margin-bottom: 1rem;">No movies found</h3>
                <p style="color: rgba(255,255,255,0.7);">Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }

    console.log('Rendering movies grid...');
    moviesGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
    
    const moviesHTML = movies.map(movie => `
        <div class="movie-card" onclick="openMovieModal(${movie.id})">
            <div class="movie-poster">
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy" onerror="handleImageError(this)">
                <div class="movie-overlay">
                    <div class="play-button">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span class="year">${movie.year}</span>
                    <span class="duration">${movie.duration}</span>
                    <div class="movie-rating">
                        <i class="fas fa-star"></i>
                        <span>${movie.rating}</span>
                    </div>
                </div>
                <div class="movie-genres">
                    ${movie.genres.map(genre => `<span class="genre-tag">${genre}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    moviesGrid.innerHTML = moviesHTML;
    console.log('Movies displayed successfully');
}

// Update movie count
function updateMovieCount(movieCountElement) {
    if (movieCountElement) {
        movieCountElement.textContent = currentMovies.length;
    }
}

// Open movie modal
function openMovieModal(movieId) {
    const movie = moviesDatabase.find(m => m.id === movieId);
    if (!movie) return;
    
    // Populate modal with movie data
    const modalPoster = document.getElementById('modalPoster');
    const modalTitle = document.getElementById('modalTitle');
    const modalYear = document.getElementById('modalYear');
    const modalDuration = document.getElementById('modalDuration');
    const modalRating = document.getElementById('modalRating');
    const modalGenres = document.getElementById('modalGenres');
    const modalDirector = document.getElementById('modalDirector');
    const modalCast = document.getElementById('modalCast');
    const modalSynopsis = document.getElementById('modalSynopsis');
    const qualityOptions = document.getElementById('qualityOptions');
    
    if (modalPoster) {
        modalPoster.src = movie.poster;
        modalPoster.alt = movie.title;
        modalPoster.onerror = function() { handleImageError(this); };
    }
    
    if (modalTitle) modalTitle.textContent = movie.title;
    if (modalYear) modalYear.textContent = movie.year;
    if (modalDuration) modalDuration.textContent = movie.duration;
    if (modalRating) modalRating.textContent = movie.rating;
    if (modalGenres) modalGenres.innerHTML = movie.genres.map(genre => `<span class="genre-tag">${genre}</span>`).join('');
    if (modalDirector) modalDirector.textContent = movie.director;
    if (modalCast) {
        modalCast.innerHTML = movie.cast.map(actor => `<span class="cast-member">${actor}</span>`).join('');
    }
    if (modalSynopsis) modalSynopsis.textContent = movie.synopsis;
    
    // Populate quality options
    if (qualityOptions) {
        qualityOptions.innerHTML = Object.entries(movie.qualities).map(([quality, info]) => `
            <div class="quality-option" onclick="downloadMovie('${info.downloadLink}', '${movie.title}', '${quality}')">
                <div class="quality-label">${quality}</div>
                <div class="quality-size">${info.size}</div>
                <i class="fas fa-download"></i>
            </div>
        `).join('');
    }
    
    // Setup trailer button
    const trailerBtn = document.getElementById('trailerBtn');
    if (trailerBtn && movie.trailer) {
        trailerBtn.onclick = () => openTrailerModal(movie.trailer);
        trailerBtn.style.display = 'inline-flex';
    } else if (trailerBtn) {
        trailerBtn.style.display = 'none';
    }
    
    // Show modal
    const modal = document.getElementById('movieModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Close movie modal
function closeModal() {
    const modal = document.getElementById('movieModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Download movie
function downloadMovie(downloadLink, movieTitle, quality) {
    console.log(`Downloading ${movieTitle} in ${quality}...`);
    
    // Create temporary link and trigger download
    const link = document.createElement('a');
    link.href = downloadLink;
    link.download = `${movieTitle}_${quality}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show download started message
    showNotification(`Download started: ${movieTitle} (${quality})`);
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b6b;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

// Open trailer modal
function openTrailerModal(trailerVideoId) {
    const trailerModal = document.getElementById('trailerModal');
    const trailerFrame = document.getElementById('trailerFrame');
    
    if (trailerModal && trailerFrame) {
        trailerFrame.src = `https://www.youtube.com/embed/${trailerVideoId}?autoplay=1&rel=0`;
        trailerModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Close trailer modal
function closeTrailerModal() {
    const trailerModal = document.getElementById('trailerModal');
    const trailerFrame = document.getElementById('trailerFrame');
    
    if (trailerModal) {
        trailerModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    if (trailerFrame) {
        trailerFrame.src = '';
    }
}

// Handle image loading errors
function handleImageError(img) {
    console.log('Image failed to load:', img.src);
    img.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    img.style.display = 'flex';
    img.style.alignItems = 'center';
    img.style.justifyContent = 'center';
    img.style.color = 'white';
    img.style.fontSize = '2rem';
    img.style.fontWeight = 'bold';
    img.style.textAlign = 'center';
    img.innerHTML = `
        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
    `;
    img.onerror = null; // Prevent infinite loop
}

function getPosterPath(movie) {
    // Return the poster path with fallback
    return movie.poster || `assets/posters/${movie.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`;
}
