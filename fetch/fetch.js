// Replace these values with your actual Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB59VxgJaIjtuL0YiV_SIC4JPFfTot_13Q",
    authDomain: "plantpal-a8c1a.firebaseapp.com",
    projectId: "plantpal-a8c1a",
    storageBucket: "plantpal-a8c1a.firebasestorage.app",
    messagingSenderId: "1076806405368",
    appId: "1:1076806405368:web:0b2ae87e62bac080e1bf0d"
  };
  
  // Initialize Firebase and Firestore
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
  
  // Fetch the JSON file and process the data
  fetch("species_details.json")
    .then(response => response.json())
    .then(data => {
      const newData = [];
      data.forEach(species => {
        // Create a new object with the properties you want to store in Firestore
        const newSpecies = {
          name: species.common_name,
          type: species.type
        };
        newData.push(newSpecies);
      });
      console.log("Processed Data:", newData);
  
      // Add each species to the Firestore 'species' collection
      newData.forEach(species => {
        db.collection("species").add(species)
          .then(docRef => {
            console.log("Document written with ID:", docRef.id);
          })
          .catch(error => {
            console.error("Error adding document:", error);
          });
      });
    })
    .catch(error => {
      console.error("Error fetching JSON:", error);
    });
  