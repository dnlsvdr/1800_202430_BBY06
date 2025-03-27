function displayPlantInfo() {
  let params = new URL(window.location.href);
  let plantDocID = params.searchParams.get("docID");
  console.log("Plant docID:", plantDocID);

  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    console.error("User is not authenticated.");
    return;
  }
  const uid = currentUser.uid;

  db.collection("users")
    .doc(uid)
    .collection("plants")
    .doc(plantDocID)
    .get()
    .then(doc => {
      if (doc.exists) {
        let thisPlant = doc.data();
        let plantImage = thisPlant.image2;           // URL for the plant image
        let plantName = thisPlant.name;             // Plant name
        let plantDescription = thisPlant.description; // Plant description
        let plantCareGuide = thisPlant.careGuide;     // Plant care guide
        let plantSunlight = thisPlant.sunlight;
        let plantWater = thisPlant.water;
        let plantFertilize = thisPlant.fertilize;

        document.getElementById("plantName").innerHTML = plantName;
        document.querySelector(".plant-img").src = plantImage;
        document.getElementById("description").innerHTML = plantDescription;
        document.getElementById("careGuide").innerHTML = plantCareGuide;
        document.getElementById("sunlight").innerHTML = plantSunlight;
        document.getElementById("water").innerHTML = plantWater;
        document.getElementById("fertilizer").innerHTML = plantFertilize;

        // Pre-fill water schedule if data exists
        if (thisPlant.lastWaterDate) {
          document.getElementById("lastWaterDate").value = thisPlant.lastWaterDate;
        }
        if (thisPlant.waterInterval) {
          document.getElementById("waterInterval").value = thisPlant.waterInterval;
        }
      } else {
        console.error("No plant document found for the given docID.");
      }
    })
    .catch(error => {
      console.error("Error fetching plant document:", error);
    });
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    displayPlantInfo();
  } else {
    console.log("User not signed in.");
  }
});

//this is for the tab 
document.addEventListener("DOMContentLoaded", function() {
  const plantInfoTab = document.getElementById("plantInfoTab");
  const waterScheduleTab = document.getElementById("waterScheduleTab");
  const plantInfoContent = document.getElementById("plantInfoContent");
  const waterScheduleContent = document.getElementById("waterScheduleContent");

  // Tab switching functionality
  plantInfoTab.addEventListener("click", function() {
      plantInfoContent.classList.remove("hidden"); 
      waterScheduleContent.classList.add("hidden");
      plantInfoTab.classList.add("active");
      waterScheduleTab.classList.remove("active");
  });

  waterScheduleTab.addEventListener("click", function() {
      plantInfoContent.classList.add("hidden"); 
      waterScheduleContent.classList.remove("hidden");
      plantInfoTab.classList.remove("active");
      waterScheduleTab.classList.add("active");
  });
});

// Save Water Schedule
document.querySelector('.save-button').addEventListener('click', function() {
  const lastWaterDateInput = document.getElementById('lastWaterDate').value;
  const waterIntervalInput = document.getElementById('waterInterval').value;

  if (!lastWaterDateInput || !waterIntervalInput) {
    return;
  }

  let params = new URL(window.location.href);
  let plantDocID = params.searchParams.get("docID");

  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    return;
  }
  const uid = currentUser.uid;

  db.collection("users")
    .doc(uid)
    .collection("plants")
    .doc(plantDocID)
    .update({
      lastWaterDate: lastWaterDateInput, // Stored as YYYY-MM-DD
      waterInterval: parseInt(waterIntervalInput)
    })
    .then(() => {
      // After updating water schedule, check if an update is needed, then redirect
      updateLastWaterDateIfPast(plantDocID).then(() => {
        window.location.href = "home.html";
      });
    })
    .catch((error) => {
      console.error("Error updating water schedule:", error);
    });
});

// Function to Update Last Water Date if Overdue
function updateLastWaterDateIfPast(plantDocID) {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    return Promise.resolve();
  }
  const uid = currentUser.uid;
  const plantDocRef = db.collection("users").doc(uid).collection("plants").doc(plantDocID);
  
  return plantDocRef.get().then(doc => {
    if (doc.exists) {
      let data = doc.data();
      let lastWaterDate = new Date(data.lastWaterDate);
      let waterInterval = data.waterInterval; // in days
      const msPerDay = 24 * 60 * 60 * 1000;
      let nextWaterDate = new Date(lastWaterDate.getTime() + waterInterval * msPerDay);
      const now = new Date();
      
      if (now > nextWaterDate) {
        while (nextWaterDate < now) {
          lastWaterDate = nextWaterDate;
          nextWaterDate = new Date(nextWaterDate.getTime() + waterInterval * msPerDay);
        }
        return plantDocRef.update({
          lastWaterDate: lastWaterDate.toISOString().split("T")[0]
        });
      }
    }
    return Promise.resolve();
  }).catch(error => {
    console.error("Error fetching plant document:", error);
  });
}

document.getElementById("removePlantButton").addEventListener("click", function() {
  // Ask for confirmation before deletion
  if (confirm("Are you sure you want to remove this plant? This action cannot be undone.")) {
    let params = new URL(window.location.href);
    let plantDocID = params.searchParams.get("docID");
    
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      console.error("User not authenticated.");
      return;
    }
    const uid = currentUser.uid;

    // Delete the plant document from Firestore
    db.collection("users")
      .doc(uid)
      .collection("plants")
      .doc(plantDocID)
      .delete()
      .then(() => {
        // Redirect to home.html after deletion
        window.location.href = "home.html";
      })
      .catch((error) => {
        console.error("Error removing plant:", error);
      });
  }
});
