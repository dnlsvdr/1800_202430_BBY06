document.addEventListener("DOMContentLoaded", function () {
    let allPlants = [];
    const cardTemplate = document.getElementById("plantCardTemplate");
    const searchInput = document.getElementById("searchInput");
    const container = document.getElementById("plants-go-here");
  
    // Function to display plant cards based on an array of plant objects
    function displayCards(plantsArray) {
      container.innerHTML = ""; // Clear container before displaying
   
      if (plantsArray.length === 0) {
        container.innerHTML = "<p>No results found</p>";
        return;
      }
      plantsArray.forEach(plant => {
        let newCard = cardTemplate.content.cloneNode(true);
        newCard.querySelector(".card-title").innerHTML = plant.name;
        newCard.querySelector(".card-image").src = plant.image;
        newCard.querySelector(".card-type").innerHTML = plant.type;
        newCard.querySelector(".card-water").innerHTML = plant.water;
        
        // Add click event to redirect to each plant page
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
  
    // Listen for changes in the search input to filter plants in real time
    searchInput.addEventListener("keyup", filterAndDisplayCards);
  
    // Get the current authenticated user and listen for their plants
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid;
        // Listen for real-time updates from the authenticated user's plants subcollection
        db.collection("users")
          .doc(uid)
          .collection("plants")
          .onSnapshot(snapshot => {
            allPlants = []; 
            snapshot.forEach(doc => {
              const data = doc.data();
              allPlants.push({
                docID: doc.id,
                name: data.name,
                type: data.type,
                image: data.image,
                water: data.water
              });
            });
            console.log("All plants:", allPlants);
            filterAndDisplayCards();
          }, error => {
            console.error("Error loading plants:", error);
          });
      } else {
        console.log("User not signed in.");
      }
    });
  });
  