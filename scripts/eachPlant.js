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

  db.collection("users") //user collection
    .doc(uid) //user uid (document)
    .collection("plants")//plant sub collection
    .doc(plantDocID)
    .get()
    .then(doc => {
      if (doc.exists) {
        let thisPlant = doc.data();
        let plantImage = thisPlant.image;           // URL for the plant image
        let plantName = thisPlant.name;             // Plant name
        let plantDescription = thisPlant.description; // Plant description
        let plantCareGuide = thisPlant.careGuide;     // Plant care guide


        document.getElementById("plantName").innerHTML = plantName;
        document.querySelector(".plant-img").src = plantImage;
        document.getElementById("description").innerHTML = plantDescription;
        document.getElementById("careGuide").innerHTML = plantCareGuide;
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
      waterScheduleContent.classList.add("hidden");//will hide the water reminder tab once plant info is clicked
      plantInfoTab.classList.add("active");
      waterScheduleTab.classList.remove("active");
  });

  waterScheduleTab.addEventListener("click", function() {
      plantInfoContent.classList.add("hidden"); //will hide the plant into tab once water reminder is clicked
      waterScheduleContent.classList.remove("hidden");
      plantInfoTab.classList.remove("active");
      waterScheduleTab.classList.add("active");
  });


  
});


