// Wait for DOM to Load
function OnLoad() {
    // Get DOM Elements
    const modal = document.getElementById("my-modal");
    const modalImage = document.getElementById("modal-image");
    const modalContent = document.getElementsByClassName("modal-content")[0];
    const closeBtn = document.getElementsByClassName("close-btn")[0];

    // Events
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', outsideClick);

    // Reference to the figure elements
    var figures = document.querySelectorAll("figure");


    // Bind a click event listener to each image element
    for (var i = 0; i < figures.length; i++) {
        figures[i].addEventListener("click", function (event) {
            // Set the src attribute of the enlarged image element to the src of the clicked image
            modalImage.src = event.target.src;
            // Show the image modal
            modal.style.display = "block";
        });
    }


    // Other functions

    // Close
    function closeModal() {
        modal.style.display = 'none';
    }

    // Close If Outside Click
    function outsideClick(e) {
        if (e.target == modal || e.target == modalContent) {
            modal.style.display = 'none';
        }
    }
}

window.onload = OnLoad;
