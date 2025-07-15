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
            
            // Load download counts and setup real-time listener
            loadDownloadCounts().then(() => {
                setupRealtimeDownloadListener();
                console.log('Firebase setup complete with real-time listener');
            });
        } else {
            console.warn('Firebase not loaded. Download counter will work locally only.');
            // Fallback to localStorage
            downloadCounts = JSON.parse(localStorage.getItem('movieDownloadCounts')) || {};
            updateMovieDownloadCounts();
            updateAllDownloadCounts();
        }
    } catch (error) {
        console.error('Firebase initialization failed:', error);
        // Fallback to localStorage
        downloadCounts = JSON.parse(localStorage.getItem('movieDownloadCounts')) || {};
        updateMovieDownloadCounts();
        updateAllDownloadCounts();
    }
}

// Load download counts from Firebase
async function loadDownloadCounts() {
    if (!db) {
        console.log('Firebase not available, using localStorage');
        downloadCounts = JSON.parse(localStorage.getItem('movieDownloadCounts')) || {};
        updateMovieDownloadCounts();
        updateAllDownloadCounts();
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
        updateAllDownloadCounts();
    } catch (error) {
        console.error('Error loading download counts:', error);
        // Fallback to localStorage
        downloadCounts = JSON.parse(localStorage.getItem('movieDownloadCounts')) || {};
        updateMovieDownloadCounts();
        updateAllDownloadCounts();
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
            
            // First, ensure document exists
            const docSnapshot = await docRef.get();
            if (!docSnapshot.exists) {
                console.log('Creating new download counts document');
                await docRef.set({ [countKey]: 1 });
                downloadCounts[countKey] = 1;
                return 1;
            }
            
            // Increment the count
            await docRef.update({
                [countKey]: firebase.firestore.FieldValue.increment(1)
            });
            
            // Update local count immediately
            downloadCounts[countKey] = (downloadCounts[countKey] || 0) + 1;
            
            console.log(`Download count incremented for movie ${movieId}: ${downloadCounts[countKey]}`);
            
            // Update UI immediately
            const movie = moviesDatabase.find(m => m.id === movieId);
            if (movie) {
                movie.downloadCount = downloadCounts[countKey];
                updateDownloadCountDisplay(movieId);
            }
            
            return downloadCounts[countKey];
        } catch (error) {
            console.error('Error incrementing download count:', error);
            // Fallback to localStorage
            downloadCounts[countKey] = (downloadCounts[countKey] || 0) + 1;
            localStorage.setItem('movieDownloadCounts', JSON.stringify(downloadCounts));
            
            // Update movie object and UI
            const movie = moviesDatabase.find(m => m.id === movieId);
            if (movie) {
                movie.downloadCount = downloadCounts[countKey];
                updateDownloadCountDisplay(movieId);
            }
            
            return downloadCounts[countKey];
        }
    } else {
        // Fallback to localStorage
        downloadCounts[countKey] = (downloadCounts[countKey] || 0) + 1;
        localStorage.setItem('movieDownloadCounts', JSON.stringify(downloadCounts));
        
        // Update movie object and UI
        const movie = moviesDatabase.find(m => m.id === movieId);
        if (movie) {
            movie.downloadCount = downloadCounts[countKey];
            updateDownloadCountDisplay(movieId);
        }
        
        console.log(`Local download count incremented for movie ${movieId}: ${downloadCounts[countKey]}`);
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
        trailer: "zgGTVaG2UiQ", // Official Netflix Teaser Trailer (as of June 2025)
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
    },
    {
        id: 18,
        title: "Ginny & Georgia (Season 01)",
        year: 2021,
        duration: "10 x 50 min",
        rating: 7.5,
        genres: ["Drama", "Comedy", "Teen", "TV Series"],
        director: "Sarah Lampert",
        cast: ["Brianne Howey", "Antonia Gentry", "Diesel La Torraca", "Jennifer Robertson", "Felix Mallard", "Sara Waisglass", "Scott Porter"],
        synopsis: "Ginny Miller, an angsty fifteen-year-old, often feels more mature than her thirty-year-old mother Georgia. After years on the run, Georgia desperately wants to put down roots in picturesque New England and give her family something they've never had... a normal life.",
        poster: "assets/posters/ginny-georgia-season-1.jpg",
        trailer: "qMfqOOznPQk", // Official Netflix trailer
        downloadCount: 0,
        qualities: {
            "Episode 01": {
                size: "378 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1p40FQ2P_LLY25pE0r5lxp75-eQmJPUse&export=download"
            },
            "Episode 02": {
                size: "288 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1BYqhBIyDsiiWJPThO9yK8kDyWYVp2VMb&export=download"
            },
            "Episode 03": {
                size: "322 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1_bt2Tbm-jqEgeghysFxlSARVDuSaQ1Xr&export=download"
            },
            "Episode 04": {
                size: "254 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1QgE9EbVUffCve6b7gl_uETfYHKb4OS1p&export=download"
            },
            "Episode 05": {
                size: "311 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1aA_hkSejpiwpygqiSIyZZGtd9dQed1p6&export=download"
            },
            "Episode 06": {
                size: "248 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1ghjttqiTi2zFoT02Ra0mFWRdUQe3QVtN&export=download"
            },
            "Episode 07": {
                size: "318 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1PhZWUu7KCQu6wLE3wxCZWLzgmpomWT31&export=download"
            },
            "Episode 08": {
                size: "251 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1cn1tD_dZTkSXxMYI6wBrD32iYmLii6QM&export=download"
            },
            "Episode 09": {
                size: "253 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1XwJ2rf69VB4IIBUmz8n9zatcS-sBWfAu&export=download"
            },
            "Episode 10": {
                size: "303 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1VKY69DvnCEF_AzNpFdFjLefoQEPS6_Eh&export=download"
            }
        }
    },
    {
        id: 19,
        title: "Ginny & Georgia (Season 02)",
        year: 2023,
        duration: "10 x 52 min",
        rating: 7.8,
        genres: ["Drama", "Comedy", "Teen", "TV Series"],
        director: "Sarah Lampert",
        cast: ["Brianne Howey", "Antonia Gentry", "Diesel La Torraca", "Jennifer Robertson", "Felix Mallard", "Sara Waisglass", "Scott Porter"],
        synopsis: "Georgia and Ginny are back and facing new challenges as Georgia's past threatens to catch up with her and Ginny navigates the complexities of being a teenager. Family secrets, romance, and drama unfold in this highly anticipated second season.",
        poster: "assets/posters/ginny-georgia-season-2.jpg",
        trailer: "w6kTHkTzfmY", // Official Netflix Season 2 trailer
        downloadCount: 0,
        qualities: {
            "Episode 01": {
                size: "338 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1tD3kteEgZY-jGLs1nkFh0w1YfJABF6e1&export=download"
            },
            "Episode 02": {
                size: "311 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1CRR26tFrbF3thC73De45obrWVefsfuxc&export=download"
            },
            "Episode 03": {
                size: "312 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1Q7YPYn4xgVQcWRuIDRqlQQTElgnpl3a5&export=download"
            },
            "Episode 04": {
                size: "332 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1Rp1cQbJ8ggwt83JNzvVeYBM92lBdixGf&export=download"
            },
            "Episode 05": {
                size: "341 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1vb8iLh9mXaUF92Z07loXMuKy-mB0jvse&export=download"
            },
            "Episode 06": {
                size: "394 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1UdddUTFg5HO4-xg8Rx3_TshVItYmMOqu&export=download"
            },
            "Episode 07": {
                size: "376 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1aARjAqf1kpH0uIDQJYE2lzzJZHuQvSCG&export=download"
            },
            "Episode 08": {
                size: "353 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1iEZZsQCv1gHDMr1enZaluTgIUgGMMFM7&export=download"
            },
            "Episode 09": {
                size: "341 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1wTYDAP1GCwzSfkdR0WzYQuyFyb1QlEkc&export=download"
            },
            "Episode 10": {
                size: "357 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1ePRlxIm6C16akZ1cyBAH9ncrLUNeHDwm&export=download"
            }
        }
    },
    {
        id: 20,
        title: "Ginny & Georgia (Season 03)",
        year: 2024,
        duration: "10 x 55 min",
        rating: 8.0,
        genres: ["Drama", "Comedy", "Teen", "TV Series"],
        director: "Sarah Lampert",
        cast: ["Brianne Howey", "Antonia Gentry", "Diesel La Torraca", "Jennifer Robertson", "Felix Mallard", "Sara Waisglass", "Scott Porter"],
        synopsis: "In the explosive third season, Georgia's dark past finally catches up to her as old enemies resurface. Ginny faces her biggest challenges yet as she prepares for graduation while dealing with family drama, relationships, and discovering shocking truths about her mother.",
        poster: "assets/posters/ginny-georgia-season-3.jpg",
        trailer: "dQw4w9WgXcQ", // Placeholder - update with actual trailer when available
        downloadCount: 0,
        qualities: {
            "Episode 01": {
                size: "277 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1t2Hoy-K46m3roYSVenOUKZ6GDu4fDu68&export=download"
            },
            "Episode 02": {
                size: "353 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1pcfbsjOe1yUtqLiPFgB-yL2rD4M450FC&export=download"
            },
            "Episode 03": {
                size: "387 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1bvysaGTKUz_fw7qpn227n1W_zvaqSw73&export=download"
            },
            "Episode 04": {
                size: "394 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1bG-it4ywhDV2HEETREoFjzShIGG-mVgb&export=download"
            },
            "Episode 05": {
                size: "388 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1TvvQxkAwwwbQUchWxFUXQSsZJ1Oql1Mw&export=download"
            },
            "Episode 06": {
                size: "355 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1hVxQVeagiNsepGorf2xLeh_S3dcv0r0h&export=download"
            },
            "Episode 07": {
                size: "320 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1Ur07MjN__2c1R5JnX7p9eTicrIVGuQ2U&export=download"
            },
            "Episode 08": {
                size: "324 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1KaXRRDpWuTRqxXM-k4LfECPQ9e-m3_UW&export=download"
            },
            "Episode 09": {
                size: "327 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1g7e9ywcH3JKoZsq9g7BMvFaEbAX4ZNWs&export=download"
            },
            "Episode 10": {
                size: "339 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=14IhD1pDbKMUerNVHDjMbzDdQWNP9882f&export=download"
            }
        }
    },
    {
        id: 21,
        title: "Prison Break (Season 01)",
        year: 2005,
        duration: "22 x 45 min",
        rating: 8.3,
        genres: ["Drama", "Crime", "Thriller", "TV Series"],
        director: "Paul Scheuring",
        cast: ["Wentworth Miller", "Dominic Purcell", "Robin Tunney", "Amaury Nolasco", "Marshall Allman", "Wade Williams", "Sarah Wayne Callies"],
        synopsis: "Michael Scofield gets himself imprisoned in Fox River State Penitentiary to break out his brother Lincoln Burrows, who is on death row for a crime he didn't commit. With an elaborate escape plan tattooed on his body, Michael must navigate prison politics and dangerous inmates.",
        poster: "assets/posters/prison-break-season-1.jpg",
        trailer: "AL9zLctDJaU", // Official Fox trailer
        downloadCount: 0,
        qualities: {
            "Episode 01": {
                size: "243 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1eWI8LEu8z4BksCbclbb_sUYU3_BiwlFx&export=download"
            },
            "Episode 02": {
                size: "270 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1jU_99yZimUZF6bY_rg7R05mlPrz_BaE2&export=download"
            },
            "Episode 03": {
                size: "231 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1f77SRYbfXt6YMsCebhy5RzaDogll6Awc&export=download"
            },
            "Episode 04": {
                size: "269 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1cAywfqfVdWieF7E5PnU1WH5ETI0wmUDb&export=download"
            },
            "Episode 05": {
                size: "231 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1f77SRYbfXt6YMsCebhy5RzaDogll6Awc&export=download"
            },
            "Episode 06": {
                size: "267 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1YNtRcLZZ1Ctp3tyoJLjEvlWn6j0QzLcF&export=download"
            },
            "Episode 07": {
                size: "268 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1dNum79TkUdPQJt28lFtTWQ9kUwfHbD5V&export=download"
            },
            "Episode 08": {
                size: "257 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1tmJE-jMFOz1NdtTXVKdteUZr0D6kCohO&export=download"
            },
            "Episode 09": {
                size: "260 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1IQMuPQ7yJng7gkWExjG1rOQ6JmlC61Dg&export=download"
            },
            "Episode 10": {
                size: "281 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1cw3TDcNjRhfwWnmts1-35yiOyOP1RQ0x&export=download"
            },
            "Episode 11": {
                size: "266 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1yMnDeSqGczZbvJDtyARB37adwsoLzBG3&export=download"
            },
            "Episode 12": {
                size: "258 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1WK0Rhk_ECCz_FLN_CfM2uvjsXmnjXASR&export=download"
            },
            "Episode 13": {
                size: "230 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1VB-6t7GtY3AZl2Oz4yH_YdockVc9r5o4&export=download"
            },
            "Episode 14": {
                size: "202 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1skOdA3gI8lXEVk1SS8yIJ0bF7L61V3Cn&export=download"
            },
            "Episode 15": {
                size: "186 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1Vq8Td-BVrC_AOStJnfnc9Wu5X0hDPzRV&export=download"
            },
            "Episode 16": {
                size: "181 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=10AradGfTesWGd_zDruPvAX6YHz5sE2dz&export=download"
            },
            "Episode 17": {
                size: "230 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=18JHBanodoOXo5NQW9iZFYriRAlKWZ5xa&export=download"
            },
            "Episode 18": {
                size: "218 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1Bp9qHmQYbsKWzjbImBQgj8ITnpeKvGs8&export=download"
            },
            "Episode 19": {
                size: "261 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1PB6JO7r1isXyj5Fy09KNuXk5oSM_lYoO&export=download"
            },
            "Episode 20": {
                size: "211 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1arLzPy7oMik-XbWXnPAy07m8lILxNyts&export=download"
            },
            "Episode 21": {
                size: "193 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1J8gU7LO5351zhz-ymR7l9Ad1PzB9_K5a&export=download"
            },
            "Episode 22": {
                size: "186 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1xsKJEwE8D2QnXaoVD6PJ13ctKrCRnJ0c&export=download"
            }
        }
    },
    {
        id: 22,
        title: "Prison Break (Season 02)",
        year: 2006,
        duration: "22 x 45 min",
        rating: 8.2,
        genres: ["Drama", "Crime", "Thriller", "TV Series"],
        director: "Paul Scheuring",
        cast: ["Wentworth Miller", "Dominic Purcell", "Sarah Wayne Callies", "Amaury Nolasco", "Marshall Allman", "Wade Williams", "Robert Knepper"],
        synopsis: "After their escape from Fox River, Michael and Lincoln are on the run from the FBI and The Company. While being pursued across the country, they must uncover the conspiracy that put Lincoln on death row and clear his name.",
        poster: "assets/posters/prison-break-season-2.jpg",
        trailer: "AL9zLctDJaU", // Official Fox trailer
        downloadCount: 0,
        qualities: {
            "Episode 01": {
                size: "277 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1D1qeF9L2wvyZkmATxuP8m87sicj4zZce&export=download"
            },
            "Episode 02": {
                size: "232 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1jjM2kdpWdmOWJNC4xURdurVU79y0qnyV&export=download"
            },
            "Episode 03": {
                size: "272 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1qlYarLmjhF_8ra_jtK4iUvSrYrUZkWbP&export=download"
            },
            "Episode 04": {
                size: "231 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1mIFIqf9GSlGM6QRr-qb3E7tKjFj_lEv2&export=download"
            },
            "Episode 05": {
                size: "261 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1lO1XRnPJEX2-tlbLnI6E8ZKtPnMuoHAB&export=download"
            },
            "Episode 06": {
                size: "234 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1zrSGwZXFwNKSbq2LDYWYmbAaPHXU5CNT&export=download"
            },
            "Episode 07": {
                size: "230 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1d9B13-qocvqu00O0AiXu-DQgpVS5ZxrQ&export=download"
            },
            "Episode 08": {
                size: "298 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1ca0_Ka0d7JwEtxdZNzMhwcObKMhuk41P&export=download"
            },
            "Episode 09": {
                size: "292 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1vAfQTU2S5xWlfXbvkRhEquP7XTnJg_bP&export=download"
            },
            "Episode 10": {
                size: "280 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=11av1770tjylbX53XvwXTXCmUSuNubjqZ&export=download"
            },
            "Episode 11": {
                size: "294 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1nuIl_R7aemzTR1C2L38eyjuDeNJ1bZbu&export=download"
            },
            "Episode 12": {
                size: "270 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=12fKIgAUTHeod4mQc3N7zHnXCBQL1aPgK&export=download"
            },
            "Episode 13": {
                size: "248 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1_lRhfvCa6YJOzxlr3pD9tNMxwxSqZPfc&export=download"
            },
            "Episode 14": {
                size: "243 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1mQ-4Eb6k_mpfpx3gKktooNLO7s3rgLEe&export=download"
            },
            "Episode 15": {
                size: "261 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1eGhdzGPiEvYk5Plz2X_xvdpgaicVApnw&export=download"
            },
            "Episode 16": {
                size: "256 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=115r0WLw0rOQ_drmF3wsp-C5vQl7beQt1&export=download"
            },
            "Episode 17": {
                size: "215 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1thg9PyDJF_lXYOZJmmtYrQYFWDUL3Sc7&export=download"
            },
            "Episode 18": {
                size: "216 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1VXyER0lzNIFTDgCtHvRKpkPecRjii80l&export=download"
            },
            "Episode 19": {
                size: "196 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1aqgXFeYuNZHHwDgHOBQ152zfPhX3VH07&export=download"
            },
            "Episode 20": {
                size: "225 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1JbNaDez3Z8fAmSDocyyFiD7rVZ1LqaW-&export=download"
            },
            "Episode 21": {
                size: "276 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1yY95SjPJtavRZ_iuUUVYpr56mssZll-g&export=download"
            },
            "Episode 22": {
                size: "282 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1KkVGzUOb51J7vz7ZRboh3Phd3wvwV_QJ&export=download"
            }
        }
    },
    {
        id: 23,
        title: "Prison Break (Season 03)",
        year: 2007,
        duration: "13 x 45 min",
        rating: 7.9,
        genres: ["Drama", "Crime", "Thriller", "TV Series"],
        director: "Paul Scheuring",
        cast: ["Wentworth Miller", "Dominic Purcell", "Sarah Wayne Callies", "Amaury Nolasco", "Robert Knepper", "Jodi Lyn O'Keefe", "Danay Garcia"],
        synopsis: "Michael finds himself imprisoned in Sona Federal Penitentiary in Panama, a hell-hole prison where the inmates rule and guards stay outside. He must break out his brother Lincoln and the other prisoners to survive.",
        poster: "assets/posters/prison-break-season-3.jpg",
        trailer: "AL9zLctDJaU", // Official Fox trailer
        downloadCount: 0,
        qualities: {
            "Episode 01": {
                size: "307 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1EufqAsGceKt9_Zf-0EU1rxC_wfughH3N&export=download"
            },
            "Episode 02": {
                size: "261 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1spD95B5irj1qIKsTinQb6jHEozdi1Hqy&export=download"
            },
            "Episode 03": {
                size: "252 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1aDXv1_1sYbkHrm0r5GoDGA9q_hugJ1FY&export=download"
            },
            "Episode 04": {
                size: "274 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=17ggF7p_4ec1FPqOKLZcRYD0WMu5k-5gw&export=download"
            },
            "Episode 05": {
                size: "295 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1yLmnNDqIAZQqsCscrsy_WQs2yXMKQhb0&export=download"
            },
            "Episode 06": {
                size: "312 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1fC7Iqa1qccORSABFnmWb0YuhzvRpg4qz&export=download"
            },
            "Episode 07": {
                size: "339 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1Xx10pDYzq0s3XGQuubcs6sJUem4hHV02&export=download"
            },
            "Episode 08": {
                size: "274 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1_HvGrqRZ__w2MOTCpccqfGB_EOzMBjHT&export=download"
            },
            "Episode 09": {
                size: "272 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1kESHWdjWDUsso1BfMK_tu1liasdRFU0k&export=download"
            },
            "Episode 10": {
                size: "269 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1g9v1MPiPSRXhjr6B2OzrpCLhf1i5t7U2&export=download"
            },
            "Episode 11": {
                size: "243 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1Bw-_KQkR5v8UC74X8Vq7hmQgpb_iz503&export=download"
            },
            "Episode 12": {
                size: "374 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1q97nidputc6iU7xvZt2y706UtZkjtEwN&export=download"
            },
            "Episode 13": {
                size: "313 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1bgrCcRvgglWpexC5VMfibmiI5d2fZ_RG&export=download"
            }
        }
    },
    {
        id: 24,
        title: "Prison Break (Season 04)",
        year: 2008,
        duration: "22 x 45 min",
        rating: 8.0,
        genres: ["Drama", "Crime", "Thriller", "TV Series"],
        director: "Paul Scheuring",
        cast: ["Wentworth Miller", "Dominic Purcell", "Sarah Wayne Callies", "Amaury Nolasco", "Robert Knepper", "Michael Rapaport", "Jodi Lyn O'Keefe"],
        synopsis: "Michael assembles a team of previous escapees to break into the Company's headquarters. Working with Homeland Security, they must infiltrate the most secure building in America to expose the conspiracy once and for all.",
        poster: "assets/posters/prison-break-season-4.jpg",
        trailer: "AL9zLctDJaU", // Official Fox trailer
        downloadCount: 0,
        qualities: {
            "Episode 01-02": {
                size: "493 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1FB7GTjgCA0acdy3Lt4rQNa3nGNLmyIFe&export=download"
            },
            "Episode 03": {
                size: "283 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1OHBUyjAnzIYjr6v0mFt6AXV_obTO1U6C&export=download"
            },
            "Episode 04": {
                size: "244 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1DN-0hIYfBxQKbpFz8PrMa_wTEv-Tr0sK&export=download"
            },
            "Episode 05": {
                size: "238 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1SDWK3KmMDfYoxD4hT9MloM4WYQgyaC3L&export=download"
            },
            "Episode 06": {
                size: "242 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1y5ud0TrznSlAcT8Ijaj6hTPSfYQbwcaC&export=download"
            },
            "Episode 07": {
                size: "253 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1j9o7ZlQzFRW0TPBWPdsYwPKc95mDWSVl&export=download"
            },
            "Episode 08": {
                size: "236 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1IZPy10QJ5FxvMFkvPerltbqZ3CvFnZCc&export=download"
            },
            "Episode 09": {
                size: "224 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=15LdJ7qcUaz6f2CYdSYI1artnpf7qduaC&export=download"
            },
            "Episode 10": {
                size: "199 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1wvPdYjLkzSP2838Q8A9KnuqhqOjaXbq8&export=download"
            },
            "Episode 11": {
                size: "212 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=14ATYKjvhzZL5OPY-I_0M6u1AZcfIwyO-&export=download"
            },
            "Episode 12": {
                size: "225 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1XN-VK0AE5i0IHxS2mLj4hPw0Jvbp35Ru&export=download"
            },
            "Episode 13": {
                size: "230 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1-utrueIlDx9xQBehZVVYuocZ8CpU08_5&export=download"
            },
            "Episode 14": {
                size: "240 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1ePYmvbdtfEZ9HIKFE-HfF9X8VW0ub1bS&export=download"
            },
            "Episode 15": {
                size: "252 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1oLXlyYyG1JbirAwn0BCXJffi-9CpL0ec&export=download"
            },
            "Episode 16": {
                size: "261 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=16TpPr71ItDNFhRgwMN-YiGKFLc93Nuyl&export=download"
            },
            "Episode 17": {
                size: "242 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1sJL6ARu3oV_gUA0JJmVG0rEAOk0uOj8V&export=download"
            },
            "Episode 18": {
                size: "226 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1YDxdmR1m1ohBHJl3QPlNsXIeEqQApnDW&export=download"
            },
            "Episode 19": {
                size: "232 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1S9n63vvtbVV3nAUwbJikEkcVhjTjx-vX&export=download"
            },
            "Episode 20": {
                size: "218 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1Be2WC7Vb4hy8JNJFXfRB-0O9KCWZpiGz&export=download"
            },
            "Episode 21": {
                size: "222 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=18IvdsLNUefv-AbMkOLYDfeoAKH4M9bH-&export=download"
            },
            "Episode 22": {
                size: "275 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1MEUN66r5_8yzOn-UA_qYU3P0T9aRI7DE&export=download"
            }
        }
    },
    {
        id: 25,
        title: "Prison Break (Season 05)",
        year: 2017,
        duration: "9 x 45 min",
        rating: 7.5,
        genres: ["Drama", "Crime", "Thriller", "TV Series"],
        director: "Paul Scheuring",
        cast: ["Wentworth Miller", "Dominic Purcell", "Sarah Wayne Callies", "Amaury Nolasco", "Robert Knepper", "Rockmond Dunbar", "Augustus Prew"],
        synopsis: "Seven years after Michael's apparent death, Lincoln receives evidence that his brother might still be alive in a Yemeni prison called Ogygia. The brothers reunite for one final escape that will test their bond and skills to the limit.",
        poster: "assets/posters/prison-break-season-5.jpg",
        trailer: "yTiw4lN0jgA", // Official Season 5 trailer
        downloadCount: 0,
        qualities: {
            "Episode 01": {
                size: "751 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=12_cyaiS4Pr2wNATobO3RUezlcmL3mnsA&export=download"
            },
            "Episode 02": {
                size: "800 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1YOQOYyquxwwE6rfr4Oe9OuEwD1tZLCgE&export=download"
            },
            "Episode 03": {
                size: "851 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=10OztZHUsxHgktB9LnWHO9-ZuNlnBe5LO&export=download"
            },
            "Episode 04": {
                size: "851 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=14-p03qSVUBB5AQAISS1CTnQ9kauJ1u8M&export=download"
            },
            "Episode 05": {
                size: "801 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1nCsYlyE4aGgbvAGT_BLPz4HaOsMo1Cmp&export=download"
            },
            "Episode 06": {
                size: "800 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1ITwHsWAXL6fnKVG2Ot3fCU28r5NY9jyg&export=download"
            },
            "Episode 07": {
                size: "800 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=14WDI38EBqRXquS7qCAKgVlJGOtZdu1rf&export=download"
            },
            "Episode 08": {
                size: "801 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1h691hgd0qYeyVzdzUNJzOxaJuHuQBW-J&export=download"
            },
            "Episode 09": {
                size: "751 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=13biwsYIpfBMgTFwWArhDsIzIcIXBtuBZ&export=download"
            }
        }
    },
    {
        id: 26,
        title: "Eleven (2025)",
        year: 2025,
        duration: "135 min",
        rating: 7.8,
        genres: ["Action", "Thriller", "Drama", "Tamil"],
        director: "Lokkesh Ajls",
        cast: ["Naveen Chandra", "Reyaa", "Abhirami Gopikumar", "Dileepan", "Riythvika"],
        synopsis: "A high-octane action thriller set in Chennai, where an elite team of eleven is assembled to take down a powerful crime syndicate. As secrets unravel and loyalties are tested, the fate of the city hangs in the balance.",
        poster: "assets/posters/eleven-2025.jpg",
        trailer: "uUeV7yVC3fQ", // Official Tamil trailer (placeholder)
        downloadCount: 0,
        qualities: {
            "720p": {
                size: "1.7 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1ACTlo6u_745jlbR-jOUJ895UlpscrmO6&export=download"
            },
            "480p": {
                size: "700 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=182CsJcNTNDZ3uggdaWN2x6Ef_uQn112E&export=download"
            },
            "360p": {
                size: "400 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1wwsw92tWhBtIpm8FU95Di88Z9Edy_g9s&export=download"
            }
        }
    },
    {
        id: 27,
        title: "Thunderbolts",
        year: 2025,
        duration: "127 min",
        rating: 7.5,
        genres: ["Action", "Adventure", "Sci-Fi", "Marvel"],
        director: "Jake Schreier",
        cast: ["Florence Pugh", "Sebastian Stan", "David Harbour", "Wyatt Russell", "Hannah John-Kamen", "Olga Kurylenko", "Julia Louis-Dreyfus", "Harrison Ford"],
        synopsis: "A team of antiheroes and reformed villains is assembled by the government for a high-stakes mission that only they can handle. Marvel's Thunderbolts brings together fan-favorite characters from across the MCU in a new action-packed adventure.",
        poster: "assets/posters/thunderbolts-2025.jpg",
        trailer: "-sAOWhvheK8",
        downloadCount: 0,
        qualities: {
            "Sinhala Subtitles": {
                size: "211 KB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1WcO-xeGLrYVLLslzDv3YDFxJ2xQ6brZm&export=download"
            },
            "720p": {
                size: "918 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1rkVVk0x2eakZv5UgdooM-wMq6181VR03&export=download"
            },
            "1080p": {
                size: "1.7 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1R9f-pmLRRgGken1jE34XsyCeXAgFRKzE&export=download"
            },
            "4K": {
                size: "2.9 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1loCHKX9GocGIOlJ-Vr0g6_ojWinDZamQ&export=download"
            }
        },
       
    },
    {
        id: 28,
        title: "Raid",
        year: 2018,
        duration: "122 min",
        rating: 7.4,
        genres: ["Action", "Crime", "Drama", "Hindi"],
        director: "Raj Kumar Gupta",
        cast: ["Ajay Devgn", "Ileana D'Cruz", "Saurabh Shukla"],
        synopsis: "A fearless income tax officer raids the mansion of the most powerful man in Lucknow after someone mysteriously draws his attention to the evidence.",
        poster: "assets/posters/raid-2018.jpg",
        trailer: "3h4thS-Hcrk",
        qualities: {
            "Sinhala Subtitles": {
                size: "175 KB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1iSGABKBFrguUnfdDIdWpRv8CUO1GiffD&export=download"
            },
            "720p": {
                size: "1.0 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1cEiUpWIOp5t7JOKWWjsTAuB6FprE7rTr&export=download"
            },
            "1080p": {
                size: "2.0 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1UJocPIQthSxbb63tY_5AuAKj9kNwG8S0&export=download"
            }
        }
    },
    {
        id: 29,
        title: "Raid 2",
        year: 2025,
        duration: "130 min",
        rating: 7.5,
        genres: ["Action", "Crime", "Drama", "Hindi"],
        director: "Raj Kumar Gupta",
        cast: ["Ajay Devgn","Vaaanita Kaur", "Riteish Deshmukh", "Tamanna Bhatia"],
        synopsis: "Sequel to the 2018 hit Raid. The fearless income tax officer returns for another high-stakes mission against corruption.",
        poster: "assets/posters/raid-2-2025.jpg",
        trailer: "GCObs0_MszA",
        qualities: {
            "Sinhala Subtitles": {
                size: "183 KB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1bZF5mpHNln_ysFQ9txOnzbVhPgNhi0d4&export=download"
            },
            "720p": {
                size: "1.2 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1w62MYMJ4MiP3nvksQ9Kc6411pYB83aTR&export=download"
            },
            "1080p": {
                size: "2.5 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1acKAarxFg5Dn72ThdBcSXCn2TlY031oJ&export=download"
            }
        }
    },
    {
        id: 30,
        title: "Ballerina",
        year: 2025,
        duration: "124 min",
        rating: 7.1,
        genres: ["Action", "Thriller", "Crime"],
        director: "Len Wiseman",
        cast: ["Ana de Armas", "Keanu Reeves", "Ian McShane", "Anjelica Huston", "Gabriel Byrne", "Norman Reedus", "Catalina Sandino Moreno", "Lance Reddick"],
        synopsis: "An assassin trained in the traditions of the Ruska Roma organization sets out to seek revenge after her father's death. Set in the John Wick universe.",
        poster: "assets/posters/balerina-2025.jpg",
        trailer: "0FSwsrFpkbw", // IMDb trailer key
        qualities: {
            "Sinhala Subtitles": {
                size: "83 KB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1eSrCqd8E7--fpyqGggIZdzNh3x7klyup&export=download"
            },
            "720p": {
                size: "1.1 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=17Q6d36jaH8Ro0fplrpgRYWT9jmBeS_65&export=download"
            },
            "1080p": {
                size: "2.3 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=11TYeLocjWw4bDqwlG6m2JocxlmITIz8f&export=download"
            }
        }
    },
    {
        id: 31,
        title: "Off the Grid",
        year: 2025,
        duration: "104 min",
        rating: 5.2,
        genres: ["Action", "Drama"],
        director: "Johnny Martin",
        cast: ["Josh Duhamel", "Greg Kinnear", "María Elisa Camargo", "Peter Stormare", "Ricky Russert", "Michael Zapesotsky", "Joe Bucaro III", "Daniel Farag"],
        synopsis: "A brilliant scientist goes on the run instead of weaponizing his invention, turning the wilderness into a battleground as he is hunted by a ruthless corporation.",
        poster: "assets/posters/off-the-grid-2025.jpg",
        trailer: "c3WkhVLqKaI", // IMDb trailer key
        qualities: {
            "720p": {
                size: "969 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1x07aQ5w_0wkHlSL-JfFcSjslB3LPK_ks&export=download"
            },
            "1080p": {
                size: "1.9 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1Lhpehx1px90u-nJYI2htYfzftwfzt9gP&export=download"
            },
            "4K": {
                size: "4.7 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1B8QqLv7iH2eEq8PPG4ViA2oZ7YZkauoO&export=download"
            }
        }
    },
    {
        id: 32,
        title: "Ice Road: Vengeance",
        year: 2025,
        duration: "95 min",
        rating: 7.5, // IMDb rating not available yet
        genres: ["Action", "Thriller"],
        director: "Jonathan Hensleigh",
        cast: [
            "Liam Neeson", "Bingbing Fan", "Michala Banas", "Mahesh Jadu", "Bernard Curry", "Amelia Bishop", "Grace O'Sullivan", "Geoff Morrell", "Saksham Sharma", "CJ. Bloomfield", "Rosie Traynor", "Sunny S. Walia", "Shivantha Wijesinha", "Ira Chakraborty", "Kaden Hartcher", "Salim Fayad", "Seth Kannof", "Kaivu Suvarna"
        ],
        synopsis: "Mike travels to Nepal to scatter his late brother's ashes on Mt. Everest. When Mike and his mountain guide encounter mercenaries on a tour bus, they are forced to fight to save themselves, the passengers, and the country.",
        poster: "assets/posters/ice-road-vengeance-2025.jpg",
        trailer: "K6lJh9ADfbQ", // YouTube Vertical Official Trailer
        qualities: {
            "Sinhala Subtitles": {
                size: "101 KB",
                downloadLink: "https://drive.usercontent.google.com/download?id=11yo7zIejkqushBoO4gyd8h0WkO0cngKi&export=download"
            },
            "720p": {
                size: "1.0 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1GVnYl-hWJgBoEIawkF99eyacX6VPnEjG&export=download"
            },
            "1080p": {
                size: "2.1 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1I7XYsrX5u-__fT9zskgekP3Msg7rKho5&export=download"
            },
            "4K": {
                size: "5.4 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1V2zuudRWn8YNlluXDSojeO9o0-_z3Hr4&export=download"
            }
        }
    },
    {
        id: 33,
        title: "Bring Her Back",
        year: 2025,
        duration: "104 min",
        rating: 7.5, // IMDb rating not yet available
        genres: ["Horror", "Mystery", "Supernatural Horror", "Body Horror"],
        director: "Danny Philippou, Michael Philippou",
        cast: [
            "Billy Barratt", "Sally Hawkins", "Mischa Heywood", "Jonah Wren Phillips", "Stephen Phillips", "Sally-Anne Upton", "Sora Wong", "Kathryn Adams", "Brian Godfrey", "Brendan Bacon", "Olga Miller", "Nicola Tiele", "Frances Cassar", "Asha O'Connell", "Arianny Ross", "Amya Mollison", "Keith Warrior", "Ryan Linton Brown"
        ],
        synopsis: "A brother and sister uncover a terrifying ritual at the secluded home of their new foster mother.",
        poster: "assets/posters/bring-her-back-2025.jpg",
        trailer: "kBskrYZfhw8", // YouTube: Bring Her Back | Official Trailer HD | A24
        qualities: {
            "Sinhala Subtitles": {
                size: "121 KB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1rKvqooaKnSAwoliu2OAeAbMuKjgaO3lv&export=download"
            },
            "720p": {
                size: "953 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=13MWHHk0pQfQcrBUypAl5jWyThyGDxPHW&export=download"
            },
            "1080p": {
                size: "1.9 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1hUHUM_4-tkxfZiddMbRlpUFo-8DtR9t7&export=download"
            }
        }
    },
    {
        id: 34,
        title: "Lilo & Stitch",
        year: 2025,
        duration: "108 min",
        rating: 6.9, // IMDb rating not yet available
        genres: ["Family", "Comedy", "Adventure", "Sci-Fi"],
        director: "Dean Fleischer Camp",
        cast: [
            "Maia Kealoha", "Sydney Agudong", "Chris Sanders", "Zach Galifianakis", "Billy Magnussen", "Courtney B. Vance", "Amy Hill", "Tia Carrere", "Kaipo Dudoit", "Hannah Waddingham", "Jason Scott Lee", "Celia Kenney", "Blake La Benz", "Skyler Bible", "Judy Nguyen", "Christian Yeung", "Courtney Coleman", "Christina Souza"
        ],
        synopsis: "A lonely Hawaiian girl and a fugitive alien help mend a broken family in this live-action reimagining of the Disney classic.",
        poster: "assets/posters/lilo-and-stitch-2025.jpg",
        trailer: "VWqJifMMgZE", // YouTube: Lilo & Stitch | Official Trailer | In Theaters May 23
        qualities: {
            "Sinhala Subtitles": {
                size: "168 KB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1mZFqh_CkmFhIXYNoe8CYrSw1YMqzW_vP&export=download"
            },
            "720p": {
                size: "991 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1vnBTagjij2fYL7G3wRFAYErh30t0NQUZ&export=download"
            },
            "1080p": {
                size: "1.9 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1oPHX19b1LsPVCCUBVJl_10DZkFBBrXLx&export=download"
            }
        }
    },
    {
        id: 35,
        title: "The Old Guard 2",
        year: 2025,
        duration: "120 min",
        rating: 7.7, // IMDb rating not yet available
        genres: ["Action", "Fantasy", "Thriller"],
        director: "Victoria Mahoney",
        cast: [
            "Charlize Theron", "KiKi Layne", "Matthias Schoenaerts", "Marwan Kenzari", "Luca Marinelli", "Chiwetel Ejiofor", "Uma Thurman", "Henry Golding", "Veronica Ngo"
        ],
        synopsis: "The immortal warriors return for a new mission as old enemies resurface and new threats emerge, testing the limits of their loyalty and power.",
        poster: "assets/posters/the-old-guard-2.jpg",
        trailer: "lyivgZ074PY", // YouTube: The Old Guard 2 | Official Trailer (Netflix, 2025)
        qualities: {
            "Sinhala Subtitles": {
                size: "192 KB",
                downloadLink: "https://drive.usercontent.google.com/download?id=180FhFP5LVDstvuvGGDpb3dXFNJ7KMJfY&export=download"
            },
            "720p": {
                size: "980 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=17B_hpfEPoeBS-1MT5gSakjRB7WiM1Is9&export=download"
            },
            "1080p": {
                size: "2.0 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=16xonXB4d9Lp90blqBFPZBH3wFzuh1kC4&export=download"
            }
        }
    },
    {
        id: 36,
        title: "Heads of State",
        year: 2025,
        duration: "105 min",
        rating: 5.6, // IMDb rating not yet available
        genres: ["Action", "Comedy", "Thriller"],
        director: "Ilya Naishuller",
        cast: [
            "Idris Elba", "John Cena", "Priyanka Chopra Jonas", "Paddy Considine", "Stephen Root", "Carla Gugino", "Jack Quaid", "Richard Coyle", "Sarah Niles", "Tommy Lee Jones"
        ],
        synopsis: "A mismatched pair of special agents must work together to prevent a global catastrophe when a world leader is kidnapped, leading to a wild and action-packed rescue mission.",
        poster: "assets/posters/heads-of-state-2025.jpg",
        trailer: "8J646zM7UM8", // YouTube: Heads of State | Official Trailer (2025)
        qualities: {
            "720p": {
                size: "1.0 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1gdnyJF58qQnJen8lNRZYzxOwPEzaaVRX&export=download"
            },
            "1080p": {
                size: "2.1 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1FxdJxfVoEr6FHSpSXhwFWHbP66Q5feXU&export=download"
            }
        }
    },
    {
        id: 37,
        title: "The Sandman (Season 1)",
        year: 2022,
        duration: "10 x 45 min",
        rating: 7.7,
        genres: ["Drama", "Fantasy", "Horror", "TV Series"],
        director: "Jamie Childs, Mairzee Almas, Coralie Fargeat, Louise Hooper, Andrés Baiz, Mike Barker",
        cast: [
            "Tom Sturridge", "Boyd Holbrook", "Patton Oswalt", "Vivienne Acheampong", "David Thewlis", "Jenna Coleman", "Gwendoline Christie", "Kirby Howell-Baptiste", "Mason Alexander Park", "Donna Preston", "Kyo Ra", "Razane Jammal", "Sandra James-Young", "Stephen Fry", "Mark Hamill"
        ],
        synopsis: "Upon escaping after decades of imprisonment by a mortal wizard, Dream, the personification of dreams, sets out to reclaim his lost equipment and restore order to his realm in this acclaimed adaptation of Neil Gaiman's graphic novel.",
        poster: "assets/posters/sandman-season-1.jpg",
        trailer: "5znJsyI7SJo", // YouTube: The Sandman | Official Trailer | Netflix
        qualities: {
            "Episode 01": {
                size: "684 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1xU_wyMqOUA9Zq6TCq-GZh0Uv2WusRufA&export=download"
            },
            "Episode 02": {
                size: "551 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1SX0J0OAer7JVSFFdHaqpCzosusl-EAsJ&export=download"
            },
            "Episode 03": {
                size: "508 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1F_OVNZucFwtAXo3HXihRSs8xNeTuYg5G&export=download"
            },
            "Episode 04": {
                size: "515 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=18rZq54y9TPkFOUHfPciPAC3FnQPAsTmF&export=download"
            },
            "Episode 05": {
                size: "622 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1y55wkMHEf-2pt1x2-oMviXgWSzzV-8o9&export=download"
            },
            "Episode 06": {
                size: "829 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1ImGoje3U20ZwNZ-yqyBZvJB18Tvk2ARo&export=download"
            },
            "Episode 07": {
                size: "522 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1LPuihEbC_3gRGSDUMHr33hetEABsjcna&export=download"
            },
            "Episode 08": {
                size: "724 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1blAtv-DnySe_8SoGagR24kXK99chOv-T&export=download"
            },
            "Episode 09": {
                size: "589 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1zLPeNwuGKXmsmplz3LfFi1Uko9MT1Eeb&export=download"
            },
            "Episode 10": {
                size: "575 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1qPsoc1plg9QN76hQ1HcauF4y9mxd98a0&export=download"
            }
        }
    },
    {
        id: 38,
        title: "The Sandman (Season 2)",
        year: 2025,
        duration: "10 x 45 min",
        rating: 7.7,
        genres: ["Drama", "Fantasy", "Horror", "TV Series"],
        director: "Jamie Childs, Mairzee Almas, Coralie Fargeat, Louise Hooper, Andrés Baiz, Mike Barker",
        cast: [
            "Tom Sturridge", "Boyd Holbrook", "Patton Oswalt", "Vivienne Acheampong", "David Thewlis", "Jenna Coleman", "Gwendoline Christie", "Kirby Howell-Baptiste", "Mason Alexander Park", "Donna Preston", "Kyo Ra", "Razane Jammal", "Sandra James-Young", "Stephen Fry", "Mark Hamill"
        ],
        synopsis: "Dream returns for a new season of cosmic challenges, facing new foes and forging new alliances as the boundaries between dreams and reality blur in this acclaimed adaptation of Neil Gaiman's graphic novel.",
        poster: "assets/posters/sandman-season-2.jpg",
        trailer: "Er18gmgqy2k", // YouTube: The Sandman Season 2 | Official Trailer (Netflix, 2025)
        qualities: {
            "Episode 01": {
                size: "511 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1aKibsQRAetxSEmEn0YknA1qVK8D-1uyX&export=download"
            },
            "Episode 02": {
                size: "676 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1FzRbqjkyVu1FwKYAH35U25pdEZ7sGQzw&export=download"
            },
            "Episode 03": {
                size: "598 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1CjctSMdPYf0v_Afaxqv53VdsRjmYDE0b&export=download"
            },
            "Episode 04": {
                size: "485 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1HPLGhv_0E3R2EId99-7rROJz8EkR06k0&export=download"
            },
            "Episode 05": {
                size: "899 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1yhH6b_st1NpzwbVi38t8-4fGCAgs96A_&export=download"
            },
            "Episode 06": {
                size: "583 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1dVu9zJf-blPJ8NzEP8LECMVi0fVp20XY&export=download"
            },
            "Episode 07": {
                size: "Not Available",
                downloadLink: ""
            },
            "Episode 08": {
                size: "Not Available",
                downloadLink: ""
            },
            "Episode 09": {
                size: "Not Available",
                downloadLink: ""
            },
            "Episode 10": {
                size: "Not Available",
                downloadLink: ""
            }
        }
    },
    {
        id: 39,
        title: "Eden",
        year: 2024,
        duration: "129 min",
        rating: 6.4,
        genres: ["Psychological Thriller", "Thriller", "Drama"],
        director: "Ron Howard",
        cast: ["Jude Law",
            "Ana de Armas",
            "Vanessa Kirby",
            "Daniel Brühl",
            "Sydney Sweeney",
            "Jonathan Tittel",
            "Felix Kammerer",
            "Toby Wallace",
            "Ignacio Gasparini",
            "Richard Roxburgh"],
        synopsis: "Follows a group of people fueled by a profound desire for change; in order to turn their back to society they leave everything behind and set their futures on the harsh landscape of the Galapagos.",
        poster: "assets/posters/eden-2024.jpg", // Poster missing, please add to assets/posters
        trailer: "QQZ1Ti1g8gU", // Replace with official trailer if available
        qualities: {
            "720p": {
                size: "793 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1eP0xQd9Xb5zgHi92Tio--Mg1b3Kz-pQy&export=download"
            },
            "1080p": {
                size: "1.8 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1GgCkJBXz4w-y69eda8d4FPbyNkGaFCFi&export=download"
            }
        }
    },
    {
        id: 40,
        title: "The Ritual",
        year: 2025,
        duration: "118 min", // Update if official runtime is available
        rating: 4.5, // Update if official IMDb rating is available
        genres: ["Horror", "Thriller"],
        director: " David Midell",
        cast: ["Al Pacino","Abigail Cowen","Dan Stevens","Ashley Greene", "Patricia Heaton"], // Update with cast if available
        synopsis: "A group faces terrifying supernatural events after a mysterious ritual. (Update with official plot if available)",
        poster: "assets/posters/the-ritual-2025.jpg", // Poster missing, please add to assets/posters
        trailer: "Y8zUTpO3JAo", // Add YouTube trailer ID if available
        qualities: {
            "720p": {
                size: "906 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=13uQYkBjiQb6TQQbFDQGlcQBCfiWEu0vA&export=download"
            },
            "1080p": {
                size: "1.8 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1ocG0NfMiUIlyFl8kETxZY-MyO542nvHu&export=download"
            },
            "4K": {
                size: "4.4 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1obKNwfo0OnbwUeCb7HTXa4NpolU5-jpA&export=download"
            }
        }
    },
    {
        id: 41,
        title: "28 Days Later",
        year: 2002,
        duration: "113 min",
        rating: 7.6,
        genres: ["Horror", "Sci-Fi", "Thriller"],
        director: "Danny Boyle",
        cast: [
            "Cillian Murphy",
            "Naomie Harris",
            "Christopher Eccleston",
            "Alex Palmer",
            "Bindi Miller"
        ],
        synopsis: "Four weeks after a mysterious, incurable virus spreads throughout the UK, a handful of survivors try to find sanctuary.",
        poster: "assets/posters/28-days-later-2002.jpg", // Please add this poster image
        trailer: "mWEhfF27O0c", // Official trailer YouTube ID
        qualities: {
            "Sinhala Subtitles": {
                size: "97 KB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1c5J5SL-9rk8Svk9XLgXadGY7-v9IM6JW&export=download"
            },
            "720p": {
                size: "906 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1Uw4l20xYEPABO1lNLLGmwEopyQBDy9nX&export=download"
            },
            "1080p": {
                size: "1.8 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1TJ7IKgEAnPMrM38IiSaenp6iqNbHyxs4&export=download"
            }
        }
    },
    {
        id: 42,
        title: "28 Weeks Later",
        year: 2007,
        duration: "100 min",
        rating: 6.9,
        genres: ["Horror", "Sci-Fi", "Thriller"],
        director: "Juan Carlos Fresnadillo",
        cast: [
            "Robert Carlyle",
            "Rose Byrne",
            "Jeremy Renner",
            "Harold Perrineau",
            "Catherine McCormack"
        ],
        synopsis: "Six months after the rage virus was inflicted on the population of Great Britain, the US Army helps to secure a small area of London for the survivors, only for the virus to resurface.",
        poster: "assets/posters/28-weeks-later-2007.jpg", // Please add this poster image
        trailer: "0gGbaXqbAVo", // Official trailer YouTube ID
        qualities: {
            "Sinhala Subtitles": {
                size: "83 KB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1xCJ7koZSUdOGv3xKS-f82nt5yNa12E5-&export=download"
            },
            "720p": {
                size: "698 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1vGe_jaqphjC3VJCMtftalA_7VzZmhBFC&export=download"
            },
            "1080p": {
                size: "1.9 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1aT-ClpTIvKDBB4sQd4ogkZvIteV4tJuk&export=download"
            }
        }
    },
    {
        id: 43,
        title: "Train To Busan",
        year: 2016,
        duration: "118 min",
        rating: 7.6,
        genres: ["Action", "Horror", "Thriller"],
        director: "Sang-ho Yeon",
        cast: [
            "Gong Yoo",
            "Jung Yu-mi",
            "Ma Dong-seok",
            "Su-an Kim",
            "Eui-sung Kim"
        ],
        synopsis: "While a zombie virus breaks out in South Korea, passengers struggle to survive on the train from Seoul to Busan.",
        poster: "assets/posters/train-to-busan-2016.jpg", // Please add this poster image
        trailer: "1ovgxN2VWNc", // Official trailer YouTube ID
        qualities: {
            "Sinhala Subtitles": {
                size: "90 KB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1BqvFbao3dgTfnTK1F8Us7f5lG7IjsJPU&export=download"
            },
            "720p": {
                size: "869 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1J_X08WLAN6h2xPw6VVEC11hK9i_DHcdo&export=download"
            },
            "1080p": {
                size: "1.8 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1O9MXegDpWiFtgnknBlZc8reLx-uhApIy&export=download"
            },
            "4K": {
                size: "5.1 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1J9AqrVMSLbvqAYq6ytYdAl7CfzYWJ4Tg&export=download"
            }
        }
    },
    {
        id: 44,
        title: "Peninsula (Train To Busan 2)",
        year: 2020,
        duration: "116 min",
        rating: 5.5,
        genres: ["Action", "Horror", "Thriller"],
        director: "Sang-ho Yeon",
        cast: [
            "Dong-won Gang",
            "Lee Jung-hyun",
            "Re Lee",
            "Hae-hyo Kwon",
            "Min-jae Kim"
        ],
        synopsis: "A soldier and his team battle hordes of post-apocalyptic zombies in the wastelands of the Korean Peninsula.",
        poster: "assets/posters/peninsula-2020.jpg", // Please add this poster image
        trailer: "yVucSRLLeIM", // Official trailer YouTube ID
        qualities: {
            "Sinhala Subtitles": {
                size: "104 KB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1lsTb_N-pFmgLScNMKJNV__q06_2ErLGy&export=download"
            },
            "720p": {
                size: "1.0 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1RDtn5vWGFyNvfxw4Jeg3RPidHploL0Ft&export=download"
            },
            "1080p": {
                size: "2.1 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1UT3dr2i4gclwKnFJZ8qEWvn7wJqm34MP&export=download"
            },
            "4K": {
                size: "5.2 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1lFGQzS6HJaAJHhf1Nl4WMb0VnjK5Jim3&export=download"
            }
        }
    },
    {
        id: 45,
        title: "Karate Kid Legends",
        year: 2025,
        duration: "94 min",
        rating: 6.6,
        genres: ["Action", "Drama", "Family"],
        director: "Jonathan Entwistle",
        cast: ["Jackie Chan","Ralph Macchio","Ben Wang","Sadie Stanley","Joshua Jackson","Aramis Knight"], // Update with cast if available
        synopsis: "A new generation takes on the legacy of the Karate Kid. (Update with official plot if available)",
        poster: "assets/posters/karate-kid-legends-2025.jpg", // Please add this poster image
        trailer: "LhRXf-yEQqA", // Add YouTube trailer ID if available
        qualities: {
            "Sinhala Subtitles": {
                size: "140 KB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1H-3iRjckIu2YSyxSzfW04563hz2RFTaZ&export=download"
            },
            "720p": {
                size: "865 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1zD2AOFTAIl9VFsD39AjyN1tATkjUqs-5&export=download"
            },
            "1080p": {
                size: "1.6 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1P0B-pRXUEY-acGPStk-eeuevHkuJHhOc&export=download"
            },
            "4K": {
                size: "2.9 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=14iugdHZZjdwXy5B5H12WbUrrA53_I111&export=download"
            }
        }
    },
    {
        id: 46,
        title: "Alice in Borderland (Season 1)",
        year: 2020,
        duration: "8 x 50 min",
        rating: 7.7,
        genres: ["Drama", "Thriller", "Sci-Fi", "Survival", "TV Series"],
        director: "Shinsuke Sato",
        cast: ["Kento Yamazaki", "Tao Tsuchiya", "Nijirô Murakami", "Aya Asahina", "Dôri Sakurada"],
        synopsis: "Arisu, a listless, jobless and video-game-obsessed young man, suddenly finds himself in a strange, emptied-out version of Tokyo in which he and his friends must compete in dangerous games in order to survive.",
        poster: "assets/posters/alice-in-borderland.jpg",
        trailer: "49_44FFKZ1M",
        type: "tv",
        qualities: {
            "Episode 01": {
                size: "750 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1NjR5yQgtU_ZOOvWZoKDtrMERPXrToCFg&export=download"
            },
            "Episode 02": {
                size: "621 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=13Eb8Aijz2B2H8RksxEOpV3uTBl7lvDcm&export=download"
            },
            "Episode 03": {
                size: "539 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=12Fpf1gKhnmEOCJIGVw1aYeZ-XkQqwOWG&export=download"
            },
            "Episode 04": {
                size: "542 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1rQvBXJ7vNMBQTPplQ9yqy-cUVQvXw9je&export=download"
            },
            "Episode 05": {
                size: "695 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1iO6C7cRO0r7XvOjKKXwKDc3u6bhx4UpE&export=download"
            },
            "Episode 06": {
                size: "500 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1brM79mRnsx4pbiPVcyIfoqYrSlfnBkUT&export=download"
            },
            "Episode 07": {
                size: "580 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=13hIZDzgdSZV0pdsXxvzbc6nbNWgUpMl1&export=download"
            },
            "Episode 08": {
                size: "936 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1SpnvCZsVoYudMkF4Mlnf7oX4g11k-kyE&export=download"
            }
        }
    },
    {
        id: 47,
        title: "Alice in Borderland (Season 2)",
        year: 2022,
        duration: "8 x 50 min",
        rating: 7.7,
        genres: ["Drama", "Thriller", "Sci-Fi", "Survival", "TV Series"],
        director: "Shinsuke Sato",
        cast: ["Kento Yamazaki", "Tao Tsuchiya", "Nijirô Murakami", "Aya Asahina", "Dôri Sakurada"],
        synopsis: "Arisu and his friends continue to fight for survival in the deadly games of Borderland, facing even more dangerous challenges and uncovering deeper mysteries.",
        poster: "assets/posters/alice-in-borderland-S2.jpg",
        trailer: "1ifgEQCevYc",
        type: "tv",
        qualities: {
            "Episode 01": {
                size: "763 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1jrYtC9DDtoX3XFDGyf2HJWs8cY4oEDCO&export=download"
            },
            "Episode 02": {
                size: "818 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=19CzU_o9MinVTVC10UserBpTZqhQY-0pZ&export=download"
            },
            "Episode 03": {
                size: "696 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1-vc0Kgq9Iu9TzoQnaLqjnPzUHbiL7Hj2&export=download"
            },
            "Episode 04": {
                size: "663 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1_xECrbsDVjJnGF1twAb2Ha_uGEDZwoGi&export=download"
            },
            "Episode 05": {
                size: "1.0 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1WEC4rS_BLNUiALCqoPGo8AK5ecJifRcz&export=download"
            },
            "Episode 06": {
                size: "910 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1IXVmsnCqfTWNc-iE_B4zg1MKXcM0LqtX&export=download"
            },
            "Episode 07": {
                size: "1.0 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1Vp3kkEfKUB2YwCq68F1GE8G1xbzsZTmE&export=download"
            },
            "Episode 08": {
                size: "951 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1zbu6P-YU3fsbhYw-Io-Dl4PYRWJs6KGN&export=download"
            }
        }
    },
    {
        id: 48,
        title: "Dora And The Search For Sol Dorado",
        year: 2025,
        duration: "98 min",
        rating: 5.5, // Update if IMDb rating available
        genres: ["Adventure", "Family", "Animation"],
        director: "Alberto Belli", // Update if director info available
        cast: ["Samantha Lorraine","Jacob Rodriguez","Daniella Pineda","Gabriel Iglesias"], // Update if cast info available
        synopsis: "Dora embarks on a new adventure to find the legendary city of Sol Dorado, facing new challenges and making new friends along the way.",
        poster: "assets/posters/dora-and-the-search-for-sol-dorado.jpg",
        trailer: "92nh9E3B0do", // Add trailer key if available
        qualities: {
            "1080p": {
                size: "1.6 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1fEWJgz0PhSzvMa--7XPZa8FTgvgykvcy&export=download"
            },
            "4K": {
                size: "4.3 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1SOResDWDVZQpnab582bK9LCJepaeHYu8&export=download"
            }
        }
    },
    {
        id: 49,
        title: "How to Train Your Dragon",
        year: 2025,
        duration: "125 min",
        rating: 8.1, // Update if IMDb rating available
        genres: ["Animation", "Adventure", "Family"],
        director: "Dean DeBlois", // Update if director info available
        cast: ["Mason Thames","Nico Parker","Gerard Butler","Julian Dennison","Nick Frost", "Bronwyn James" ,"Ruth Codd", "Gabriel Howell"], // Update if cast info available
        synopsis: "A new adventure in the How to Train Your Dragon universe. Hiccup and Toothless return for another epic journey.",
        poster: "assets/posters/how-to-train-your-dragon-2025.jpg",
        trailer: "22w7z_lT6YM", // Add trailer key if available
        qualities: {
            "480p": {
                size: "552 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1pqzT_hpbDlSEDEFVC6puYCRScRNOgbtw&export=download"
            },
            "720p": {
                size: "847 MB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1bDtDdsuGAGKYwNrVvh0HGZSpxX21qx3i&export=download"
            },
            "1080p": {
                size: "2.4 GB",
                downloadLink: "https://drive.usercontent.google.com/download?id=1KWWGqA5ZNSBWBB0is7jnxhm8OlHlKuRs&export=download"
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
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (this.dataset.type === 'tv') {
                currentGenre = null;
                window.currentTypeFilter = 'tv';
            } else {
                currentGenre = this.dataset.genre;
                window.currentTypeFilter = null;
            }
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
        // TV Series filter
        if (window.currentTypeFilter === 'tv') {
            if (!(movie.type === 'tv' || (movie.genres && movie.genres.map(g => g.toLowerCase()).includes('tv series')))) {
                return false;
            }
        }
        // Genre filter
        const genreMatch = !window.currentTypeFilter && (currentGenre === 'all' || 
            movie.genres.map(g => g.toLowerCase()).includes(currentGenre));
        // Search filter
        const searchMatch = !searchTerm || 
            movie.title.toLowerCase().includes(searchTerm) ||
            movie.director.toLowerCase().includes(searchTerm) ||
            movie.cast.some(actor => actor.toLowerCase().includes(searchTerm)) ||
            movie.genres.some(genre => genre.toLowerCase().includes(searchTerm));
        return (window.currentTypeFilter === 'tv' ? true : genreMatch) && searchMatch;
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
            <div class="quality-option" onclick="downloadMovie('${info.downloadLink}', '${movie.title}', ${quality}, ${movie.id})">
                <div class="quality-label">${quality}</div>
                <div class="quality-size">${info.size}</div>
                <i class="fas fa-download"></i>
            </div>
        `).join('');
    }
    
    // Setup trailer button
    const trailerBtn = document.getElementById('trailerBtn');
    if (trailerBtn && movie.trailer) {
        trailerBtn.onclick = () => {
            console.log('Trailer button clicked for:', movie.title, 'Trailer ID:', movie.trailer);
            openTrailerModal(movie.trailer);
        };
        trailerBtn.style.display = 'inline-flex';
        console.log('Trailer button setup for:', movie.title);
    } else if (trailerBtn) {
        trailerBtn.style.display = 'none';
        console.log('No trailer available for:', movie.title);
    }

    // Setup Watch Now button (open highest quality in Google Drive viewer or episode picker for TV shows)
    const watchNowBtn = document.getElementById('watchNowBtn');
    const episodePicker = document.getElementById('episodePicker'); // Add this div in your modal HTML if not present
    if (watchNowBtn) {
        // Detect if this is a TV show (qualities keys look like 'Episode 01', etc.)
        const isTVShow = Object.keys(movie.qualities).some(key => key.toLowerCase().includes('episode'));
        
        console.log('Setting up Watch Now button for:', movie.title, 'Is TV Show:', isTVShow);
        
        if (isTVShow) {
            watchNowBtn.onclick = () => {
                console.log('Watch Now clicked for TV show:', movie.title);
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
                        ${(() => {
                            return Object.entries(movie.qualities).map(([ep, info], idx) => {
                                return `<button class="episode-btn" data-episode="${ep.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}">${ep}</button>`;
                            }).join('');
                        })()}
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
                                console.log('Episode button clicked:', this.getAttribute('data-episode'));
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
            let bestQualityKey = null;
            for (const q of qualityOrder) {
                if (movie.qualities[q]) {
                    bestQuality = movie.qualities[q];
                    bestQualityKey = q;
                    break;
                }
            }
            // If no preferred quality found, pick the first available
            if (!bestQuality) {
                const firstKey = Object.keys(movie.qualities)[0];
                bestQuality = movie.qualities[firstKey];
                bestQualityKey = firstKey;
            }
            
            console.log('Best quality found for', movie.title, ':', bestQualityKey, bestQuality);
            
            if (bestQuality && bestQuality.downloadLink) {
                // Extract Google Drive file ID
                const match = bestQuality.downloadLink.match(/id=([^&]+)/);
                const fileId = match ? match[1] : null;
                
                console.log('File ID extracted:', fileId);
                
                if (fileId) {
                    watchNowBtn.onclick = () => {
                        console.log('Watch Now clicked for movie:', movie.title, 'Quality:', bestQualityKey);
                        openMovieViewer(movie, bestQuality, fileId);
                    };
                    watchNowBtn.style.display = 'inline-flex';
                } else {
                    console.error('Could not extract file ID from:', bestQuality.downloadLink);
                    watchNowBtn.onclick = null;
                    watchNowBtn.style.display = 'none';
                }
            } else {
                console.error('No quality/download link found for:', movie.title);
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
    
    // Increment download counter FIRST
    if (movieId) {
        try {
            console.log('Incrementing download counter for movie ID:', movieId);
            const newCount = await incrementDownloadCount(movieId);
            console.log(`Download count updated to: ${newCount} for ${movieTitle}`);
        } catch (error) {
            console.error('Error updating download count:', error);
        }
    }
    
    // Then proceed with download
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
    
    console.log('Download initiated for:', movieTitle);
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
        console.log('Setting up real-time download listener...');
        const docRef = db.collection('downloadCounts').doc('movies');
        
        docRef.onSnapshot((doc) => {
            if (doc.exists) {
                const newCounts = doc.data();
                console.log('Real-time update received:', newCounts);
                
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
                            console.log(`Updated ${movie.title} download count to ${newCounts[key]}`);
                            // Update individual movie display immediately
                            updateDownloadCountDisplay(movieId);
                        }
                    }
                });
                
                // Update display if there were changes
                if (hasChanges) {
                    console.log('Download counts updated from real-time listener');
                    // Force refresh of the movie grid
                    const moviesGrid = document.getElementById('moviesGrid');
                    if (moviesGrid && currentMovies) {
                        displayMovies(currentMovies, moviesGrid);
                    }
                }
            } else {
                console.log('No download counts document found in real-time listener');
            }
        }, (error) => {
            console.error('Error listening to download counts:', error);
        });
        
        console.log('Real-time listener setup complete');
    } else {
        console.log('No Firebase database available for real-time listener');
    }
}

// Debug function to test Firebase connection
function testFirebaseConnection() {
    console.log('=== FIREBASE CONNECTION TEST ===');
    console.log('Firebase available:', typeof firebase !== 'undefined');
    console.log('Database initialized:', !!db);
    console.log('Download counts:', downloadCounts);
    
    if (db) {
        // Test reading from Firebase
        db.collection('downloadCounts').doc('movies').get()
            .then((doc) => {
                if (doc.exists) {
                    console.log('Firebase data:', doc.data());
                } else {
                    console.log('No document found in Firebase');
                }
            })
            .catch((error) => {
                console.error('Firebase read error:', error);
            });
    }
}

// Call test function after DOM loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(testFirebaseConnection, 2000);
});

// Handle image errors by showing a placeholder
function handleImageError(img) {
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjMzMzIi8+CjxwYXRoIGQ9Ik0xNTAgMjI1TDEyNSAyMDBMMTc1IDIwMEwxNTAgMjI1WiIgZmlsbD0iIzU1NSIvPgo8Y2lyY2xlIGN4PSIxNTAiIGN5PSIxODAiIHI9IjE1IiBmaWxsPSIjNTU1Ii8+CjxyZWN0IHg9IjEwMCIgeT0iMjUwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjNTU1Ii8+CjxyZWN0IHg9IjEyMCIgeT0iMjgwIiB3aWR0aD0iNjAiIGhlaWdodD0iMTUiIGZpbGw9IiM1NTUiLz4KPC9zdmc+';
    img.alt = 'Movie poster not available';
    img.style.opacity = '0.6';
}

// Open trailer modal
function openTrailerModal(trailerUrl) {
    const trailerModal = document.getElementById('trailerModal');
    const trailerIframe = document.getElementById('trailerFrame'); // Updated ID to match HTML
    
    if (trailerModal && trailerIframe) {
        // Construct YouTube embed URL
        const embedUrl = `https://www.youtube.com/embed/${trailerUrl}?autoplay=1&rel=0&modestbranding=1`;
        trailerIframe.src = embedUrl;
        trailerModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Add fade-in animation
        trailerModal.style.opacity = '0';
        setTimeout(() => {
            trailerModal.style.opacity = '1';
            trailerModal.style.transition = 'opacity 0.3s ease';
        }, 10);
        
        console.log('Trailer modal opened with URL:', embedUrl);
    } else {
        console.error('Trailer modal elements not found:', {
            trailerModal: !!trailerModal,
            trailerIframe: !!trailerIframe
        });
    }
}

// Close trailer modal
function closeTrailerModal() {
    const trailerModal = document.getElementById('trailerModal');
    const trailerIframe = document.getElementById('trailerFrame'); // Updated ID to match HTML
    
    if (trailerModal) {
        // Add fade-out animation
        trailerModal.style.opacity = '0';
        setTimeout(() => {
            trailerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Stop the video
            if (trailerIframe) {
                trailerIframe.src = '';
            }
        }, 300);
        
        console.log('Trailer modal closed');
    }
}

// Show episode picker with animation
function showEpisodePicker() {
    const episodePicker = document.getElementById('episodePicker');
    if (episodePicker) {
        episodePicker.style.display = 'block';
        episodePicker.style.opacity = '0';
        episodePicker.style.transform = 'translateY(-20px)';
        
        // Force reflow
        episodePicker.offsetHeight;
        
        episodePicker.classList.add('show');
        episodePicker.style.transition = 'all 0.3s ease';
        episodePicker.style.opacity = '1';
        episodePicker.style.transform = 'translateY(0)';
    }
}

// Hide episode picker with animation
function hideEpisodePicker() {
    const episodePicker = document.getElementById('episodePicker');
    if (episodePicker && episodePicker.classList.contains('show')) {
        episodePicker.style.opacity = '0';
        episodePicker.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            episodePicker.classList.remove('show');
            episodePicker.style.display = 'none';
        }, 300);
    }
}

// Open movie viewer
function openMovieViewer(movie, quality, fileId) {
    const movieViewerModal = document.getElementById('movieViewerModal');
    const movieViewerIframe = document.getElementById('movieViewerFrame'); // Updated ID to match HTML
    const movieViewerTitle = document.getElementById('viewerMovieTitle'); // Updated ID to match HTML
    const movieViewerYear = document.getElementById('viewerMovieYear'); // Add this line
    
    if (movieViewerModal && movieViewerIframe) {
        // Set title and year
        if (movieViewerTitle) {
            movieViewerTitle.textContent = `${movie.title}`;
        }
        if (movieViewerYear) {
            movieViewerYear.textContent = movie.year;
        }
        // Create Google Drive viewer URL
        const viewerUrl = `https://drive.google.com/file/d/${fileId}/preview`;
        movieViewerIframe.src = viewerUrl;
        movieViewerModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        // Add fade-in animation
        movieViewerModal.style.opacity = '0';
        setTimeout(() => {
            movieViewerModal.style.opacity = '1';
            movieViewerModal.style.transition = 'opacity 0.3s ease';
        }, 10);
        
        console.log('Movie viewer opened with URL:', viewerUrl);
    } else {
        console.error('Movie viewer elements not found:', {
            movieViewerModal: !!movieViewerModal,
            movieViewerIframe: !!movieViewerIframe,
            movieViewerTitle: !!movieViewerTitle
        });
    }
}

// Open movie viewer by episode
function openMovieViewerByEpisode(movieId, episodeName) {
    const movie = moviesDatabase.find(m => m.id === movieId);
    if (!movie || !movie.qualities[episodeName]) return;
    
    const quality = movie.qualities[episodeName];
    const match = quality.downloadLink.match(/id=([^&]+)/);
    const fileId = match ? match[1] : null;
    
    if (fileId) {
        // Hide episode picker first
        hideEpisodePicker();
        
        // Delay opening viewer to allow picker to close
        setTimeout(() => {
            openMovieViewer(movie, quality, fileId);
        }, 300);
    }
}

// Close movie viewer
function closeMovieViewer() {
    const movieViewerModal = document.getElementById('movieViewerModal');
    const movieViewerIframe = document.getElementById('movieViewerFrame'); // Updated ID to match HTML
    
    if (movieViewerModal) {
        // Add fade-out animation
        movieViewerModal.style.opacity = '0';
        setTimeout(() => {
            movieViewerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Stop the video
            if (movieViewerIframe) {
                movieViewerIframe.src = '';
            }
        }, 300);
        
        console.log('Movie viewer closed');
    }
}

// Update all download counts in the UI
function updateAllDownloadCounts() {
    moviesDatabase.forEach(movie => {
        updateDownloadCountDisplay(movie.id);
    });
}

// Enhanced download count display update
function updateDownloadCountDisplay(movieId) {
    const movie = moviesDatabase.find(m => m.id === movieId);
    if (!movie) {
        console.log('Movie not found for ID:', movieId);
        return;
    }
    
    movieCards.forEach(card => {
        const onclickStr = card.getAttribute('onclick');
        if (onclickStr && onclickStr.includes(`openMovieModal(${movieId})`)) {
            const downloadStats = card.querySelector('.download-stats span');
            if (downloadStats) {
                const newText = `${movie.downloadCount || 0} downloads`;
                if (downloadStats.textContent !== newText) {
                    console.log(`Updating card display for ${movie.title}: ${newText}`);
                    // Add animation for count update
                    downloadStats.style.transform = 'scale(1.2)';
                    downloadStats.style.color = '#00ff88';
                    downloadStats.style.transition = 'all 0.3s ease';
                    downloadStats.textContent = newText;
                    
                    setTimeout(() => {
                        downloadStats.style.transform = 'scale(1)';
                        downloadStats.style.color = '';
                    }, 500);
                } else {
                    downloadStats.textContent = newText;
                }
            }
        }
    });
}

// Add CSS animations dynamically if not present
function addMissingStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .quality-section-highlight {
            animation: highlightPulse 1.2s ease-in-out;
            border: 2px solid #00ff88 !important;
        }
        
        @keyframes highlightPulse {
            0%, 100% { 
                border-color: #00ff88;
                box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.7);
            }
            50% { 
                border-color: #00ff88;
                box-shadow: 0 0 0 10px rgba(0, 255, 136, 0);
            }
        }
        
        .movie-card:hover {
            transform: translateY(-5px);
            transition: transform 0.3s ease;
        }
        
        .quality-option:hover {
            transform: scale(1.05);
            transition: transform 0.2s ease;
        }
        
        .episode-btn {
            transition: all 0.2s ease;
        }
        
        .episode-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        #episodePicker.show {
            display: block !important;
        }
        
        .download-stats {
            transition: all 0.2s ease;
        }
    `;
    document.head.appendChild(style);
}

// Initialize missing styles when DOM loads
document.addEventListener('DOMContentLoaded', addMissingStyles);


