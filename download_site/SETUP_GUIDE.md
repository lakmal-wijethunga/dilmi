# 🎬 Setup Guide for Your Movie Download Center

## Quick Setup Instructions

### Step 1: Get Your Google Drive File IDs

1. **Open your Google Drive folder**: https://drive.google.com/drive/folders/16dCsLJVRCvGkET1FnwqH9A7tfn9F8Dly?usp=sharing

2. **For each movie file, get the File ID**:
   - Right-click on the file → "Get link"
   - Copy the link, it will look like: `https://drive.google.com/file/d/1ABC123xyz789/view?usp=sharing`
   - The File ID is the part between `/d/` and `/view`: `1ABC123xyz789`

3. **Based on your folder, you need IDs for**:
   - `Warfare (2025) 480P.mp4`
   - `Warfare.2025.720p.WEB-DL.x264.750MB-Pahe.in.mkv`
   - `Warfare.2025.1080p.WEB-DL.x264.6CH-Pahe.in.mkv`
   - `Warfare.2025.480p.WEB-DL 720P Cineru.lk.srt` (subtitle file)

### Step 2: Update config.js

Open `config.js` file and replace the placeholder text:

**Replace:**
```javascript
'480p': 'YOUR_480P_FILE_ID_HERE',
'720p': 'YOUR_720P_FILE_ID_HERE', 
'1080p': 'YOUR_1080P_FILE_ID_HERE',
'subtitles': 'YOUR_SUBTITLE_FILE_ID_HERE'
```

**With your actual file IDs:**
```javascript
'480p': '1ABC123xyz789',     // Your actual 480p file ID
'720p': '1DEF456abc012',     // Your actual 720p file ID
'1080p': '1GHI789def345',    // Your actual 1080p file ID
'subtitles': '1JKL012ghi678' // Your actual subtitle file ID
```

### Step 3: Make Files Publicly Accessible

For each file in your Google Drive:
1. Right-click → "Share"
2. Change to "Anyone with the link"
3. Set permission to "Viewer"
4. Click "Done"

### Step 4: Test Your Site

1. Open `index.html` in your browser
2. Click on the "Warfare (2025)" movie card
3. Try downloading different quality options
4. Verify all download links work

## 🎨 Customization Options

### Adding New Movies

1. **Add movie data to `config.js`**:
```javascript
'your-new-movie': {
    title: 'Your Movie Title (2025)',
    year: '2025',
    duration: '120 min',
    rating: '⭐ 8.5/10',
    director: 'Director Name',
    cast: 'Actor 1, Actor 2, Actor 3',
    genre: 'Action, Comedy, Drama',
    description: 'Your movie description here...',
    poster: 'https://your-poster-url.jpg',
    downloads: {
        '480p': 'YOUR_FILE_ID_480P',
        '720p': 'YOUR_FILE_ID_720P',
        '1080p': 'YOUR_FILE_ID_1080P',
        'subtitles': 'YOUR_SUBTITLE_FILE_ID'
    }
}
```

2. **Add movie card to HTML** (in the movie-grid section):
```html
<div class="movie-card" data-movie="your-new-movie">
    <div class="movie-poster">
        <img src="your-poster-url.jpg" alt="Your Movie Title">
        <div class="movie-overlay">
            <button class="play-btn" onclick="openMovieModal('your-new-movie')">
                <i class="fas fa-play"></i>
            </button>
        </div>
    </div>
    <div class="movie-info">
        <h3>Your Movie Title (2025)</h3>
        <div class="movie-meta">
            <span class="rating">
                <i class="fas fa-star"></i>
                8.5/10
            </span>
            <span class="genre">Action, Comedy</span>
        </div>
        <p class="movie-description">
            Your movie description here...
        </p>
        <div class="quality-badges">
            <span class="quality-badge">480p</span>
            <span class="quality-badge">720p</span>
            <span class="quality-badge">1080p</span>
        </div>
    </div>
</div>
```

### Changing Colors/Theme

Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #e50914;    /* Netflix red - change to your brand color */
    --secondary-color: #221f1f;  /* Dark gray */
    --accent-color: #f5c518;     /* IMDB yellow */
}
```

### Adding Your Logo

Replace the logo section in `index.html`:
```html
<div class="logo">
    <img src="your-logo.png" alt="Your Logo" style="height: 40px;">
    <span>Your Site Name</span>
</div>
```

## 🚀 Deployment Options

### Option 1: GitHub Pages (Free)
1. Create a GitHub repository
2. Upload all files
3. Enable GitHub Pages in repository settings
4. Your site will be available at: `https://yourusername.github.io/repository-name`

### Option 2: Netlify (Free)
1. Drag and drop your folder to Netlify.com
2. Your site will be live instantly with a custom URL

### Option 3: Your Own Web Hosting
1. Upload all files to your web hosting provider
2. Point your domain to the folder

## 📱 Features Included

✅ **Responsive Design** - Works on all devices  
✅ **Modern UI** - Netflix-inspired interface  
✅ **Multiple Quality Options** - 480p, 720p, 1080p  
✅ **Subtitle Support** - SRT file downloads  
✅ **Movie Information** - Ratings, cast, director  
✅ **Search Ready** - Easy to add search functionality  
✅ **Analytics Ready** - Google Analytics integration ready  
✅ **Fast Loading** - Optimized performance  
✅ **SEO Friendly** - Search engine optimized  

## 🔧 Troubleshooting

**Downloads not working?**
- Check if Google Drive files are set to "Anyone with the link"
- Verify file IDs are correct in config.js
- Make sure files are not moved or deleted from Google Drive

**Site looks broken?**
- Check if all files are in the same folder
- Verify CSS and JS files are loading (check browser console)
- Make sure config.js is loaded before script.js

**Want to add more features?**
- Movie search functionality
- User ratings and reviews
- Movie categories/genres
- Advanced filtering options
- User accounts and watchlists

Need help? Create an issue or contact support!
