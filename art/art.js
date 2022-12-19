// TODO: when I come back, create a list of all the images, and then when any of the images is clicked on, we can
//  enlarge it using a modal. Also finish copying in the code from the example. I might also want to set the modal
//  to a certain size so that its not too large.


// Get the modal image tag
let modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
// window.onload = function(){
//     let span = document.getElementsByClassName("close")[0];
// }

let modalImage = document.getElementById("modal-image");

// // When the user clicks the big picture, set the image and open the modal
// modal.onclick = function (e) {
//     var src = e.srcElement.src;
//     modal.style.display = "block";
//     modalImage.src = src;
// };

// When the user clicks on <span> (x), close the modal
window.onload = function(){
    span.onclick = function () {
        modal.style.display = "none";
        cosole.log("clicked")
    };
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// TODO: note this -> Ok so there's something slightly werid with permisions where in... I need to have the modal and modalImage vars inside here
function galleryFunction1(smallImg) {
    // TODO: yeah so the issue is that these vars have to be defined within this function...
    let src = smallImg.src;
    var modal = document.getElementById("myModal");
    var modalImage = document.getElementById("modal-image");
    console.log(src)
    modal.style.display = "block";
    modalImage.src = src;
}

// Add a function to close the modal when the user clicks on the span element (the x)
function closeFunction() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}


