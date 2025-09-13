// js/firebase.js
// Reusable Firebase init - import this from pages
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getMessaging } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-messaging.js";

// <- REPLACE with your exact config (from Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyB3ecJ8jT9nqblPtorI1_tmg6pkMjJ4NmY",
  authDomain: "effi-track-d8663.firebaseapp.com",
  projectId: "effi-track-d8663",
  storageBucket: "effi-track-d8663.firebasestorage.app",
  messagingSenderId: "27511213535",
  appId: "1:27511213535:web:ad1298f1285f03f112886a",
  measurementId: "G-RHFY96G6EW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
let messaging;
try { messaging = getMessaging(app); } catch (e) { /* optional */ }

export { app, db, auth, messaging };
