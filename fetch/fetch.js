const firebaseConfig = {
    apiKey: "AIzaSyB59VxgJaIjtuL0YiV_SIC4JPFfTot_13Q",
    authDomain: "plantpal-a8c1a.firebaseapp.com",
    projectId: "plantpal-a8c1a",
    storageBucket: "plantpal-a8c1a.firebasestorage.app",
    messagingSenderId: "1076806405368",
    appId: "1:1076806405368:web:0b2ae87e62bac080e1bf0d"
  };
  

  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
  
  
  fetch("common_household_plants.json")
    .then(response => response.json())
    .then(data => {
      const newData = [];
      data.forEach(species => {
        
        const newSpecies = {
          name: species.name,
          type: species.type_of_plant,
          description: species.description,
          image: species.image_source,
          water: species.watering_interval,
          fertilizer: species.fertilizer_interval,
          careGuide: species.care_guide,
          sunlight: species.sunlight
        };
        newData.push(newSpecies);
      });
      console.log("Processed Data:", newData);
  
      
      newData.forEach(species => {
        db.collection("Plant Information").add(species)
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
  