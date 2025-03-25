document.addEventListener("DOMContentLoaded", function () {
    // Global array to store all fetched plant data
    let allPlants = [];

    let cardTemplate = document.getElementById("plantCardTemplate");
    const searchInput = document.getElementById("searchInput");
    const container = document.getElementById("plants-go-here");

    function displayCards(plantsArray) {
        // Clear the container to avoid duplicates
        container.innerHTML = "";
        plantsArray.forEach(plant => {
            let newCard = cardTemplate.content.cloneNode(true);
            newCard.querySelector('.card-title').innerHTML = plant.name;
            newCard.querySelector('.card-image').src = plant.image;
            newCard.querySelector('.card-type').innerHTML = plant.type;
            newCard.querySelector(".water-date").innerHTML = plant.water;
            let clickableCard = newCard.querySelector('.clickableCard');
            clickableCard.addEventListener('click', function () {
                window.location.href = "addEachPlant.html?docID=" + plant.docID;
            });
            container.appendChild(newCard);
        });
    }

   
    function filterAndDisplayCards() {
        const query = searchInput.value.toLowerCase();
        const filteredPlants = query === ""
            ? allPlants
            : allPlants.filter(plant => plant.name && plant.name.toLowerCase().includes(query));
        displayCards(filteredPlants);
    }

   
    db.collection("Plant Information").onSnapshot(snapshot => {

        console.log("Snapshot received, count:", snapshot.docs.length);

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
    });

    // Real-time search filtering
    searchInput.addEventListener('keyup', filterAndDisplayCards);
});