# File Download Center

A modern, responsive web interface for downloading files from Google Drive with version management.

## Features

- 🎨 **Modern UI Design** - Beautiful gradient backgrounds and smooth animations
- 📱 **Responsive Layout** - Works perfectly on desktop, tablet, and mobile devices
- 🔍 **Search Functionality** - Quick search through files by name or description
- 🏷️ **Category Filtering** - Filter files by type (Documents, Images, Videos, Software, Other)
- 📊 **Version Management** - Multiple versions of files with detailed change logs
- 📈 **Download Analytics** - Track download statistics
- 🔗 **Google Drive Integration** - Direct links to Google Drive files
- ⚡ **Fast Loading** - Optimized performance with minimal dependencies

## Setup Instructions

### 1. Configure Google Drive Files

1. Upload your files to Google Drive
2. Make each file publicly accessible:
   - Right-click the file → Share
   - Change access to "Anyone with the link can view"
   - Copy the file ID from the sharing link

3. Update the file data in both `home.html` and `file-details.html`:
   - Replace `YOUR_FILE_ID_X` with actual Google Drive file IDs
   - Update file information (names, descriptions, sizes, etc.)

### 2. Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to repository Settings → Pages
4. Set source to "Deploy from a branch"
5. Select "main" branch and "/ (root)" folder
6. Your site will be available at `https://username.github.io/repository-name`

### 3. Customization

#### Adding New Files
```javascript
// Add to the files array in both home.html and file-details.html
{
    id: 'unique-file-id',
    name: 'File Name',
    description: 'File description',
    category: 'documents|images|videos|software|other',
    icon: 'fas fa-file-type', // FontAwesome icon
    iconColor: '#color-code',
    size: 'X.X MB',
    lastModified: 'YYYY-MM-DD',
    totalDownloads: 'X,XXX',
    versions: [
        {
            version: 'vX.X',
            date: 'YYYY-MM-DD',
            size: 'X.X MB',
            downloadUrl: 'https://drive.google.com/uc?id=FILE_ID',
            changes: 'Description of changes'
        }
    ]
}
```

#### Styling Customization
- Colors: Update CSS custom properties in the `<style>` sections
- Layout: Modify grid layouts and responsive breakpoints in home.html
- Animations: Adjust transition durations and effects

## File Structure

```
download_site/
├── home.html           # Home page with file listings
├── file-details.html   # Individual file details and versions
└── README.md          # This documentation
```

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Dependencies

- [Font Awesome 6.0.0](https://fontawesome.com/) - Icons
- No JavaScript frameworks required - vanilla JS only

## Google Drive File ID Format

Google Drive sharing links look like:
```
https://drive.google.com/file/d/FILE_ID_HERE/view?usp=sharing
```

Extract the `FILE_ID_HERE` part and use it in the download URL format:
```
https://drive.google.com/uc?id=FILE_ID_HERE
```

## Security Notes

- Files must be set to public viewing for direct download links to work
- Consider using Google Drive API for private files with authentication
- Monitor download usage to stay within Google Drive quotas

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
