// Global variable to store the full plant info, including fields not displayed.
let fetchedPlantData = {};

function displayPlantInfo() {
  let params = new URL(window.location.href);
  let ID = params.searchParams.get("docID");
  console.log("Fetching plant with docID:", ID);

  db.collection("Plant Information")
    .doc(ID)
    .get()
    .then(doc => {
      if (doc.exists) {
        // Save the full document data for later use
        fetchedPlantData = doc.data();

        // Display only specific fields
        document.getElementById("plantName").innerHTML = fetchedPlantData.name;
        document.querySelector(".plant-img").src = fetchedPlantData.image2;
        
        document.getElementById("description").innerHTML = fetchedPlantData.description;
      } else {
        console.error("No such document in Plant Information!");
      }
    })
    .catch(error => {
      console.error("Error fetching plant document:", error);
    });
}

displayPlantInfo();

document.getElementById("addPlantBtn").addEventListener("click", function () {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    console.error("User is not logged in.");
    return;
  }
  const userUID = currentUser.uid;

  // Create plantData using the displayed fields plus any extra fields from the fetched data.
  // For example, here we add "water" and "careGuide" (if they exist in fetchedPlantData).
  const plantData = {
    name: document.getElementById("plantName").textContent,
    image2: document.querySelector(".plant-img").src,
    description: document.getElementById("description").innerHTML,
    image: fetchedPlantData.image, 
    sunlight: fetchedPlantData.sunlight,
    fertilize: fetchedPlantData.fertilizer,
    water: fetchedPlantData.water || "",     
    careGuide: fetchedPlantData.careGuide || "",
    type: fetchedPlantData.type || "" 
  };

  db.collection("users")
    .doc(userUID)
    .collection("plants")
    .add(plantData)
    .then(function (docRef) {
      console.log("Plant added with ID:", docRef.id);
      window.location.href = "home.html";
    })
    .catch(function (error) {
      console.error("Error adding document:", error);
    });
});