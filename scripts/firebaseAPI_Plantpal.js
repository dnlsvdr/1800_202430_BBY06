// Import Firebase SDK via CDN for ES Modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

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
const app = initializeApp(firebaseConfig); 
const auth = getAuth(app);  // Auth instance
const db = getFirestore(app); //Firestore

// Login Function (Existing Users)
document.getElementById("loginButton").addEventListener("click", function() {
  const email = document.getElementById("InputEmail").value;
  const password = document.getElementById("InputPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in:", user.email);
        alert("Login successful!");
        window.location.href = "home.html"; 
    })
    .catch((error) => {
        console.error("Login failed:", error.message);
        alert("Error: " + error.message);
    });
});

// Sign-Up Function (New Users)
document.getElementById("signUpButton").addEventListener("click", function() {
  const email = document.getElementById("InputEmail").value;
  const password = document.getElementById("InputPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        var user = userCredential.user;
        console.log("User registered:", user.email);
        alert("Sign-up successful! You can now log in.");
        window.location.href = "home.html"; 
    })
    .catch((error) => {
        console.error("Sign-up failed:", error.message);
        alert("Error: " + error.message);
    });
});

//Function to add plant document to Firestore 
const addPlant = async(plantDetails) => {
  try{
    const docRef = await addDoc(collection(db, "Plant Information"));
    console.log("Document written with ID: ", docRef.id);
  } 
  catch (error) {
    console.error("Error adding Document: ", error);
  }
}

//Fetch the json file
fetch(`https://perenual.com/api/v2/species/details/1?key=sk-fj6L67cfcde3989809080`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


  