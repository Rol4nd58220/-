// Add this to your script.js file

function simulateLoading() {
    var loadingBar = document.getElementById("loadingBar");
    var width = 0;
    var interval = setInterval(frame, 20);

    function frame() {
        if (width >= 100) {
            clearInterval(interval);
            // Hide the loading bar and show your main content here if necessary
        } else {
            width++;
            loadingBar.style.width = width + '%';
        }
    }
}

window.onload = simulateLoading;
