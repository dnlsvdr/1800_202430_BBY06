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

    const review = document.getElementById('review');
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
          })
          .catch(error => {
            console.error("Error retrieving theme color:", error);
          });
      }
    });
  });
  