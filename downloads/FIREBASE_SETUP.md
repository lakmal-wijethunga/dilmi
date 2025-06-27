# Firebase Setup Instructions for Download Counter

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: **"movie-download-counter"** (or your preferred name)
4. **Disable Google Analytics** (not needed for this project)
5. Click "Create project"
6. Wait for setup to complete, then click "Continue"

## 2. Setup Firestore Database

1. In Firebase Console, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. **Choose "Start in test mode"** (we'll configure security later)
4. Select a location close to your users (e.g., us-central1, europe-west1)
5. Click "Done"
6. Wait for database creation to complete

## 3. Get Firebase Configuration

1. In Firebase Console, click the **gear icon** (Project Settings)
2. Scroll down to "Your apps" section
3. Click the **Web icon** `</>`
4. Enter app nickname: **"movie-site"**
5. **DO NOT** check "Also set up Firebase Hosting"
6. Click "Register app"
7. **COPY** the Firebase configuration object (looks like this):

```javascript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

## 4. Update Your Configuration

**Your current config in script.js:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyCzB8U5qFBcB8yHn7NoEhmjvyMWn3HM8vk",
  authDomain: "movie-download-counter.firebaseapp.com",
  projectId: "movie-download-counter",
  storageBucket: "movie-download-counter.firebasestorage.app",
  messagingSenderId: "542837864447",
  appId: "1:542837864447:web:a643a8ab3d8d2ae7d359ca"
};
```

**✅ Your configuration is already set up correctly!**

## 5. Firebase Scripts (Already Added)

Your index.html already includes the Firebase scripts:
```html
<!-- Firebase CDN Scripts -->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>

<!-- Your script -->
<script src="script.js"></script>
```

## 6. 🔥 IMPORTANT: Configure Firestore Security Rules (REQUIRED)

**⚠️ This step is MANDATORY for your download counter to work!**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **"movie-download-counter"**
3. Click **"Firestore Database"** in the left sidebar
4. Click the **"Rules"** tab at the top
5. You'll see the current rules (probably in test mode)
6. **REPLACE ALL** existing rules with this code:

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

7. Click **"Publish"** button
8. Wait for "Rules published successfully" confirmation

### 🚨 What happens if you skip this step:
- ❌ Download counter won't work
- ❌ You'll get "Permission denied" errors
- ❌ Firebase data won't save or load

### ✅ After completing this step:
- ✅ Download counter works globally
- ✅ Real-time updates across all users
- ✅ Data persists in Firebase cloud

## 6.1. Alternative: Check Current Rules Status

**To see what rules you currently have:**

1. Go to Firebase Console → Your Project
2. Click "Firestore Database" → "Rules" tab
3. Look at the current rules

**If you see this (DEFAULT/TEST MODE):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```
**👆 This BLOCKS everything - you MUST update to Step 6 rules**

**If you see this (TEST MODE EXPIRING):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
        request.time < timestamp.date(2025, 7, 15);
    }
  }
}
```
**👆 This will STOP WORKING after the date - update to Step 6 rules**

**Only Step 6 rules will work permanently!**

## 7. Test Your Setup

1. **Open your movie site**
2. **Open Developer Tools** (F12)
3. **Check Console** for these SUCCESS messages:
   - ✅ `"Firebase initialized successfully"`
   - ✅ `"Download counts loaded from Firebase"`
   - ✅ `"Real-time listener setup complete"`

4. **Test download counter:**
   - Click on any movie
   - Click a download quality option
   - **Count should increase IMMEDIATELY** (no page refresh needed)
   - Console should show: `"Download count incremented for movie X: Y"`

5. **Test real-time updates:**
   - Open your site in **another browser tab**
   - Download from either tab
   - **Both tabs should update instantly**

### 🚨 If you see errors:
- `"Permission denied"` → Go back to Step 6 (Security Rules)
- `"Firebase not loaded"` → Check Step 5 (Scripts)
- `"Configuration error"` → Check Step 4 (Config)

### ✅ Success indicators:
- Download numbers increase immediately
- No red errors in console
- Multiple tabs update simultaneously

## 8. Database Structure

Your download counts are stored as:
```
Collection: downloadCounts
Document: movies
Fields:
  movie_1: 0
  movie_2: 0
  movie_3: 5
  movie_4: 12
  ... (one field per movie ID)
```

## 9. Monitor Your Database

1. Go to Firebase Console → **Firestore Database**
2. Click **"Data"** tab
3. Navigate to `downloadCounts` → `movies`
4. You'll see real-time download counts for each movie

## 10. Features Working

✅ **Real-time Updates**: Counts update across all users instantly  
✅ **Persistent Storage**: Data saved in Firebase cloud  
✅ **Fallback Support**: Uses localStorage if Firebase fails  
✅ **Global Counter**: Tracks downloads from all users worldwide  
✅ **Animations**: Download counts animate when updated  

## 11. Troubleshooting

### Problem: Download counter not working / only updates on refresh
**Solutions:**
1. **Check Firebase initialization:**
   - Open browser console (F12)
   - Look for `"Firebase initialized successfully"`
   - Look for `"Download counts loaded from Firebase"`
   - Look for `"Real-time listener setup complete"`

2. **Test Firebase connection:**
   - In console, type: `testFirebaseConnection()`
   - Check if Firebase data is being read properly

3. **Check for errors:**
   - Look for any red error messages in console
   - Common errors: "Permission denied", "Firebase not loaded"

4. **Force refresh Firebase:**
   - Clear browser cache and cookies
   - Reload the page completely

### Problem: "Firebase not loaded"
**Solution:** Check that Firebase CDN scripts load before script.js

### Problem: "Permission denied"
**Solution:** Update Firestore security rules (Step 6)

### Problem: "Network error"
**Solution:** Check internet connection; system will use localStorage as fallback

### Problem: Download counts not updating in real-time
**Solutions:**
1. Check browser console for real-time listener messages
2. Test with multiple browser tabs open
3. Verify Firestore security rules allow read/write
4. Check if Firebase scripts are loading properly

### Problem: "Configuration error"
**Solution:** Copy the exact configuration from Firebase Console

### Debug Commands (Type in Browser Console)
```javascript
// Test Firebase connection
testFirebaseConnection()

// Check current download counts
console.log('Download counts:', downloadCounts)

// Check movies database
console.log('Movies:', moviesDatabase.map(m => ({id: m.id, title: m.title, count: m.downloadCount})))

// Force update UI
updateAllDownloadCounts()
```

## 12. Production Recommendations

### Security Rules (For Production)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /downloadCounts/movies {
      // Allow read to everyone
      allow read: if true;
      // Limit write operations (anti-spam)
      allow write: if request.time > resource.data.lastUpdate + duration.value(1, 's');
    }
  }
}
```

### Rate Limiting
Consider adding rate limiting to prevent abuse:
- Limit downloads per IP per minute
- Add CAPTCHA for excessive downloads
- Monitor download patterns

## 13. Backup Strategy

1. **Export Data:** Firebase Console → Firestore → Import/Export
2. **Scheduled Backups:** Set up automatic daily backups
3. **Local Backup:** Your localStorage acts as local backup

---

## 🚀 Quick Start Checklist

- [ ] Firebase project created
- [ ] Firestore database enabled
- [ ] Security rules configured
- [ ] Firebase scripts added to HTML
- [ ] Configuration copied to script.js
- [ ] Test download counter working
- [ ] Check console for success messages
- [ ] Verify real-time updates

**Your setup is complete!** The download counter should now work globally across all users with real-time updates.
