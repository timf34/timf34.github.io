// Setting some vars as global so they can be accessed by the prevImage and nextImage functions
var figures;


// Wait for DOM to Load
window.onload = function() {
    // Get DOM Elements
    const modal = document.getElementById("my-modal");
    const modalImage = document.getElementById("modal-image");
    const modalContent = document.getElementsByClassName("modal-content")[0];
    const closeBtn = document.getElementsByClassName("close-btn")[0];

    // Events
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', outsideClick);

    // Reference to the figure elements
    figures = document.querySelectorAll("figure");


    // Bind a click event listener to each image element
    for (var i = 0; i < figures.length; i++) {
        figures[i].addEventListener("click", function (event) {
            // Check if an image was clicked on (so we only open a modal if an image was clicked)
            if (event.target.tagName === "IMG") {
                // Set the src attribute of the enlarged image element to the src of the clicked image
                modalImage.src = event.target.src;
                // Show the image modal
                modal.style.display = "block";
            }
        });
    }

    // Close
    function closeModal() {
        modal.style.display = 'none';
    }

    // Close If Outside Click
    function outsideClick(e) {
        if ((e.target == modal || e.target == modalContent) && modal.style.display == "block") {
            modal.style.display = 'none';
        }
    }

}

// If clicked, move to the previous image in the gallery
function changeImage(mode){
    const modalImage = document.getElementById("modal-image");
    var prev = modalImage.src;
    var _iterator_src;
    for (var i = 0; i < figures.length; i++) {
        _iterator_src = figures[i].querySelector('img').src;
        console.log(_iterator_src);
        if (_iterator_src === prev) {
            if (mode === "prev") {
                if (i === 0) {
                    modalImage.src = figures[figures.length - 1].querySelector('img').src;
                } else {
                    modalImage.src = figures[i - 1].querySelector('img').src;
                }
                break;
            }
            if (mode === "next") {
                if (i === figures.length - 1) {
                    modalImage.src = figures[0].querySelector('img').src;
                } else {
                    modalImage.src = figures[i + 1].querySelector('img').src;
                }
                break;
            }
        }
    }
}
