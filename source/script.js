// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
    const jobListings = document.querySelectorAll('.job-listing');

    // Function to check if the element is in the viewport
    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // Function to add the float-in class when in viewport
    const floatInJobListings = () => {
        jobListings.forEach((listing) => {
            if (isElementInViewport(listing)) {
                listing.classList.add('visible'); // Ensure visible is applied
                listing.classList.add('float-in'); // Add the float-in class here
            }
        });
    };

    // Initial check when the page loads
    floatInJobListings();

    // Check on scroll
    window.addEventListener('scroll', floatInJobListings);
});
