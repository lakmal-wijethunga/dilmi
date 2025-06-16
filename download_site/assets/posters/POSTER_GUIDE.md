# 🎬 Movie Poster Management Guide

## 📁 Folder Structure
```
assets/
└── posters/
    ├── warfare.svg (placeholder - replace with warfare.jpg)
    ├── README.txt (this guide)
    └── [your-movie-posters.jpg]
```

## 🖼️ Adding Movie Posters

### 1. **Image Requirements**
- **Format**: JPG, JPEG, PNG, or WebP
- **Dimensions**: 300x450px (2:3 aspect ratio recommended)
- **File Size**: Under 200KB for optimal loading
- **Quality**: High resolution but web-optimized

### 2. **Naming Convention**
Use lowercase, replace spaces with dashes:
- `warfare.jpg` ✅
- `action-movie.jpg` ✅
- `the-dark-knight.jpg` ✅
- `Movie Title.JPG` ❌

### 3. **Where to Get Posters**
- **TMDB (The Movie Database)**: https://www.themoviedb.org/
- **IMDB**: https://www.imdb.com/
- **Google Images** (ensure proper licensing)
- **Official movie websites**

### 4. **Adding Posters to Your Movies**

#### Method 1: Update script.js
```javascript
{
    title: "Your Movie Title",
    // ...other properties...
    poster: "assets/posters/your-movie-title.jpg"
}
```

#### Method 2: Use Setup Helper
1. Open `setup.html` in browser
2. Fill in movie details
3. Set poster URL to: `assets/posters/movie-name.jpg`
4. Generate code and paste into script.js

### 5. **Current Movies Setup**
- **Warfare (2025)**: Currently using placeholder `warfare.svg`
  - Replace with: `warfare.jpg`
  - Update script.js poster path to: `"assets/posters/warfare.jpg"`

### 6. **Fallback System**
If poster fails to load, the system automatically shows:
- Custom SVG placeholder with movie title
- "No Poster Available" message
- Consistent design with your site theme

### 7. **Optimization Tips**
- **Compress images**: Use tools like TinyPNG or ImageOptim
- **Consistent sizing**: All posters should be same aspect ratio
- **Test loading**: Check on slow connections
- **Backup posters**: Keep originals in case you need to re-optimize

### 8. **Batch Processing**
For multiple movies:
1. Download all posters to a temporary folder
2. Rename them according to convention
3. Optimize file sizes
4. Move to `assets/posters/` folder
5. Update movie database in script.js

### 9. **Example Poster Sources**
```
Warfare (2025):
- Search: "Warfare 2025 movie poster"
- TMDB: Search for movie and download poster
- Size: Resize to 300x450px
- Save as: warfare.jpg
```

### 10. **Testing**
After adding posters:
1. Refresh your website
2. Check if posters load correctly
3. Test on mobile devices
4. Verify modal view shows poster properly

## 🔧 Troubleshooting

**Poster not showing?**
- Check file name matches exactly (case-sensitive)
- Verify file is in correct folder
- Check image format is supported
- Look in browser developer tools for 404 errors

**Images loading slowly?**
- Reduce file size (aim for <200KB)
- Use JPG instead of PNG for photos
- Enable lazy loading (already implemented)

**Wrong aspect ratio?**
- Crop/resize to 2:3 ratio (300x450px)
- Use image editing tools like GIMP, Photoshop, or online tools

Remember: Replace the placeholder `warfare.svg` with an actual `warfare.jpg` poster image!
