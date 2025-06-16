// Sample file data - Replace with your actual Google Drive file data
const filesData = [
    {
        id: 1,
        name: "Movie Collection - 4K Ultra HD",
        description: "Premium 4K Ultra HD movie with stunning visual quality. Perfect for large screens and home theater setups. Crystal clear picture and immersive audio experience.",
        category: "videos",
        size: "8.5 GB",
        type: "MP4",
        downloads: 2847,
        likes: 456,
        rating: 4.9,
        uploadDate: "2025-06-15",
        downloadUrl: "https://drive.google.com/drive/folders/16dCsLJVRCvGkET1FnwqH9A7tfn9F8Dly?usp=sharing",
        previewImage: "https://via.placeholder.com/400x200/8b5cf6/ffffff?text=4K+Movie",
        tags: ["4k", "ultra-hd", "movie", "premium"]
    },
    {
        id: 2,
        name: "Movie Collection - 1080p Full HD",
        description: "High-quality 1080p Full HD version with excellent picture quality and smaller file size. Great balance between quality and storage space.",
        category: "videos",
        size: "3.2 GB",
        type: "MP4",
        downloads: 4256,
        likes: 623,
        rating: 4.8,
        uploadDate: "2025-06-15",
        downloadUrl: "https://drive.google.com/drive/folders/16dCsLJVRCvGkET1FnwqH9A7tfn9F8Dly?usp=sharing",
        previewImage: "https://via.placeholder.com/400x200/06b6d4/ffffff?text=1080p+Movie",
        tags: ["1080p", "full-hd", "movie", "quality"]
    },
    {
        id: 3,
        name: "Movie Collection - 720p HD",
        description: "Standard HD 720p version optimized for faster downloads and mobile viewing. Good quality with reasonable file size for all devices.",
        category: "videos",
        size: "1.8 GB",
        type: "MP4",
        downloads: 6124,
        likes: 789,
        rating: 4.7,
        uploadDate: "2025-06-15",
        downloadUrl: "https://drive.google.com/drive/folders/16dCsLJVRCvGkET1FnwqH9A7tfn9F8Dly?usp=sharing",
        previewImage: "https://via.placeholder.com/400x200/10b981/ffffff?text=720p+Movie",
        tags: ["720p", "hd", "movie", "mobile"]
    },
    {
        id: 4,
        name: "Movie Collection - 480p Standard",
        description: "Standard definition version perfect for older devices and limited internet connections. Compact file size with decent quality.",
        category: "videos",
        size: "850 MB",
        type: "MP4",
        downloads: 3421,
        likes: 234,
        rating: 4.5,
        uploadDate: "2025-06-15",
        downloadUrl: "https://drive.google.com/drive/folders/16dCsLJVRCvGkET1FnwqH9A7tfn9F8Dly?usp=sharing",
        previewImage: "https://via.placeholder.com/400x200/f59e0b/ffffff?text=480p+Movie",
        tags: ["480p", "standard", "movie", "compact"]
    },
    {
        id: 5,
        name: "Web Development Course - Complete Guide",
        description: "Comprehensive web development tutorial covering HTML, CSS, JavaScript, and modern frameworks. Perfect for beginners and intermediate developers.",
        category: "documents",
        size: "245 MB",
        type: "PDF",
        downloads: 1247,
        likes: 89,
        rating: 4.8,
        uploadDate: "2025-01-15",
        downloadUrl: "https://drive.google.com/file/d/your-file-id/view?usp=sharing",
        previewImage: null,
        tags: ["web-dev", "tutorial", "programming"]
    },    {
        id: 6,
        name: "Professional Logo Pack",
        description: "High-quality vector logos and brand assets. Includes AI, EPS, PNG, and SVG formats. Commercial license included.",
        category: "images",
        size: "89 MB",
        type: "ZIP",
        downloads: 856,
        likes: 142,
        rating: 4.9,
        uploadDate: "2025-01-12",
        downloadUrl: "https://drive.google.com/file/d/your-file-id/view?usp=sharing",
        previewImage: "https://via.placeholder.com/400x200/6366f1/ffffff?text=Logo+Pack",
        tags: ["design", "logos", "graphics"]
    },
    {
        id: 7,
        name: "JavaScript ES6+ Cheat Sheet",
        description: "Quick reference guide for modern JavaScript features. Includes examples and best practices for ES6, ES7, ES8, and beyond.",
        category: "documents",
        size: "12 MB",
        type: "PDF",
        downloads: 2341,
        likes: 287,
        rating: 4.7,
        uploadDate: "2025-01-10",
        downloadUrl: "https://drive.google.com/file/d/your-file-id/view?usp=sharing",
        previewImage: null,
        tags: ["javascript", "cheatsheet", "reference"]
    },
    {
        id: 8,
        name: "UI/UX Design System Templates",
        description: "Modern design system with components, color palettes, typography, and guidelines. Available for Figma and Sketch.",
        category: "images",
        size: "156 MB",
        type: "ZIP",
        downloads: 642,
        likes: 98,
        rating: 4.6,
        uploadDate: "2025-01-08",
        downloadUrl: "https://drive.google.com/file/d/your-file-id/view?usp=sharing",
        previewImage: "https://via.placeholder.com/400x200/8b5cf6/ffffff?text=Design+System",
        tags: ["ui", "ux", "design", "templates"]
    },
    {
        id: 9,
        name: "Photography Lightroom Presets",
        description: "Professional photo editing presets for Adobe Lightroom. Includes portrait, landscape, and street photography styles.",
        category: "images",
        size: "78 MB",
        type: "ZIP",
        downloads: 1523,
        likes: 203,
        rating: 4.8,
        uploadDate: "2025-01-05",
        downloadUrl: "https://drive.google.com/file/d/your-file-id/view?usp=sharing",
        previewImage: "https://via.placeholder.com/400x200/06b6d4/ffffff?text=Lightroom+Presets",
        tags: ["photography", "lightroom", "presets"]
    },
    {
        id: 10,
        name: "Python Data Analysis Toolkit",
        description: "Complete toolkit for data analysis with Python. Includes Jupyter notebooks, datasets, and step-by-step tutorials.",
        category: "software",
        size: "312 MB",
        type: "ZIP",
        downloads: 934,
        likes: 156,
        rating: 4.9,
        uploadDate: "2025-01-03",
        downloadUrl: "https://drive.google.com/file/d/your-file-id/view?usp=sharing",
        previewImage: null,        tags: ["python", "data-analysis", "jupyter"]
    },
    {
        id: 11,
        name: "Chill Lo-Fi Music Collection",
        description: "Relaxing lo-fi beats perfect for studying, working, or unwinding. High-quality MP3 files with album artwork.",
        category: "music",
        size: "198 MB",
        type: "ZIP",
        downloads: 2156,
        likes: 445,
        rating: 4.7,
        uploadDate: "2025-01-01",
        downloadUrl: "https://drive.google.com/file/d/your-file-id/view?usp=sharing",
        previewImage: "https://via.placeholder.com/400x200/10b981/ffffff?text=Lo-Fi+Music",
        tags: ["music", "lo-fi", "study"]
    },
    {
        id: 12,
        name: "React.js Project Templates",
        description: "Ready-to-use React.js templates for common applications. Includes e-commerce, dashboard, and portfolio templates.",
        category: "software",
        size: "145 MB",
        type: "ZIP",
        downloads: 1789,
        likes: 234,
        rating: 4.8,
        uploadDate: "2024-12-28",
        downloadUrl: "https://drive.google.com/file/d/your-file-id/view?usp=sharing",
        previewImage: null,
        tags: ["react", "templates", "javascript"]
    }
];

// DOM Elements
const filesGrid = document.getElementById('filesGrid');
const searchInput = document.getElementById('searchInput');
const filterTabs = document.querySelectorAll('.filter-tab');
const themeToggle = document.getElementById('themeToggle');
const downloadModal = document.getElementById('downloadModal');
const modalClose = document.getElementById('modalClose');
const loadMoreBtn = document.getElementById('loadMoreBtn');

// State
let currentFilter = 'all';
let searchQuery = '';
let displayedFiles = 8;
let isDownloading = false;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    renderFiles();
    updateStats();
    setupEventListeners();
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// File Rendering
function renderFiles() {
    const filteredFiles = getFilteredFiles();
    const filesToShow = filteredFiles.slice(0, displayedFiles);
    
    filesGrid.innerHTML = '';
    
    filesToShow.forEach((file, index) => {
        const fileCard = createFileCard(file, index);
        filesGrid.appendChild(fileCard);
    });
    
    // Show/hide load more button
    loadMoreBtn.style.display = filteredFiles.length > displayedFiles ? 'flex' : 'none';
}

function createFileCard(file, index) {
    const card = document.createElement('div');
    card.className = 'file-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const previewContent = file.previewImage 
        ? `<img src="${file.previewImage}" alt="${file.name}" loading="lazy">`
        : `<div class="file-type-icon">${getFileIcon(file.type)}</div>`;
    
    card.innerHTML = `
        <div class="file-preview">
            ${previewContent}
            <div class="file-badge">${file.type}</div>
        </div>
        <div class="file-info">
            <h3 class="file-title">${file.name}</h3>
            <p class="file-description">${file.description}</p>
            <div class="file-meta">
                <div class="file-stats">
                    <span><i class="fas fa-download"></i> ${formatNumber(file.downloads)}</span>
                    <span><i class="fas fa-heart"></i> ${file.likes}</span>
                    <span><i class="fas fa-star"></i> ${file.rating}</span>
                </div>
                <span class="file-size">${file.size}</span>
            </div>
            <div class="file-actions">
                <button class="btn btn-primary" onclick="downloadFile(${file.id})">
                    <i class="fas fa-download"></i>
                    Download
                </button>
                <button class="btn btn-secondary btn-icon" onclick="likeFile(${file.id})" title="Like">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="btn btn-secondary btn-icon" onclick="shareFile(${file.id})" title="Share">
                    <i class="fas fa-share-alt"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function getFileIcon(type) {
    const icons = {
        'PDF': '<i class="fas fa-file-pdf"></i>',
        'ZIP': '<i class="fas fa-file-archive"></i>',
        'MP3': '<i class="fas fa-file-audio"></i>',
        'MP4': '<i class="fas fa-file-video"></i>',
        'JPG': '<i class="fas fa-file-image"></i>',
        'PNG': '<i class="fas fa-file-image"></i>',
        'DOC': '<i class="fas fa-file-word"></i>',
        'XLS': '<i class="fas fa-file-excel"></i>',
        'PPT': '<i class="fas fa-file-powerpoint"></i>'
    };
    
    return icons[type] || '<i class="fas fa-file"></i>';
}

// Filtering and Search
function getFilteredFiles() {
    let filtered = filesData;
    
    // Apply category filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(file => file.category === currentFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
        filtered = filtered.filter(file => 
            file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            file.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            file.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }
    
    return filtered;
}

function handleFilterChange(category) {
    currentFilter = category;
    displayedFiles = 8;
    
    // Update active tab
    filterTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === category);
    });
    
    renderFiles();
}

function handleSearch() {
    searchQuery = searchInput.value;
    displayedFiles = 8;
    renderFiles();
}

// Event Listeners
function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Search
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    
    // Filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            handleFilterChange(tab.dataset.category);
        });
    });
    
    // Load more
    loadMoreBtn.addEventListener('click', () => {
        displayedFiles += 8;
        renderFiles();
    });
    
    // Modal close
    modalClose.addEventListener('click', closeModal);
    downloadModal.addEventListener('click', (e) => {
        if (e.target === downloadModal) {
            closeModal();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
}

// File Actions
function downloadFile(fileId) {
    const file = filesData.find(f => f.id === fileId);
    if (!file) return;
    
    showDownloadModal(file);
}

function showDownloadModal(file) {
    document.getElementById('modalFileName').textContent = file.name;
    document.getElementById('modalFileSize').textContent = file.size;
    document.getElementById('modalFileType').textContent = file.type;
    
    downloadModal.classList.add('active');
    
    // Setup download button
    const startDownloadBtn = document.getElementById('startDownload');
    const cancelDownloadBtn = document.getElementById('cancelDownload');
    
    startDownloadBtn.onclick = () => startDownload(file);
    cancelDownloadBtn.onclick = closeModal;
}

function startDownload(file) {
    if (isDownloading) return;
    
    isDownloading = true;
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    const downloadSpeed = document.getElementById('downloadSpeed');
    const startBtn = document.getElementById('startDownload');
    
    startBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
    startBtn.disabled = true;
    
    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = `${progress}%`;
        progressPercent.textContent = `${Math.round(progress)}%`;
        downloadSpeed.textContent = `${(Math.random() * 2 + 1).toFixed(1)} MB/s`;
        
        if (progress >= 100) {
            clearInterval(interval);
            
            // Open Google Drive file
            window.open(file.downloadUrl, '_blank');
            
            // Update download count
            file.downloads++;
            updateStats();
            renderFiles();
            
            setTimeout(() => {
                closeModal();
                showNotification('Download completed!', 'success');
            }, 1000);
        }
    }, 100);
}

function likeFile(fileId) {
    const file = filesData.find(f => f.id === fileId);
    if (!file) return;
    
    file.likes++;
    updateStats();
    renderFiles();
    showNotification('Added to favorites!', 'success');
}

function shareFile(fileId) {
    const file = filesData.find(f => f.id === fileId);
    if (!file) return;
    
    if (navigator.share) {
        navigator.share({
            title: file.name,
            text: file.description,
            url: window.location.href
        });
    } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Link copied to clipboard!', 'success');
        });
    }
}

// Modal Management
function closeModal() {
    downloadModal.classList.remove('active');
    isDownloading = false;
    
    // Reset progress
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('progressPercent').textContent = '0%';
    document.getElementById('downloadSpeed').textContent = '0 KB/s';
    
    const startBtn = document.getElementById('startDownload');
    startBtn.innerHTML = '<i class="fas fa-download"></i> Start Download';
    startBtn.disabled = false;
}

// Statistics
function updateStats() {
    const totalFiles = filesData.length;
    const totalDownloads = filesData.reduce((sum, file) => sum + file.downloads, 0);
    const totalCategories = [...new Set(filesData.map(file => file.category))].length;
    const totalLikes = filesData.reduce((sum, file) => sum + file.likes, 0);
    
    document.getElementById('totalFiles').textContent = totalFiles;
    document.getElementById('totalDownloads').textContent = formatNumber(totalDownloads);
    document.getElementById('totalCategories').textContent = totalCategories;
    document.getElementById('popularFiles').textContent = totalLikes;
}

// Utility Functions
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

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

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-md);
        padding: 1rem 1.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}" style="color: var(--${type === 'success' ? 'success' : 'primary'}-color);"></i>
            <span style="color: var(--text-primary);">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
