const toggle = document.querySelector('#toggle-mode');

// check if mode is already saved in localStorage
const currentMode = localStorage.getItem('mode');
if (currentMode) {
    document.documentElement.classList.add(currentMode);
}

toggle.addEventListener('click', function() {
    // get current mode
    console.log("click!")
    const currentMode = localStorage.getItem('mode');
    // toggle mode
    if (currentMode === 'dark') {
        document.documentElement.classList.remove('dark-mode');
        localStorage.setItem('mode', 'light-mode');
    } else {
        document.documentElement.classList.add('dark-mode');
        document.documentElement.classList.add("yolo");
        localStorage.setItem('mode', 'dark-mode');
    }
});
