// Configuration file for movie data and Google Drive links
// Replace the placeholder file IDs with your actual Google Drive file IDs

const movieData = {
    'warfare-2025': {
        title: 'Warfare (2025)',
        year: '2025',
        duration: '108 min',
        rating: '⭐ 7.8/10',
        director: 'Ray Mendoza, Alex Ranarivelo',
        cast: 'Will Price, Johnny Strong, Paulina Gálvez, Mike Manning',
        genre: 'Action, Drama, Thriller, War',
        description: 'A group of US Navy SEALs embark on a secret mission to rescue a kidnapped CIA agent, but the mission goes sideways when they discover the agent has been moved to a fortified enemy compound deep in hostile territory. With time running out and enemy forces closing in, the SEALs must use all their training and courage to complete the mission and get out alive.',
        poster: 'https://images.unsplash.com/photo-1489599512485-1c11566e2cc7?w=400&h=600&fit=crop&crop=center',
        downloads: {
            // Replace these with your actual Google Drive file IDs
            // To get file ID: Right-click file in Google Drive > Get Link > Copy the ID from the URL
            // Example: https://drive.google.com/file/d/1ABC123xyz/view?usp=sharing -> File ID is "1ABC123xyz"
            
            '480p': 'YOUR_480P_FILE_ID_HERE',     // ~300MB - Replace with actual file ID
            '720p': 'YOUR_720P_FILE_ID_HERE',     // ~750MB - Replace with actual file ID  
            '1080p': 'YOUR_1080P_FILE_ID_HERE',   // ~1.5GB - Replace with actual file ID
            'subtitles': 'YOUR_SUBTITLE_FILE_ID_HERE' // ~128KB - Replace with actual file ID
        }
    },
    
    // Template for adding more movies
    'movie-template': {
        title: 'Movie Title (Year)',
        year: '2025',
        duration: '120 min', 
        rating: '⭐ 8.5/10',
        director: 'Director Name',
        cast: 'Actor 1, Actor 2, Actor 3, Actor 4',
        genre: 'Action, Drama, Thriller',
        description: 'Your movie description here. Make it engaging and informative to attract viewers.',
        poster: 'https://example.com/poster.jpg', // Use a movie poster URL
        downloads: {
            '480p': 'FILE_ID_480P',
            '720p': 'FILE_ID_720P', 
            '1080p': 'FILE_ID_1080P',
            'subtitles': 'FILE_ID_SUBTITLES'
        }
    }
};

// Function to generate Google Drive direct download links
function getDownloadLink(fileId) {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

// Process movie data to include direct download links
function processMovieData() {
    Object.keys(movieData).forEach(movieKey => {
        const movie = movieData[movieKey];
        if (movie.downloads) {
            Object.keys(movie.downloads).forEach(quality => {
                const fileId = movie.downloads[quality];
                if (fileId && !fileId.includes('YOUR_') && !fileId.includes('FILE_ID_')) {
                    movie.downloads[quality] = getDownloadLink(fileId);
                }
            });
        }
    });
}

// Initialize processed movie data
processMovieData();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { movieData };
}
