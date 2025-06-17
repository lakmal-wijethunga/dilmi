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
    },    {
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
    },
    {
        id: 3,
        title: "Sinners",
        year: 2025,
        duration: "137 min",
        rating: 8.4,
        genres: ["Horror", "Supernatural", "Musical", "Southern Gothic"],
        director: "Ryan Coogler",
        cast: ["Michael B. Jordan", "Hailee Steinfeld", "Miles Caton", "Jack O'Connell", "Wunmi Mosaku", "Jayme Lawson", "Omar Miller", "Delroy Lindo", "Li Jun Li", "Lola Kirke"],
        synopsis: "Set in 1932 Mississippi Delta, identical twin brothers and World War I veterans return to their hometown to start a juke joint with stolen money. When their opening night summons both spirits and vampires, they must fight supernatural forces while confronting their past.",
        poster: "assets/posters/sinners.jpg",
        trailer: "HlmmJBDXaP8",
        qualities: {
            "1080p": { 
                size: "2.8 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=REPLACE_WITH_ACTUAL_SINNERS_FILE_ID&export=download"
            },
            "720p": { 
                size: "1.4 GB", 
                downloadLink: "https://drive.usercontent.google.com/download?id=REPLACE_WITH_ACTUAL_SINNERS_720P_FILE_ID&export=download"
            }
        }
    },
    {
        id: 4,
        title: "The Amateur",
        year: 2025,
        duration: "110 min",
        rating: 7.6,
        genres: ["Action", "Thriller", "Drama"],
        director: "James Hawes",
        cast: ["Rami Malek", "Rachel Brosnahan", "Caitríona Balfe", "Laurence Fishburne", "Jon Bernthal", "Michael Stuhlbarg", "Holt McCallany"],
        synopsis: "A CIA cryptographer's wife and daughter are killed in a London terrorist attack. When his agency refuses to act, he blackmails them into training him and launches his own mission for revenge against the terrorists.",
        poster: "assets/posters/the-amateur.jpg",
        trailer: "VKKTp0Ve8X4",
        qualities: {
            "1080p": { 
                size: "2.2 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=REPLACE_WITH_ACTUAL_AMATEUR_FILE_ID&export=download"
            }
        }
    },
    {
        id: 5,
        title: "Dragon",
        year: 2025,
        duration: "118 min",
        rating: 7.8,
        genres: ["Action", "Adventure", "Fantasy"],
        director: "TBD",
        cast: ["TBD"],
        synopsis: "An epic fantasy adventure following a young warrior's quest to defeat an ancient dragon that threatens to destroy the realm. Spectacular visuals and intense battle sequences bring this mythical tale to life.",
        poster: "assets/posters/dragon.jpg",
        trailer: "dQw4w9WgXcQ",
        qualities: {
            "1080p": { 
                size: "2.5 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=REPLACE_WITH_ACTUAL_DRAGON_FILE_ID&export=download"
            }
        }
    },
    {
        id: 6,
        title: "The Hunger Games: The Ballad Of Songbirds & Snakes",
        year: 2023,
        duration: "157 min",
        rating: 7.0,
        genres: ["Action", "Adventure", "Drama", "Sci-Fi"],
        director: "Francis Lawrence",
        cast: ["Tom Blyth", "Rachel Zegler", "Peter Dinklage", "Hunter Schafer", "Josh Andrés Rivera", "Jason Schwartzman", "Viola Davis"],
        synopsis: "Years before he would become the tyrannical President of Panem, 18-year-old Coriolanus Snow is the last hope for his fading lineage. With the 10th annual Hunger Games fast approaching, Snow is mentoring Lucy Gray Baird from the impoverished District 12.",
        poster: "assets/posters/hunger-games-ballad.jpg",
        trailer: "NxW_X4kzeus",
        qualities: {
            "1080p": { 
                size: "3.1 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=REPLACE_WITH_ACTUAL_HUNGER_GAMES_FILE_ID&export=download"
            }
        }
    },
    {
        id: 7,
        title: "Predator: Killer Of Killers",
        year: 2025,
        duration: "106 min",
        rating: 7.4,
        genres: ["Action", "Sci-Fi", "Thriller"],
        director: "TBD",
        cast: ["TBD"],
        synopsis: "The deadliest Predator ever encountered arrives on Earth to hunt the most dangerous prey. When elite soldiers become the hunted, survival becomes the ultimate test in this intense sci-fi thriller.",
        poster: "assets/posters/predator-killer.jpg",
        trailer: "dQw4w9WgXcQ",
        qualities: {
            "1080p": { 
                size: "2.3 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=REPLACE_WITH_ACTUAL_PREDATOR_FILE_ID&export=download"
            }
        }
    },
    {
        id: 8,
        title: "The Legend Of Ochi",
        year: 2025,
        duration: "99 min",
        rating: 7.2,
        genres: ["Adventure", "Family", "Fantasy"],
        director: "Isaiah Saxon",
        cast: ["Helena Zengel", "Finn Wolfhard", "Emily Watson", "Willem Dafoe"],
        synopsis: "In a remote northern village, a young girl forms an unlikely bond with a mysterious creature called an Ochi. Together they embark on an adventure that will change both their worlds forever.",
        poster: "assets/posters/legend-of-ochi.jpg",
        trailer: "dQw4w9WgXcQ",
        qualities: {
            "1080p": { 
                size: "2.0 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=REPLACE_WITH_ACTUAL_OCHI_FILE_ID&export=download"
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
    
    // Setup download button to scroll to quality section
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.onclick = () => {
            const qualitySection = document.querySelector('.quality-selection');
            if (qualitySection) {
                qualitySection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        };
    }
    
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
    
    // Split directors and create bubbles like cast
    const directors = movie.director.split(',').map(dir => dir.trim());
    modalDirector.innerHTML = directors.map(director => `<span class="cast-member">${director}</span>`).join('');
    
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

/*
================================================================================
INSTRUCTIONS FOR ADDING NEW MOVIES FROM GOOGLE DRIVE FOLDERS
================================================================================

Based on the Google Drive folder: https://drive.google.com/drive/folders/10D8Ie6DcdK7bf_HSWRek8ymkEYfWF2Fl

The folder contains these movies that can be added:
- Call of Duty Vanguard (2021)
- Call of Duty: Modern Warfare (2019)
- Dragon (2025) ✓ ADDED
- Final Destination Bloodlines (2025) ✓ ADDED
- Maranamass (2025)
- Officer On Duty (2025)
- Padakkalam (2025)
- Perusu (2025)
- Predator Killer Of Killers (2025) ✓ ADDED
- Retro (2025)
- Sinners (2025) ✓ ADDED
- The Amateur (2025) ✓ ADDED
- The Hunger Games: The Ballad Of Songbirds Snakes (2023) ✓ ADDED
- The Legend Of Ochi (2025) ✓ ADDED
- The Ugly Stepsister (2025)
- Thrayam (2024)
- Thudarum (2025)
- Tourist Family (2025)
- Warfare (2025) ✓ ADDED

HOW TO ADD A NEW MOVIE:

1. RESEARCH THE MOVIE:
   - Go to IMDB or TMDB to get movie details
   - Get: title, year, duration, rating, genres, director, cast, synopsis
   - Find a YouTube trailer ID (the part after "watch?v=" in YouTube URL)

2. GET GOOGLE DRIVE FILE ID:
   - Right-click the movie file in Google Drive
   - Select "Get link" and choose "Anyone with the link can view"
   - The file ID is the long string between "/d/" and "/view" in the URL
   - Example: https://drive.google.com/file/d/FILE_ID_HERE/view?usp=sharing

3. CREATE DOWNLOAD LINK:
   - Use this format: https://drive.usercontent.google.com/download?id=FILE_ID_HERE&export=download

4. ADD TO MOVIES DATABASE:
   - Copy an existing movie object in the moviesDatabase array
   - Update all the fields with the new movie's information
   - Increment the ID number
   - Add multiple quality options if available

5. ADD POSTER IMAGE:
   - Download a poster image for the movie
   - Save it in assets/posters/ folder
   - Name it using lowercase title with hyphens (e.g., "movie-title.jpg")
   - Update the poster path in the movie object

EXAMPLE OF ADDING A NEW MOVIE:

{
    id: 9, // Increment this number
    title: "Movie Title",
    year: 2025,
    duration: "120 min",
    rating: 7.5,
    genres: ["Action", "Adventure"], // Array of genres
    director: "Director Name",
    cast: ["Actor 1", "Actor 2", "Actor 3"], // Array of main cast
    synopsis: "Movie synopsis here...",
    poster: "assets/posters/movie-title.jpg",
    trailer: "YOUTUBE_VIDEO_ID", // Just the ID, not full URL
    qualities: {
        "1080p": { 
            size: "2.5 GB",
            downloadLink: "https://drive.usercontent.google.com/download?id=GOOGLE_DRIVE_FILE_ID&export=download"
        },
        "720p": { 
            size: "1.2 GB", 
            downloadLink: "https://drive.usercontent.google.com/download?id=ANOTHER_FILE_ID&export=download"
        }
    }
}

NOTES:
- Always test the download links before adding them
- Make sure poster images are optimized (not too large)
- Update genre filters in index.html if adding new genres
- Check that the trailer ID works on YouTube
- Use proper movie information from reliable sources (IMDB/TMDB)

================================================================================
*/

// Additional movies ready to be added (templates with placeholders):

const additionalMoviesToAdd = [
    {
        id: 9,
        title: "Call of Duty: Vanguard",
        year: 2021,
        duration: "120 min",
        rating: 7.0,
        genres: ["Action", "War", "Adventure"],
        director: "TBD",
        cast: ["TBD"],
        synopsis: "Based on the popular video game, Call of Duty: Vanguard follows elite soldiers fighting across multiple theaters of World War II.",
        poster: "assets/posters/cod-vanguard.jpg",
        trailer: "dQw4w9WgXcQ", // Replace with actual trailer
        qualities: {
            "1080p": { 
                size: "TBD",
                downloadLink: "https://drive.usercontent.google.com/download?id=REPLACE_WITH_ACTUAL_FILE_ID&export=download"
            }
        }
    },
    {
        id: 10,
        title: "The Ugly Stepsister",
        year: 2025,
        duration: "95 min",
        rating: 6.8,
        genres: ["Comedy", "Romance", "Drama"],
        director: "TBD",
        cast: ["TBD"],
        synopsis: "A modern twist on the classic Cinderella story, told from the perspective of one of the stepsisters.",
        poster: "assets/posters/ugly-stepsister.jpg",
        trailer: "dQw4w9WgXcQ", // Replace with actual trailer
        qualities: {
            "1080p": { 
                size: "TBD",
                downloadLink: "https://drive.usercontent.google.com/download?id=REPLACE_WITH_ACTUAL_FILE_ID&export=download"
            }
        }
    }
    // Add more movies here following the same pattern
];

/*
TO ACTIVATE ADDITIONAL MOVIES:
1. Research each movie to fill in the TBD fields
2. Get the actual Google Drive file IDs 
3. Download and add poster images
4. Move the movie objects from additionalMoviesToAdd to the main moviesDatabase array
5. Update the IDs to be sequential
*/
