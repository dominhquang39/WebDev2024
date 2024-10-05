
       // Function to check if the job listing is in the viewport
        const isElementInViewport = (el) => {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };

        // Function to add visible class to job listings when they come into the viewport
        const checkJobListings = () => {
            const jobListings = document.querySelectorAll('.job-listing');
            jobListings.forEach(listing => {
                if (isElementInViewport(listing)) {
                    listing.classList.add('visible');
                }
            });
        };

        // Event listener for scrolling
        window.addEventListener('scroll', checkJobListings);
        // Initial check to see if any job listings are already in view
        window.addEventListener('load', checkJobListings);