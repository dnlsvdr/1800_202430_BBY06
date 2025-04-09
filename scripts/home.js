document.addEventListener("DOMContentLoaded", function () {
  let allPlants = [];
  const cardTemplate = document.getElementById("plantCardTemplate");
  const searchInput = document.getElementById("searchInput");
  const container = document.getElementById("plants-go-here");

  function calculateNextWaterDate(lastWaterDate, waterInterval) {
    // Convert the lastWaterDate into a Date object.
    let lastWater = new Date(lastWaterDate);
    const msPerDay = 24 * 60 * 60 * 1000;
    
    // Add the waterInterval days to the last water date.
    let nextWaterDate = new Date(lastWater.getTime() + waterInterval * msPerDay);
  
    while (nextWaterDate < new Date()) {
      lastWater = nextWaterDate;
      nextWaterDate = new Date(lastWater.getTime() + waterInterval * msPerDay);
    }
    return nextWaterDate;
  }
  
  // Function to display plant cards based on an array of plant objects
  function displayCards(plantsArray) {
    plantsArray.sort((a, b) => {
      const dateA = a.nextWaterDate instanceof Date ? a.nextWaterDate : new Date(8640000000000000);
      const dateB = b.nextWaterDate instanceof Date ? b.nextWaterDate : new Date(8640000000000000);
      return dateA - dateB;
    });
    container.innerHTML = ""; 

    if (plantsArray.length === 0) {
      container.innerHTML = "<p>No plants added</p>";
      return;
    }

    plantsArray.forEach(plant => {
      let newCard = cardTemplate.content.cloneNode(true);
      newCard.querySelector(".card-title").innerHTML = plant.name;
      newCard.querySelector(".card-image").src = plant.image;
      newCard.querySelector(".card-type").innerHTML = plant.type;
      newCard.querySelector(".water-date").innerHTML = `Water every ${plant.waterInterval} days`;
      newCard.querySelector(".next-water").innerHTML = `Next water: ${plant.nextWater}`;
      
      let clickableCard = newCard.querySelector(".clickableCard");
      clickableCard.addEventListener("click", function () {
        window.location.href = "eachPlant.html?docID=" + plant.docID;
      });
      
      container.appendChild(newCard);
    });
  }

  // Filter the plant cards based on search input and display the results
  function filterAndDisplayCards() {
    const query = searchInput.value.toLowerCase();
    const filteredPlants =
      query === ""
        ? allPlants
        : allPlants.filter(plant =>
            plant.name && plant.name.toLowerCase().includes(query)
          );
    displayCards(filteredPlants);
  }

  searchInput.addEventListener("keyup", filterAndDisplayCards);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const uid = user.uid;
      db.collection("users")
        .doc(uid)
        .collection("plants")
        .onSnapshot(snapshot => {
          allPlants = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            let waterIntervalDisplay;
            let nextWaterDisplay;
            let nextWater;     
            let nextWaterDate; 

            if (data.waterInterval && data.lastWaterDate) {
              waterIntervalDisplay = `${data.waterInterval}`;
              nextWater = calculateNextWaterDate(data.lastWaterDate, data.waterInterval);
              nextWaterDisplay = nextWater.toDateString();
              nextWaterDate = nextWater;
            } else {
              waterIntervalDisplay = "<u>N/A</u>";
              nextWaterDisplay = "Not set yet";
              nextWaterDate = null;
            }

            allPlants.push({
              docID: doc.id,
              name: data.name,
              type: data.type,
              image: data.image,
              waterInterval: waterIntervalDisplay, 
              nextWater: nextWaterDisplay,         
              nextWaterDate: nextWaterDate           
            });
          });

          const today = new Date().toDateString();
          const plantsToWaterToday = allPlants.filter(plant =>
            plant.nextWaterDate && new Date(plant.nextWaterDate).toDateString() === today
          );
          if (plantsToWaterToday.length > 0) {
            const names = plantsToWaterToday.map(plant => plant.name).join(", ");
            alert("Don't forget to water these plants today: " + names);
          }

          filterAndDisplayCards();
        }, error => {
          console.error("Error loading plants:", error);
        });
    }
  });

document.getElementById("logoutBtn").addEventListener("click", function () {
  firebase.auth().signOut()
    .then(function () {
      window.location.href = "index.html";
    })
    .catch(function (error) {
      console.error("Logout error:", error);
    });
});

});
