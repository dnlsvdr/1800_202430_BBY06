document.getElementById("loginButton").addEventListener("click", function() {
  const email = document.getElementById("InputEmail").value;
  const password = document.getElementById("InputPassword").value;
  

  auth.signInWithEmailAndPassword (email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in:", user.email);
        alert("Login successful!");
        window.location.href = "home.html"; 
    })
    .catch((error) => {
        console.error("Login failed:", error.message);
        alert("Error: " + error.message);
    });

});
document.getElementById("signUpButton").addEventListener("click", function() {
  const email = document.getElementById("InputEmail").value;
  const password = document.getElementById("InputPassword").value;

  auth.createUserWithEmailAndPassword( email, password)
    .then((userCredential) => {
        var user = userCredential.user;
        console.log("User registered:", user.email);
        alert("Sign-up successful!");
        window.location.href = "home.html"; 
    })
    .catch((error) => {
        console.error("Sign-up failed:", error.message);
        alert("Error: " + error.message);
    });
});


  