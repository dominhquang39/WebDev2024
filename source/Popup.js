// Get the popup
var popup = document.getElementById("applyPopup");

// Get the button that opens the popup
var btn = document.getElementById("applyBtn");

// Get the <span> element that closes the popup
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the popup
btn.onclick = function() {
    popup.classList.add('show');
    popup.style.display = "block";
}

// click x, close popup
span.onclick = function() {
    popup.classList.remove('show');
    setTimeout(() => {
        popup.style.display = "none";
    }, 300);
}

// When the user clicks anywhere outside of the popup, close it
window.onclick = function(event) {
    if (event.target == popup) {
        popup.classList.remove('show'); 
        setTimeout(() => {
            popup.style.display = "none"; 
        }, 300); 
    }
}
