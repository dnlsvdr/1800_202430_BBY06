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
});
