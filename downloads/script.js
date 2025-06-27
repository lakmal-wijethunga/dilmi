// Movie Database - Your actual Google Drive movies
console.log('Script loading...');
console.log('Testing: Script file is being executed');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzB8U5qFBcB8yHn7NoEhmjvyMWn3HM8vk",
  authDomain: "movie-download-counter.firebaseapp.com",
  projectId: "movie-download-counter",
  storageBucket: "movie-download-counter.firebasestorage.app",
  messagingSenderId: "542837864447",
  appId: "1:542837864447:web:a643a8ab3d8d2ae7d359ca"
};

// Initialize Firebase (add this script tag to your HTML: https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js)
// import { initializeApp } from 'firebase/app';
// import { getFirestore, doc, updateDoc, increment, getDoc, setDoc } from 'firebase/firestore';

let db;
let downloadCounts = {};

// Initialize Firebase
function initializeFirebase() {
    try {
        // For web version using CDN
        if (typeof firebase !== 'undefined') {
            firebase.initializeApp(firebaseConfig);
            db = firebase.firestore();
            console.log('Firebase initialized successfully');
            loadDownloadCounts();
        } else {
            console.warn('Firebase not loaded. Download counter will work locally only.');
            // Fallback to localStorage
            downloadCounts = JSON.parse(localStorage.getItem('movieDownloadCounts')) || {};
        }
    } catch (error) {
        console.error('Firebase initialization failed:', error);
        // Fallback to localStorage
        downloadCounts = JSON.parse(localStorage.getItem('movieDownloadCounts')) || {};
    }
}

// Load download counts from Firebase
async function loadDownloadCounts() {
    if (!db) {
        console.log('Firebase not available, using localStorage');
        downloadCounts = JSON.parse(localStorage.getItem('movieDownloadCounts')) || {};
        updateMovieDownloadCounts();
        return;
    }

    try {
        const docRef = db.collection('downloadCounts').doc('movies');
        const doc = await docRef.get();
        
        if (doc.exists) {
            downloadCounts = doc.data();
            console.log('Download counts loaded from Firebase:', downloadCounts);
        } else {
            console.log('No download counts found, creating new document');
            downloadCounts = {};
            // Create initial document
            await docRef.set({});
        }
        updateMovieDownloadCounts();
    } catch (error) {
        console.error('Error loading download counts:', error);
        // Fallback to localStorage
        downloadCounts = JSON.parse(localStorage.getItem('movieDownloadCounts')) || {};
        updateMovieDownloadCounts();
    }
}

// Update movie objects with download counts
function updateMovieDownloadCounts() {
    moviesDatabase.forEach(movie => {
        movie.downloadCount = downloadCounts[`movie_${movie.id}`] || 0;
    });
}

// Increment download count in Firebase
async function incrementDownloadCount(movieId) {
    const countKey = `movie_${movieId}`;
    
    if (db) {
        try {
            const docRef = db.collection('downloadCounts').doc('movies');
            await docRef.update({
                [countKey]: firebase.firestore.FieldValue.increment(1)
            });
            
            // Update local count
            downloadCounts[countKey] = (downloadCounts[countKey] || 0) + 1;
            
            console.log(`Download count incremented for movie ${movieId}`);
            return downloadCounts[countKey];
        } catch (error) {
            console.error('Error incrementing download count:', error);
            // Fallback to localStorage
            downloadCounts[countKey] = (downloadCounts[countKey] || 0) + 1;
            localStorage.setItem('movieDownloadCounts', JSON.stringify(downloadCounts));
            return downloadCounts[countKey];
        }
    } else {
        // Fallback to localStorage
        downloadCounts[countKey] = (downloadCounts[countKey] || 0) + 1;
        localStorage.setItem('movieDownloadCounts', JSON.stringify(downloadCounts));
        return downloadCounts[countKey];
    }
}

// Get download count for a movie
function getDownloadCount(movieId) {
    return downloadCounts[`movie_${movieId}`] || 0;
}

const moviesDatabase = [
    {
        id: 1,
        title: "Warfare",
        year: 2025,
        duration: "104 min",
        rating: 6.1,
        genres: ["Action", "War", "Thriller"],
        director: "Ray Mendoza, Alex Garland",
        cast: ["D'Pharaoh Woon-A-Tai", "Kit Connor", "Finn Bennett", "Taylor John Smith", "Alex Neustaedter"],
        synopsis: "A series of unfolding war stories told through the eyes of soldiers in different eras, from the American Civil War to modern combat. An intense and immersive war experience.",        poster: "assets/posters/warfare.jpg",
        trailer: "JER0Fkyy3tw",
        downloadCount: 0, // Will be updated from Firebase
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
        rating: 5.8,
        genres: ["Horror", "Thriller", "Supernatural"],
        director: "Zach Lipovsky, Adam Stein",
        cast: ["Kaitlyn Santa Juana", "Teo Briones", "Richard Harmon", "Owen Patrick Joyner", "Anna Lore", "Brec Bassinger", "Tony Todd"],        
        synopsis: "A college student inherits visions of a deadly 1968 tower collapse from her dying grandmother and discovers that Death is coming for her family. As descendants of survivors from a prevented disaster, they must find a way to break Death's design before it claims them all.",        poster: "assets/posters/final-destination-bloodlines.jpg",
        trailer: "UWMzKXsY9A4",
        downloadCount: 0, // Will be updated from Firebase
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
        rating: 7.1,
        genres: ["Horror", "Supernatural", "Musical", "Southern Gothic"],
        director: "Ryan Coogler",
        cast: ["Michael B. Jordan", "Hailee Steinfeld", "Miles Caton", "Jack O'Connell", "Wunmi Mosaku", "Jayme Lawson", "Omar Miller", "Delroy Lindo", "Li Jun Li", "Lola Kirke"],        synopsis: "Set in 1932 Mississippi Delta, identical twin brothers and World War I veterans return to their hometown to start a juke joint with stolen money. When their opening night summons both spirits and vampires, they must fight supernatural forces while confronting their past.",        poster: "assets/posters/sinners.jpg",
        trailer: "bKGxHflevuk",
        downloadCount: 0, // Will be updated from Firebase
        qualities: {
            "1080p": { 
                size: "2.8 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1LlijUDVizOp-z-_iz8-mpA4dJ_jkvTbj&export=download"
            },
            "720p": { 
                size: "1.2 GB", 
                downloadLink: "https://drive.usercontent.google.com/download?id=1x-QY03qWklel-O5ULsXNyfLASOwNNC3-&export=download"
            }
        }
    },
    {
        id: 4,
        title: "The Amateur",
        year: 2025,
        duration: "110 min",
        rating: 6.4,
        genres: ["Action", "Thriller", "Drama"],
        director: "James Hawes",
        cast: ["Rami Malek", "Rachel Brosnahan", "Caitríona Balfe", "Laurence Fishburne", "Jon Bernthal", "Michael Stuhlbarg", "Holt McCallany"],        synopsis: "A CIA cryptographer's wife and daughter are killed in a London terrorist attack. When his agency refuses to act, he blackmails them into training him and launches his own mission for revenge against the terrorists.",        poster: "assets/posters/the-amateur.jpg",
        trailer: "DCWcK4c-F8Q",
        downloadCount: 0, // Will be updated from Firebase
        qualities: {
            "4K": { 
                size: "5.5 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1yp1smDTTZUJVTMVn8Rl893q0mmq_OqGp&export=download"
            }
        }
    },
    
    {
        id: 6,
        title: "The Hunger Games: The Ballad Of Songbirds & Snakes",
        year: 2023,
        duration: "157 min",
        rating: 6.7,
        genres: ["Action", "Adventure", "Drama", "Sci-Fi"],
        director: "Francis Lawrence",
        cast: ["Tom Blyth", "Rachel Zegler", "Peter Dinklage", "Hunter Schafer", "Josh Andrés Rivera", "Jason Schwartzman", "Viola Davis"],        synopsis: "Years before he would become the tyrannical President of Panem, 18-year-old Coriolanus Snow is the last hope for his fading lineage. With the 10th annual Hunger Games fast approaching, Snow is mentoring Lucy Gray Baird from the impoverished District 12.",        poster: "assets/posters/hunger-games-ballad.jpg",
        trailer: "RDE6Uz73A7g",
        downloadCount: 0, // Will be updated from Firebase
        qualities: {
            "4K": { 
                size: "7.0 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1fNbnPdK3dgwbLQcDzCVjI5dCBO_HCQq1&export=download"
            }
        }
    },
    {
        id: 7,
        title: "Predator: Killer Of Killers",
        year: 2025,
        duration: "106 min",
        rating: 6.8,
        genres: ["Action", "Sci-Fi", "Thriller"],
        director: "Dan Trachtenberg",
        cast: [
            "Amber Midthunder",
            "Dane DiLiegro",
            "Dakota Beavers",
            "Stormee Kipp",
            "Michelle Thrush"
        ],
        synopsis: "A new breed of Predator arrives on Earth, hunting the most dangerous prey. Elite soldiers must fight for survival in this intense sci-fi thriller set in the Predator universe.",
        poster: "assets/posters/predator-killer.jpg",
        trailer: "fbddYji1F8s", // Official trailer (20th Century Studios)
        qualities: {
            "4K": { 
                size: "3.8 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1mVJ32JCbuImb24c8uel3zhC3su9XQpWC&export=download"
            }
        }
    },
    {
        id: 8,
        title: "The Legend Of Ochi",
        year: 2025,
        duration: "99 min",
        rating: 6.5,
        genres: ["Adventure", "Family", "Fantasy"],
        director: "Isaiah Saxon",
        cast: ["Helena Zengel", "Finn Wolfhard", "Emily Watson", "Willem Dafoe"],
        synopsis: "In a remote northern village, a young girl forms an unlikely bond with a mysterious creature called an Ochi. Together they embark on an adventure that will change both their worlds forever.",        poster: "assets/posters/legend-of-ochi.jpg",
        trailer: "_jTFLg3arYU",
        qualities: {
            "1080p": { 
                size: "1.6 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1Ws0_s42ze6tRD6YiqfnZ_UzEMGvJFfbd&export=download"
            }
        }
    },
    {
        id: 9,
        title: "Final Destination",
        year: 2000,
        duration: "98 min",
        rating: 6.7,
        genres: ["Horror", "Thriller"],
        director: "James Wong",
        cast: ["Devon Sawa", "Ali Larter", "Kerr Smith", "Tony Todd"],        synopsis: "After a teenager has a terrifying vision of him and his friends dying in a plane crash, he prevents the accident only to have Death hunt them, one by one.",        poster: "assets/posters/final-destination-1.jpg",
        trailer: "bIf5pgKcu9s",
        qualities: {
            "1080p": {
                size: "1.8 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=18yoFv64S6WmP-e14EMpO6j3yZr76sBKw&export=download"
            }
        }
    },
    {
        id: 10,
        title: "Final Destination 2",
        year: 2003,
        duration: "90 min",
        rating: 6.2,
        genres: ["Horror", "Thriller"],
        director: "David R. Ellis",
        cast: ["A.J. Cook", "Ali Larter", "Michael Landes", "Tony Todd"],        synopsis: "Kimberly has a premonition of a horrible highway accident, blocking the freeway and saving a group of people from death. But Death is not to be cheated.",        poster: "assets/posters/final-destination-2.jpg",
        trailer: "QzU9OrZl2iA", // Official trailer (Warner Bros. Pictures)
        qualities: {
            "720p": {
                size: "601 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1Y2cxV4X8J3tLw04Ae8DJEqha-1SIcQKC&export=download"
            }
        }
    },
    {
        id: 11,
        title: "Final Destination 3",
        year: 2006,
        duration: "93 min",
        rating: 5.8,
        genres: ["Horror", "Thriller"],
        director: "James Wong",
        cast: ["Mary Elizabeth Winstead", "Ryan Merriman", "Kris Lemche"],        synopsis: "A student's premonition of a deadly rollercoaster ride saves her life and a lucky few, but not from death itself.",        poster: "assets/posters/final-destination-3.jpg",
        trailer: "_9lR4lQeP7w", // Official trailer (New Line Cinema)
        qualities: {
            "720p": {
                size: "602 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1bmgouIdXPntp3ERzivF4K_x8rYEkJt5r&export=download"
            }
        }
    },
    {
        id: 12,
        title: "The Final Destination 4",
        year: 2009,
        duration: "82 min",
        rating: 5.2,
        genres: ["Horror", "Thriller"],
        director: "David R. Ellis",
        cast: ["Shantel VanSanten", "Bobby Campo", "Mykelti Williamson"],        synopsis: "A premonition helps a young man save a group of people from death when a disaster strikes, but Death soon returns to claim the lives of those who were meant to die.",        poster: "assets/posters/final-destination-4.jpg",
        trailer: "8gcQCUfDzjc",
        qualities: {
            "1080p": {
                size: "1.5 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=10GziM5tXvpijYs137p6MNLwr2RnWdB2R&export=download"
            }
        }
    },
    {
        id: 13,
        title: "Final Destination 5",
        year: 2011,
        duration: "92 min",
        rating: 5.8,
        genres: ["Horror", "Thriller"],
        director: "Steven Quale",
        cast: ["Nicholas D'Agosto", "Emma Bell", "Arlen Escarpeta", "Tony Todd"],        synopsis: "Survivors of a suspension-bridge collapse learn there's no way you can cheat Death.",        poster: "assets/posters/final-destination-5.jpg",
        trailer: "PI87-0g_SI8",
        qualities: {
            "1080p": {
                size: "1.7 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1TyJRZ4wG5L_VEyqKVfcUpsX4TdU1onGV&export=download"
            }
        }
    },
    {
        id: 14,
        title: "KPop Demon Hunters",
        year: 2025,
        duration: "118 min", // Update as needed
        rating: 5.9, // Update as needed
        genres: ["Action", "Horror", "Comedy"],
        director: "Park Jin-woo", // Update as needed
        cast: ["Kim Min-jun", "Lee So-young", "Park Hae-jin", "Choi Jung-woo"], // Update as needed
        synopsis: "A group of K-pop idols discover they have supernatural abilities and must hunt demons that threaten the entertainment industry while maintaining their pop star careers.",
        poster: "assets/posters/kpop-demon-hunters.jpg",
        trailer: "AzCAwdp1uIQ", // No official trailer as of June 2025
        qualities: {
    
            "1080p": {
                size: "1.7 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1ULCHOtQu18F0-GbH5R6eowvc8ixBO8Fm&export=download"
            },
            
        }
    },
    {
        id: 15,
        title: "Sitaare Zameen Par (HDCAM)",
        year: 2025,
        duration: "142 min",
        rating: 7.8,
        genres: ["Drama", "Family", "Adventure"],
        director: "Aamir Khan",
        cast: ["Aamir Khan", "Genelia D'Souza", "Darsheel Safary", "Tisca Chopra"],
        synopsis: "A sequel to the beloved Taare Zameen Par, following a new generation of children with learning differences as they discover their unique talents and overcome challenges.",        poster: "assets/posters/sitaare-zameen-par.jpg",
        trailer: "YH6k5weqwy8", // No official trailer as of June 2025
        qualities: {
            "1080p": {
                size: "2.8 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1wGd0aBWqfqeMlheai0Rq8aaaAxtIYxTs&export=download"
            },
            "720p": {
                size: "1.2 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1IkfHW8LzDZCbqMktkIzJfE7MKDVYCd8c&export=download"
            },
            "480p": {
                size: "599 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1YcKMIjWBjeFZnSZgk9_ACK6UB7u_apfJ&export=download"
            }
        }
    },
    {
        id: 16,
        title: "Ironheart (Season 01)",
        year: 2025,
        duration: "6 x 50 min", // Example for a series
        rating: 5.1,
        genres: ["Action", "Sci-Fi", "Adventure"],
        director: "Sam Bailey", // Update as needed
        cast: ["Dominique Thorne", "Anthony Ramos", "Alden Ehrenreich", "Regan Aliyah"],
        synopsis: "Riri Williams, a brilliant young inventor, creates the most advanced suit of armor since Iron Man. When the technology falls into the wrong hands, she must become the hero she was meant to be.",        poster: "assets/posters/ironheart.jpg",
        trailer: "WpW36ldAqnM", // Marvel Television's Ironheart Official Trailer
        qualities: {
            "Episode 01": {
                size: "567 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1vHqLRzBRGGlb8LeU-iF-bl2T7R_sPS9c&export=download"
            },
            "Episode 02": {
                size: "596 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=15gBjNlNaYNdatJYr7prO8kg1Ch-g-2-n&export=download"
            },
            "Episode 03": {
                size: "594 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1SgTKDUd2NYzF7_gx3ilsekbumEw8UBKL&export=download"
            }
        }
    },
    {
        id: 17,
        title: "Squid Game (Season 03)",
        year: 2025,
        duration: "6 x 55 min",
        rating: 8.6,
        genres: ["Drama", "Thriller", "Survival", "TV Series"],
        director: "Hwang Dong-hyuk",
        cast: [
            "Lee Jung-jae",
            "Wi Ha-joon",
            "Gong Yoo",
            "Park Hae-soo",
            "Jung Ho-yeon"
        ],
        synopsis: "The deadly games return for a third season as new and returning contestants face even more twisted challenges for a chance at unimaginable wealth. Loyalties are tested and secrets unravel as the stakes reach new heights.",
        poster: "assets/posters/squid-game-season-3.jpg",
        trailer: "0zQ9bD0uk1w", // Official Netflix Teaser Trailer (as of June 2025)
        qualities: {
            "Episode 01": {
                size: "316 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1BAHSWqKoYe9v001U8NVLC-YFrD1C9pKh&export=download"
            },
            "Episode 02": {
                size: "346 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1gXmzWnsPMXoHpAcIfEJi-55lAvHafMl3&export=download"
            },
            "Episode 03": {
                size: "367 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1H4apvtH-E8WOlbTNIcDCZAlhJ6tv8GZK&export=download"
            },
            "Episode 04": {
                size: "347 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1JFvK4AP-OcZLawEG8pw-xqwu9gkBJlhz&export=download"
            },
            "Episode 05": {
                size: "340 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1ukKItEAkRzvqFq2sbxziRwwFjl9c6X37&export=download"
            },
            "Episode 06": {
                size: "314 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1rj8GI2lXT1-X-qw-pgWrlM6ibH-eqOqB&export=download"
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
let currentSort = 'recently-added';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('====== DOM LOADED - APP STARTING ======');
    console.log('DOM loaded, initializing app...');
    
    // Initialize Firebase and load download counts
    initializeFirebase();
    
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
      // Set the sort dropdown to show "recently-added" as selected
    if (sortSelect) {
        sortSelect.value = 'recently-added';
        console.log('Set sort dropdown value to:', sortSelect.value);
    }
    
    console.log('Current sort before filterAndDisplayMovies:', currentSort);
    
    // Initialize with correct sorting applied
    console.log('About to call filterAndDisplayMovies with default sort...');
    filterAndDisplayMovies(searchInput, moviesGrid, movieCountElement);
    
    // Set up event listeners after initial display
    setupEventListeners(searchInput, filterBtns, sortSelect, closeBtn, modal, moviesGrid, movieCountElement);
    
    // Setup real-time download count listener
    setupRealtimeDownloadListener();
    
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
    }      window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
        if (e.target === document.getElementById('trailerModal')) {
            closeTrailerModal();
        }
        if (e.target === document.getElementById('movieViewerModal')) {
            closeMovieViewer();
        }
        
        // Hide episode picker when clicking outside
        const episodePicker = document.getElementById('episodePicker');
        if (episodePicker && episodePicker.classList.contains('show')) {
            // Check if click is outside episode picker and not on watch now button
            const watchNowBtn = document.getElementById('watchNowBtn');
            if (!episodePicker.contains(e.target) && e.target !== watchNowBtn && !watchNowBtn.contains(e.target)) {
                hideEpisodePicker();
            }
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
            closeMovieViewer();
        }
    });
    
    // Setup download button to scroll to quality section with animation
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.onclick = () => {
            const qualityOptions = document.querySelectorAll('.quality-options .quality-option');
            if (qualityOptions.length > 0) {
                qualityOptions.forEach(option => {
                    option.classList.add('quality-section-highlight');
                });
                qualityOptions[0].scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                setTimeout(() => {
                    qualityOptions.forEach(option => {
                        option.classList.remove('quality-section-highlight');
                    });
                }, 1200);
            }
        };
    }
    
    // Movie Viewer modal controls
    const movieViewerCloseBtn = document.getElementById('movieViewerCloseBtn');
    if (movieViewerCloseBtn) {
        movieViewerCloseBtn.addEventListener('click', closeMovieViewer);    }
    
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
    });    // Sort movies
    filteredMovies.sort((a, b) => {
        switch(currentSort) {
            case 'recently-added':
                console.log(`Sorting: ${a.title} (ID: ${a.id}) vs ${b.title} (ID: ${b.id}) = ${b.id - a.id}`);
                return b.id - a.id; // Higher ID means more recently added
            case 'year':
                return b.year - a.year;
            case 'rating':
                return b.rating - a.rating;
            case 'duration':
                return parseInt(a.duration) - parseInt(b.duration);
            case 'title':
                return a.title.localeCompare(b.title);
            default:
                return b.id - a.id; // Default to recently added
        }
    });
    
    console.log('Sorted movies order:', filteredMovies.map(m => `${m.title} (ID: ${m.id})`));
    
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
                <div class="download-stats">
                    <i class="fas fa-download"></i>
                    <span>${movie.downloadCount || 0} downloads</span>
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
            <div class="quality-option" onclick="downloadMovie('${info.downloadLink}', '${movie.title}', '${quality}', ${movie.id})">
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

    // Setup Watch Now button (open highest quality in Google Drive viewer or episode picker for TV shows)
    const watchNowBtn = document.getElementById('watchNowBtn');
    const episodePicker = document.getElementById('episodePicker'); // Add this div in your modal HTML if not present
    if (watchNowBtn) {
        // Detect if this is a TV show (qualities keys look like 'Episode 01', etc.)
        const isTVShow = Object.keys(movie.qualities).some(key => key.toLowerCase().includes('episode'));        if (isTVShow) {
            watchNowBtn.onclick = () => {
                if (episodePicker) {
                    // Check if already visible, toggle if so
                    if (episodePicker.classList.contains('show')) {
                        hideEpisodePicker();
                        return;
                    }
                      episodePicker.innerHTML = `
                        <div class="episode-picker-header">
                            <h4>Select Episode</h4>
                        </div>
                        <div class="episode-buttons-container">
                        ${Object.entries(movie.qualities).map(([ep, info], idx) => {
                            return `<button class="episode-btn" data-episode="${ep.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}">${ep}</button>`;
                        }).join('')}
                        </div>
                    `;
                    
                    // Show with animation
                    showEpisodePicker();
                      // Add close event
                    setTimeout(() => {
                        // Attach event listeners to episode buttons
                        const btns = episodePicker.querySelectorAll('.episode-btn');
                        btns.forEach(btn => {
                            btn.onclick = function(e) {
                                e.stopPropagation();
                                openMovieViewerByEpisode(movie.id, this.getAttribute('data-episode'));
                            };
                        });
                        
                        // Stop propagation on episode picker clicks
                        episodePicker.onclick = (e) => e.stopPropagation();
                    }, 0);
                }
            };
            watchNowBtn.style.display = 'inline-flex';
        } else {
            // Movie: open highest quality
            // Define quality order (highest to lowest)
            const qualityOrder = ['4K', '2160p', '1080p', '720p', '480p'];
            let bestQuality = null;
            for (const q of qualityOrder) {
                if (movie.qualities[q]) {
                    bestQuality = movie.qualities[q];
                    break;
                }
            }
            // If no preferred quality found, pick the first available
            if (!bestQuality) {
                const firstKey = Object.keys(movie.qualities)[0];
                bestQuality = movie.qualities[firstKey];
            }
            if (bestQuality && bestQuality.downloadLink) {
                // Extract Google Drive file ID
                const match = bestQuality.downloadLink.match(/id=([^&]+)/);
                const fileId = match ? match[1] : null;
                if (fileId) {
                    watchNowBtn.onclick = () => {
                        openMovieViewer(movie, bestQuality, fileId);
                    };
                    watchNowBtn.style.display = 'inline-flex';
                } else {
                    watchNowBtn.onclick = null;
                    watchNowBtn.style.display = 'none';
                }
            } else {
                watchNowBtn.onclick = null;
                watchNowBtn.style.display = 'none';
            }
            if (episodePicker) episodePicker.style.display = 'none';
        }
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
    // Hide episode picker when modal closes
    hideEpisodePicker();
}

// Download movie
async function downloadMovie(downloadLink, movieTitle, quality, movieId) {
    console.log(`Downloading ${movieTitle} in ${quality}...`);
    
    // Increment download counter
    if (movieId) {
        try {
            const newCount = await incrementDownloadCount(movieId);
            const movie = moviesDatabase.find(m => m.id === movieId);
            if (movie) {
                movie.downloadCount = newCount;
                updateDownloadCountDisplay(movieId);
                console.log(`Download count for ${movieTitle}: ${newCount}`);
            }
        } catch (error) {
            console.error('Error updating download count:', error);
        }
    }
    
    // Convert Google Drive link to direct download format to bypass virus scan
    let directDownloadLink = downloadLink;
    
    // Check if it's a Google Drive link with file ID
    const fileIdMatch = downloadLink.match(/id=([^&]+)/);
    if (fileIdMatch) {
        const fileId = fileIdMatch[1];
        // Use the direct download format that bypasses the virus scan warning
        directDownloadLink = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t&uuid=${Date.now()}`;
    }
    
    // For existing usercontent links, ensure they have the confirm parameter
    if (downloadLink.includes('drive.usercontent.google.com') && !downloadLink.includes('confirm=')) {
        directDownloadLink = downloadLink + '&confirm=t&uuid=' + Date.now();
    }
    
    // Create temporary link and trigger download
    const link = document.createElement('a');
    link.href = directDownloadLink;
    link.download = `${movieTitle}_${quality}.mp4`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Update download count display in modal and movie cards
function updateDownloadCountDisplay(movieId) {
    const movie = moviesDatabase.find(m => m.id === movieId);
    if (!movie) return;
    
    // Update movie card if visible in current display
    setTimeout(() => {
        const movieCards = document.querySelectorAll('.movie-card');
        movieCards.forEach(card => {
            const onclickStr = card.getAttribute('onclick');
            if (onclickStr && onclickStr.includes(`openMovieModal(${movieId})`)) {
                const downloadStats = card.querySelector('.download-stats span');
                if (downloadStats) {
                    downloadStats.textContent = `${movie.downloadCount || 0} downloads`;
                }
            }
        });
    }, 100);
}

// Real-time listener for download count updates (optional)
function setupRealtimeDownloadListener() {
    if (db) {
        const docRef = db.collection('downloadCounts').doc('movies');
        docRef.onSnapshot((doc) => {
            if (doc.exists) {
                const newCounts = doc.data();
                let hasChanges = false;
                
                // Update local counts and movie objects
                Object.keys(newCounts).forEach(key => {
                    if (downloadCounts[key] !== newCounts[key]) {
                        downloadCounts[key] = newCounts[key];
                        hasChanges = true;
                        
                        // Extract movie ID from key
                        const movieId = parseInt(key.replace('movie_', ''));
                        const movie = moviesDatabase.find(m => m.id === movieId);
                        if (movie) {
                            movie.downloadCount = newCounts[key];
                        }
                    }
                });
                
                // Update display if there were changes
                if (hasChanges) {
                    // Refresh current movies display to show updated counts
                    const moviesGrid = document.getElementById('moviesGrid');
                    if (moviesGrid && currentMovies) {
                        displayMovies(currentMovies, moviesGrid);
                    }
                }
            }
        }, (error) => {
            console.error('Error listening to download counts:', error);
        });
    }
}


