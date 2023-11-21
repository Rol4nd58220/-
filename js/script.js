function wrapLettersAndAnimate(textElementId, initialDelay) {
    const textElement = document.getElementById(textElementId);
    const text = textElement.textContent;
    textElement.innerHTML = '';
    textElement.style.opacity = "1";

    const letters = text.split('');
    letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.opacity = '0';
        span.style.animation = `fadeInUpBlur 1s forwards ${index * 100 + initialDelay}ms`;
        textElement.appendChild(span);
    });

    // Total time for the text to fully appear plus a bit of extra delay
    return (letters.length * 100 + initialDelay) + 1000; // Adjusted to add an extra 1 second
}

function startTextAnimations() {
    console.log("Starting text animations");

    const text1TotalTime = wrapLettersAndAnimate('text1', 1000); // Start Text 1 after 1 second
    const text2TotalTime = wrapLettersAndAnimate('text2', text1TotalTime + 200); // Start Text 2 after Text 1 completes, plus 200ms

    // Total time for all text animations to complete
    const totalTextAnimationTime = Math.max(text1TotalTime, text2TotalTime);

    // Apply fadeOutDownBlur animation to both texts and person-svg after a delay
    setTimeout(() => {
        console.log("Applying fadeOutDownBlur");
        document.querySelectorAll('#text1 span, #text2 span').forEach(span => {
            span.style.animation = `fadeOutDownBlur 1s forwards`;
        });

        // Smoothly fade out the person-svg
        const personSvg = document.getElementById('person-svg');
        personSvg.style.transition = 'opacity 1s';
        personSvg.style.opacity = '0';

        // Set black background for the homepage
        document.body.style.backgroundColor = '#ffff';
    }, totalTextAnimationTime + 1000); // 1 second after the last text animation completes
}

function updateLoading() {
    var loadingBar = document.querySelector('.progress');
    var loadingContainer = document.querySelector('.progress-loader');
    var loadingText = document.querySelector('.loading-percentage');
    var svgElement = document.getElementById('person-svg');
    var duration = 2000;
    var start = null;

    function frame(timestamp) {
        if (!start) start = timestamp;
        var progress = (timestamp - start) / duration * 100;
        var percentage = Math.min(100, Math.floor(progress));

        loadingBar.style.width = percentage + '%';
        loadingText.innerText = percentage + '%';

        if (percentage >= 100) {
            loadingContainer.classList.add('fade-out');
            loadingText.classList.add('fade-out');
            svgElement.classList.add('move-up');

            // Set black background directly here
            document.body.style.backgroundColor = '#000';

            startTextAnimations(); // Start text animations after loader finishes
            return;
        }

        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}

window.onload = updateLoading;
