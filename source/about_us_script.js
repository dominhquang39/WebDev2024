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