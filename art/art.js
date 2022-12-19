// Wait for DOM to Load
function OnLoad() {
    // Get DOM Elements
    const modal = document.getElementById("my-modal");
    const modalImage = document.getElementById("modal-image");
    // Get this element `<span class="close-btn">&times;</span>`
    const closeBtn = document.getElementsByClassName("close-btn")[0];

    console.log(closeBtn);
    console.log(modalImage);
    console.log(modal);

    // Events
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', outsideClick);

    // Reference to the figure elements
    var figures = document.querySelectorAll("figure");


    // Bind a click event listener to each image element
    for (var i = 0; i < figures.length; i++) {
        figures[i].addEventListener("click", function (event) {
            console.log(event.target);
            console.log(event.target.src);
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
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    }
}

window.onload = OnLoad;
