
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB59VxgJaIjtuL0YiV_SIC4JPFfTot_13Q",
  authDomain: "plantpal-a8c1a.firebaseapp.com",
  projectId: "plantpal-a8c1a",
  storageBucket: "plantpal-a8c1a.firebasestorage.app",
  messagingSenderId: "1076806405368",
  appId: "1:1076806405368:web:0b2ae87e62bac080e1bf0d"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig); 
const auth = firebase.auth();  
const db = firebase.firestore(); 

