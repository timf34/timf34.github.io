// TODO: when I come back, create a list of all the iamges, and then when any of the images is clicked on, we can
//  enlarge it using a modal. Also finish copying in the code from the example. I might also want to set the modal
//  to a certain size so that its not too large.


let imageBox1 = document.getElementById("imageBox1");

// Get the modal image tag
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var modalImage = document.getElementById("modal-image");

// When the user clicks the big picture, set the image and open the modal
imageBox1.onclick = function (e) {
    var src = e.srcElement.src;
    modal.style.display = "block";
    modalImage.src = src;
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// TODO: note this -> Ok so there's something slightly werid with permisions where in... I need to have the modal and modalImage vars inside here
function galleryFunction1(smallImg) {
    var src = smallImg.src;
    var modal = document.getElementById("myModal");
    var modalImage = document.getElementById("modal-image");
    console.log(src)
    modal.style.display = "block";
    modalImage.src = src;
    console.log("yolo bitches")
}
