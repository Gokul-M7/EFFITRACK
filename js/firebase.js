// js/firebase.js
// Centralized Firebase initialization – import this wherever needed

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getMessaging } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-messaging.js";

// 🔹 Your Firebase config (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyB3ecJ8jT9nqblPtorI1_tmg6pkMjJ4NmY",
  authDomain: "effi-track-d8663.firebaseapp.com",
  projectId: "effi-track-d8663",
  storageBucket: "effi-track-d8663.appspot.com",  // ✅ fixed here
  messagingSenderId: "27511213535",
  appId: "1:27511213535:web:ad1298f1285f03f112886a",
  measurementId: "G-RHFY96G6EW"
};

// 🔹 Initialize Firebase services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Messaging is optional (can fail on web without service worker)
let messaging;
try {
  messaging = getMessaging(app);
} catch (e) {
  console.warn("Messaging not initialized (browser may not support it).");
}

// 🔹 Export for use in pages
export { app, db, auth, messaging };
