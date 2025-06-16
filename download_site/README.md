# CineHub - Movie Download Center

A beautiful, modern movie download center that integrates with Google Drive to provide high-quality movie downloads with multiple quality options.

## Features

- 🎬 **Beautiful Movie Cards** - Stunning movie posters and information
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔥 **Most Wanted Section** - Highlight popular movies
- ⭐ **Movie Details** - Ratings, cast, director, genre information
- 📥 **Multiple Quality Options** - 480p, 720p, 1080p downloads
- 📄 **Subtitle Support** - SRT file downloads
- 🎨 **Modern UI** - Netflix-inspired design with smooth animations
- 🚀 **Fast Loading** - Optimized performance

## Setup Instructions

### 1. Google Drive Setup

To make your Google Drive files downloadable:

1. Make sure your Google Drive folder is set to "Anyone with the link can view"
2. For each file, get the file ID from the Google Drive URL
3. Update the `config.js` file with your actual file IDs

### 2. Getting Google Drive File IDs

From a Google Drive file URL like:
```
https://drive.google.com/file/d/1ABC123xyz/view?usp=sharing
```
The file ID is: `1ABC123xyz`

### 3. Update Configuration

Edit the `config.js` file and replace the placeholder IDs with your actual Google Drive file IDs:

```javascript
// Example:
'480p': '1ABC123xyz789',  // Replace with actual file ID
'720p': '1DEF456abc012',  // Replace with actual file ID
'1080p': '1GHI789def345', // Replace with actual file ID
'subtitles': '1JKL012ghi678' // Replace with actual file ID
```

### 4. Adding More Movies

To add more movies, simply:

1. Add movie data to the `movieData` object in `config.js`
2. Add a new movie card to the HTML
3. Include movie poster, ratings, cast, and download links

## File Structure

```
download_site/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── config.js           # Configuration file (create this)
└── README.md           # This file
```

## Configuration Template

Create a `config.js` file with your movie data:

```javascript
const movieData = {
    'warfare-2025': {
        title: 'Warfare (2025)',
        year: '2025',
        duration: '108 min',
        rating: '⭐ 7.8/10',
        director: 'Your Director Name',
        cast: 'Actor 1, Actor 2, Actor 3',
        genre: 'Action, Drama, Thriller',
        description: 'Movie description here...',
        poster: 'https://example.com/poster.jpg',
        downloads: {
            '480p': 'YOUR_480P_FILE_ID',
            '720p': 'YOUR_720P_FILE_ID', 
            '1080p': 'YOUR_1080P_FILE_ID',
            'subtitles': 'YOUR_SUBTITLE_FILE_ID'
        }
    }
    // Add more movies here...
};
```

## Customization

### Colors
Update the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #e50914;    /* Main brand color */
    --secondary-color: #221f1f;  /* Secondary color */
    --accent-color: #f5c518;     /* Accent color */
}
```

### Adding New Movies
1. Add movie data to `movieData` in `config.js`
2. Add HTML movie card to `index.html`
3. Movie will automatically work with the existing functionality

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

This project is open source and available under the MIT License.

## Support

For support or questions, please create an issue or contact the developer.

---

**Note**: Make sure to respect copyright laws when sharing movie files. Only share content you have the rights to distribute.
