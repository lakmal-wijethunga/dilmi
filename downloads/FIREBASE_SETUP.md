# Firebase Setup Instructions for Download Counter

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "movie-download-counter")
4. Choose whether to enable Google Analytics
5. Create project

## 2. Setup Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" for now
4. Select a location close to your users
5. Click "Done"

## 3. Get Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" and choose Web (</>) icon
4. Enter app nickname (e.g., "movie-site")
5. Copy the Firebase configuration object

## 4. Update script.js

Replace the firebaseConfig object in script.js with your actual configuration:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-actual-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

## 5. Add Firebase Scripts to HTML

Add these script tags to your index.html file, BEFORE the script.js tag:

```html
<!-- Firebase CDN Scripts -->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>

<!-- Your existing script -->
<script src="script.js"></script>
```

## 6. Firestore Security Rules

In Firebase Console > Firestore Database > Rules, update the rules to:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to download counts
    match /downloadCounts/{document} {
      allow read, write: if true;
    }
  }
}
```

## 7. Database Structure

The download counts will be stored in Firestore as:
```
Collection: downloadCounts
Document: movies
Fields:
  movie_1: 0
  movie_2: 0
  movie_3: 0
  ... (one field per movie ID)
```

## 8. Features

✅ **Real-time Updates**: Download counts update across all users in real-time
✅ **Persistent Storage**: Counts are stored in Firebase Firestore
✅ **Fallback Support**: If Firebase fails, it falls back to localStorage
✅ **Global Counter**: Tracks downloads from all users, not just individual sessions
✅ **Live Display**: Shows current download count in movie cards and modal

## 9. Testing

1. Open your movie site
2. Check browser console for "Firebase initialized successfully"
3. Download a movie
4. Verify count increases in both UI and Firebase Console
5. Open site in another browser/tab to see real-time updates

## 10. Optional: Analytics Dashboard

You can view download statistics in Firebase Console:
1. Go to Firestore Database
2. Navigate to downloadCounts > movies
3. See real-time download counts for each movie

## Troubleshooting

- **Firebase not loaded**: Check that CDN scripts are included before script.js
- **Permission denied**: Update Firestore security rules
- **Configuration error**: Verify firebaseConfig object has correct values
- **Network issues**: System will fallback to localStorage automatically
