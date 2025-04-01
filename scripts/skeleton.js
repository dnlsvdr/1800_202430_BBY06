document.addEventListener('DOMContentLoaded', () => {
  const home = document.getElementById('home');
  if (home) {
      home.addEventListener('click', () => {
          window.location.href = 'home.html';
      });
  }

  const settings = document.getElementById('settings');
  if (settings) {
      settings.addEventListener('click', () => {
          window.location.href = 'settings.html';
      });
  }

  const review = document.getElementById('comments');
  if (review) {
      review.addEventListener('click', () => {
          window.location.href = 'review.html';
      });
  }
  
});

document.addEventListener("DOMContentLoaded", function() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          const uid = user.uid;
          db.collection("users").doc(uid)
            .collection("theme").doc("color code")
            .get()
            .then(doc => {
              let savedColor = "#ffffff";  // Default color white
              if (doc.exists && doc.data().value) {
                savedColor = doc.data().value;
              }
              console.log("Retrieved saved theme color:", savedColor);
              document.body.style.backgroundColor = savedColor;
    
              // Helper function to determine if a hex color is dark
              function isDarkColor(hex) {
                // Remove the '#' if present
                if (hex[0] === '#') {
                  hex = hex.slice(1);
                }
                // Expand shorthand form (e.g. "03F") to full form ("0033FF")
                if (hex.length === 3) {
                  hex = hex.split('').map(char => char + char).join('');
                }
                // Convert hex to RGB values
                var r = parseInt(hex.substr(0, 2), 16);
                var g = parseInt(hex.substr(2, 2), 16);
                var b = parseInt(hex.substr(4, 2), 16);
                // Calculate brightness using the luminance formula
                var brightness = (r * 299 + g * 587 + b * 114) / 1000;
                return brightness < 128;
              }
    
              // Set text color based on background brightness
              let textColor = isDarkColor(savedColor) ? "#ffffff" : "#000000";
              document.body.style.color = textColor;
    
              // Apply to list group items
              document.querySelectorAll('.list-group-item').forEach(item => {
                item.style.backgroundColor = savedColor;
                item.style.color = textColor;
              });
            })
            .catch(error => {
              console.error("Error retrieving theme color:", error);
            });
        }
      });

const currentPage = window.location.pathname.split("/").pop();

if (currentPage === "home.html") {
  document.querySelector("#home img").classList.add("active-icon");
} else if (currentPage === "review.html") {
  document.querySelector("#comments img").classList.add("active-icon");
} else if (currentPage === "settings.html") {
  document.querySelector("#settings img").classList.add("active-icon");
}


});