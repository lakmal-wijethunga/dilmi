// Configuration file for Google Drive Integration
// Copy this to config.js and update with your actual Google Drive file IDs

// Example of how to structure your movie data for your Google Drive folder
const movieTemplate = {
    id: 1,
    title: "Your Movie Title",
    year: 2023,
    duration: "120 min",
    rating: 8.5,
    genres: ["Action", "Thriller"],
    director: "Director Name",
    cast: ["Actor 1", "Actor 2", "Actor 3", "Actor 4"],
    synopsis: "Detailed movie description that will appear in the modal...",
    poster: "https://image-url.jpg", // Use TMDB, IMDB, or your own hosted images
    qualities: {
        "4K": { 
            size: "8.5 GB", 
            link: "https://drive.google.com/file/d/YOUR_4K_FILE_ID/view",
            downloadLink: "https://drive.google.com/uc?export=download&id=YOUR_4K_FILE_ID"
        },
        "1080p": { 
            size: "4.2 GB", 
            link: "https://drive.google.com/file/d/YOUR_1080P_FILE_ID/view",
            downloadLink: "https://drive.google.com/uc?export=download&id=YOUR_1080P_FILE_ID"
        },
        "720p": { 
            size: "2.1 GB", 
            link: "https://drive.google.com/file/d/YOUR_720P_FILE_ID/view",
            downloadLink: "https://drive.google.com/uc?export=download&id=YOUR_720P_FILE_ID"
        },
        "480p": { 
            size: "1.2 GB", 
            link: "https://drive.google.com/file/d/YOUR_480P_FILE_ID/view",
            downloadLink: "https://drive.google.com/uc?export=download&id=YOUR_480P_FILE_ID"
        }
    }
};

// How to get Google Drive File IDs:
// 1. Right-click on your file in Google Drive
// 2. Select "Get link" or "Share"
// 3. Set permission to "Anyone with the link can view"
// 4. Copy the link - it will look like:
//    https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74mHmrEqpUBb/view?usp=sharing
// 5. Extract the FILE_ID (the long string between /d/ and /view):
//    1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74mHmrEqpUBb

// TMDB (The Movie Database) API for getting movie information
// Sign up at https://www.themoviedb.org/settings/api for free API key
const tmdbConfig = {
    apiKey: "YOUR_TMDB_API_KEY",
    baseUrl: "https://api.themoviedb.org/3",
    imageBaseUrl: "https://image.tmdb.org/t/p/w500"
};

// Example function to fetch movie data from TMDB
function fetchMovieFromTMDB(movieTitle) {
    // This is an example - you can implement this to auto-populate movie data
    const searchUrl = `${tmdbConfig.baseUrl}/search/movie?api_key=${tmdbConfig.apiKey}&query=${encodeURIComponent(movieTitle)}`;
    
    // Use fetch to get movie data and auto-populate the movie object
    // This can help you quickly get posters, cast, ratings, etc.
}

// Sample movies based on your Google Drive folder
// Replace these with your actual movies and Google Drive file IDs
const yourMoviesDatabase = [
    {
        id: 1,
        title: "Movie from your Google Drive",
        year: 2023,
        duration: "120 min",
        rating: 8.5,
        genres: ["Action", "Adventure"],
        director: "Director Name",
        cast: ["Actor 1", "Actor 2", "Actor 3"],
        synopsis: "Description of your movie...",
        poster: "https://your-poster-url.jpg",
        qualities: {
            "4K": { 
                size: "8.5 GB", 
                // Replace these with your actual Google Drive file IDs
                link: "https://drive.google.com/file/d/16dCsLJVRCvGkET1FnwqH9A7tfn9F8Dly/view",
                downloadLink: "https://drive.google.com/uc?export=download&id=16dCsLJVRCvGkET1FnwqH9A7tfn9F8Dly"
            },
            "1080p": { 
                size: "4.2 GB", 
                link: "https://drive.google.com/file/d/ANOTHER_FILE_ID/view",
                downloadLink: "https://drive.google.com/uc?export=download&id=ANOTHER_FILE_ID"
            }
            // Add more qualities as needed
        }
    }
    // Add more movies here...
];

// Quality configuration
const qualitySettings = {
    "4K": {
        label: "4K Ultra HD",
        description: "2160p - Best Quality",
        icon: "👑"
    },
    "1080p": {
        label: "Full HD",
        description: "1080p - High Quality",
        icon: "🎬"
    },
    "720p": {
        label: "HD",
        description: "720p - Good Quality",
        icon: "📺"
    },
    "480p": {
        label: "SD",
        description: "480p - Standard Quality",
        icon: "📱"
    }
};
