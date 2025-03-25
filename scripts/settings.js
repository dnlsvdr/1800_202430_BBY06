$(document).ready(function () {
    $(".settings").click(function () {
        $(".settings-container").toggle(); // Show/Hide settings when gear icon is clicked
    });
});

// JavaScript for Theme, About The App, and Home button functionality
document.addEventListener("DOMContentLoaded", () => {
    const themeButton = document.querySelector("button:nth-of-type(1)");
    const aboutButton = document.querySelector("button:nth-of-type(2)");
    const homeButton = document.querySelector(".home");

    if (!themeButton || !aboutButton || !homeButton) {
        console.error("Buttons not found. Check your HTML structure.");
        return;
    }

    // Simplified color picker on button click
    themeButton.addEventListener("click", () => {
        const colorPicker = document.createElement("input");
        colorPicker.type = "color";
        colorPicker.style.display = "none";

        document.body.appendChild(colorPicker);

        colorPicker.addEventListener("input", (event) => {
            document.body.style.backgroundColor = event.target.value;
        });

        colorPicker.click();
        document.body.removeChild(colorPicker);
    });

    // About The App navigation (redirect to about.html)
    aboutButton.addEventListener("click", () => {
        window.location.href = "about.html";
    });

    // Home button navigation (redirect to home.html)
    homeButton.addEventListener("click", () => {
        window.location.href = "home.html";
    });
});













