document.addEventListener('DOMContentLoaded', function() {
    // Locate the Theme button (assuming its text is "Theme")
    const themeButton = Array.from(document.querySelectorAll('button.btn.btn-success.w-100.mb-2'))
      .find(btn => btn.textContent.trim() === "Theme");
    if (!themeButton) return;
  
    // Function to show the color picker modal
    function showColorPickerModal() {
      // Create modal overlay with improved styling
      const modalOverlay = document.createElement('div');
      Object.assign(modalOverlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '10000'
      });
  
      // Create modal content container with a card-like look
      const modalContent = document.createElement('div');
      Object.assign(modalContent.style, {
        backgroundColor: '#fff',
        padding: '30px 20px',
        borderRadius: '10px',
        textAlign: 'center',
        minWidth: '320px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
      });
  
      // Create text input for manual hex code entry (on top)
      const hexInput = document.createElement('input');
      hexInput.type = 'text';
      hexInput.value = '#ffffff';
      hexInput.placeholder = "Enter hex color (e.g., #ff0000)";
      Object.assign(hexInput.style, {
        width: '90%',
        padding: '12px',
        marginBottom: '20px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '5px'
      });
      modalContent.appendChild(hexInput);
  
      // Create native color picker input (directly below the text input)
      const colorPicker = document.createElement('input');
      colorPicker.type = 'color';
      colorPicker.value = '#ffffff';
      Object.assign(colorPicker.style, {
        display: 'block',
        margin: '0 auto 20px auto',
        border: 'none',
        width: '60px',
        height: '60px',
        cursor: 'pointer'
      });
      modalContent.appendChild(colorPicker);
  
      // Append modal content to overlay, then overlay to body
      modalOverlay.appendChild(modalContent);
      document.body.appendChild(modalOverlay);
  
      // Function to update the theme color
      function updateThemeColor(selectedColor) {
        console.log("Updating theme color to", selectedColor);
        document.body.style.backgroundColor = selectedColor;
        // Sync inputs
        colorPicker.value = selectedColor;
        hexInput.value = selectedColor;
        const user = firebase.auth().currentUser;
        if (user) {
          const uid = user.uid;
          db.collection("users").doc(uid)
            .collection("theme").doc("color code")
            .set({ value: selectedColor })
            .then(() => {
              console.log("Theme color saved:", selectedColor);
            })
            .catch((error) => {
              console.error("Error saving theme color:", error);
            });
        }
      }
  
      // Listen for changes from the color picker
      colorPicker.addEventListener("input", function() {
        updateThemeColor(colorPicker.value);
      });
  
      // Listen for manual hex input (update if valid)
      hexInput.addEventListener("input", function() {
        const val = hexInput.value;
        if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
          updateThemeColor(val);
        }
      });
  
      // Close modal if clicking outside modal content
      modalOverlay.addEventListener("click", function(e) {
        if (e.target === modalOverlay) {
          document.body.removeChild(modalOverlay);
        }
      });
    }
  
    // When the Theme button is clicked, show the modal pop-up.
    themeButton.addEventListener("click", function() {
      showColorPickerModal();
    });
  });
  