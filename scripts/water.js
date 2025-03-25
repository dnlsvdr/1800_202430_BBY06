document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.querySelector('.save-button');
    if (saveButton) {
      saveButton.addEventListener('click', () => {
        // Retrieve new input values
        const lastWaterDateInput = document.getElementById('lastWaterDate').value;
        const waterIntervalInput = document.getElementById('waterInterval').value;
        
        // Validate inputs
        if (!lastWaterDateInput || !waterIntervalInput) {
          alert("Please fill in both the last water date and the watering interval.");
          return;
        }
        
        // Calculate the new next watering date
        const lastWaterDate = new Date(lastWaterDateInput);
        const waterInterval = parseInt(waterIntervalInput);
        const nextWaterDate = new Date(lastWaterDate);
        nextWaterDate.setDate(nextWaterDate.getDate() + waterInterval);
        const nextWaterDateStr = nextWaterDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          });
          
        
        // Retrieve the plant document ID from the URL query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const plantID = urlParams.get('docID');
        if (!plantID) {
          console.error("No plant document ID found in the URL.");
          return;
        }
        
        // Update the plant document
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            const uid = user.uid;
            const plantRef = db.collection("users").doc(uid).collection("plants").doc(plantID);
            
            // Update the document with new watering values.
            plantRef.update({
              lastWaterDate: lastWaterDateInput,
              waterInterval: waterInterval,
              nextWaterDate: nextWaterDateStr
            })
            .then(() => {
              console.log("Plant watering info updated!");
              alert("Watering info updated!");
            })
            .catch((error) => {
              console.error("Error updating plant watering info:", error);
            });
          } else {
            console.error("User not signed in.");
          }
        });
      });
    }
  });
  