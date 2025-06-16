# FileVault - Movie Download Center

A beautiful, modern web application for sharing and downloading movies from Google Drive with multiple quality options.

## Features

🎬 **Movie Gallery** - Beautiful poster-based browsing
📱 **Responsive Design** - Works on all devices
🔍 **Search & Filter** - Find movies by title, director, cast, or genre
⭐ **Movie Details** - Ratings, cast, director, synopsis
📺 **Watch Now** - Direct Google Drive streaming
⬇️ **Multi-Quality Downloads** - 4K, 1080p, 720p, 480p options
🎨 **Modern UI** - Beautiful gradients and animations

## Setup Instructions

### 1. Google Drive Setup

1. **Upload your movies** to Google Drive
2. **Get shareable links** for each quality version:
   - Right-click on file → Get link → Anyone with the link can view
   - Copy the link (format: `https://drive.google.com/file/d/FILE_ID/view`)

3. **Extract File IDs** from the links:
   - From: `https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74mHmrEqpUBb/view`
   - File ID: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74mHmrEqpUBb`

### 2. Update Movie Database

Edit `script.js` and update the `moviesDatabase` array with your movies:

```javascript
{
    id: 1,
    title: "Your Movie Title",
    year: 2023,
    duration: "120 min",
    rating: 8.5,
    genres: ["Action", "Thriller"],
    director: "Director Name",
    cast: ["Actor 1", "Actor 2", "Actor 3"],
    synopsis: "Movie description...",
    poster: "https://your-poster-url.jpg",
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
        // Add more qualities as needed
    }
}
```

### 3. Get Movie Posters

You can use:
- **TMDB API** - Free movie database with posters
- **Unsplash** - Stock photos (current placeholder)
- **Your own hosted images**

### 4. Deploy

You can deploy this to:
- **GitHub Pages** (free)
- **Netlify** (free)
- **Vercel** (free)
- **Your own web server**

## File Structure

```
download_site/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── README.md           # This file
└── config.example.js   # Example configuration
```

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #ff6b6b;
    --secondary-color: #667eea;
    --accent-color: #feca57;
}
```

### Movie Categories
Add new genres in the filter section of `index.html`:
```html
<button class="filter-btn" data-genre="horror">Horror</button>
```

### Branding
- Update the logo and site name in `index.html`
- Replace "FileVault" with your brand name
- Add your own favicon

## Google Drive Link Formats

**For Viewing (Watch Now):**
```
https://drive.google.com/file/d/FILE_ID/view
```

**For Direct Download:**
```
https://drive.google.com/uc?export=download&id=FILE_ID
```

## Tips

1. **File Naming**: Use consistent naming for different qualities
   - `Movie_Name_4K.mp4`
   - `Movie_Name_1080p.mp4`
   - `Movie_Name_720p.mp4`

2. **Folder Organization**: Keep files organized in Google Drive folders

3. **Poster Quality**: Use high-quality posters (300x450px recommended)

4. **File Sizes**: Provide accurate file sizes for user convenience

## Security Notes

- Google Drive links are public when shared
- Consider using Google Drive API for better control
- Monitor usage to avoid quota limits
- Regular backup of your Google Drive content

## Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## License

This project is for educational and personal use. Ensure you have proper rights to distribute any content.
