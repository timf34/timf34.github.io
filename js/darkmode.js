// Keeping this block of code outside of event listeners to ensure that the theme is set on page load (no white flashes!)
const currentMode = localStorage.getItem('mode');
if (currentMode) {
    document.documentElement.classList.add(currentMode);
}

document.addEventListener("DOMContentLoaded", function() {
    const toggleMode = document.getElementById('toggle-mode');

    // Update toggle mode button if currentMode is set
    if (currentMode) {
        if (currentMode === "dark-mode") {
            toggleMode.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" aria-label="Moon Icon" fill="currentColor" stroke="none" width="30" height="30" class="inline-block" viewBox="0 0 20 20" id="dark-mode-icon"> <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path> </svg>';
        }
    }

    toggleMode.addEventListener('click', () => {
        console.log("clicked!");

        const currentMode = localStorage.getItem('mode');

        // Toggle mode
        if (currentMode === 'dark-mode') {
            document.documentElement.classList.remove('dark-mode');
            document.documentElement.classList.add('light-mode');
            localStorage.setItem('mode', 'light-mode');
            localStorage.setItem('theme', 'light-mode');

            // Set the src of the icon to the sun
            toggleMode.innerHTML = ' <img src="../components/svg/icons8-sun-64.svg" alt="Dark mode toggle" width="30" height="30"/>';
        } else {
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
            localStorage.setItem('mode', 'dark-mode');
            localStorage.setItem('theme', 'dark-mode');

            toggleMode.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" aria-label="Moon Icon" fill="currentColor" stroke="none" width="30" height="30" class="inline-block" viewBox="0 0 20 20" id="dark-mode-icon"> <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path> </svg>';
        }
    });
});
