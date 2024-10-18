// Home Page Func

// Function to animate the numbers over a given duration
function animateNumber(element, start, end, duration, step) {
    let startTime = null;
    const totalIncrements = Math.ceil((end - start) / step); // Calculate the number of increments
    const incrementDuration = duration / totalIncrements;    // Calculate how long each increment should take

    function updateNumber(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        
        // Calculate the current number based on elapsed time and step value
        const increment = Math.floor(elapsedTime / incrementDuration);
        const currentNumber = Math.min(start + increment * step, end); // Ensure we don't exceed the target

        element.textContent = currentNumber.toLocaleString(); // Format number with commas

        // Continue the animation if the current number is less than the target
        if (currentNumber < end) {
            requestAnimationFrame(updateNumber);
        }
    }

    requestAnimationFrame(updateNumber);
}

// IntersectionObserver to detect when the counters are visible
const observerOptions = {
    threshold: 0.5, // Trigger when 50% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberElement = entry.target;
            const targetNumber = parseInt(numberElement.getAttribute('data-target').replace(/,/g, '')); // Remove commas for parsing
            const startNumber = parseInt(numberElement.getAttribute('data-start')) || 0; // Read initial start number, default to 0
            const stepValue = parseInt(numberElement.getAttribute('data-step')) || 1;   // Read step value, default to 1

            animateNumber(numberElement, startNumber, targetNumber, 1000, stepValue); // Set duration to 2000ms (2 seconds)
            // observer.unobserve(entry.target); // Stop observing once animation starts
        }
    });
}, observerOptions);

// Observe each number element
document.querySelectorAll('.number').forEach(number => {
    observer.observe(number);
});


window.addEventListener('scroll', function() {
    const reviewSection = document.querySelector('.review-container');
    const reviewPosition = reviewSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3; // Adjust this value to control when the animation starts

    // Check if the review section has entered the viewport
    if (reviewPosition < screenPosition) {
        document.querySelector('.float-in-left').classList.add('active');
        document.querySelector('.float-in-right').classList.add('active');
    }
});