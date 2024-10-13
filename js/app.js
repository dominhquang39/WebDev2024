document.addEventListener('DOMContentLoaded', function() {
    // Fetch the jobs.json file located in the js folder
    fetch("../js/job.json")
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const jobListingsContainer = document.getElementById('job-listings');
        const jobFilterForm = document.getElementById('job-filter-form');

        // Initially display all jobs
        displayJobs(data, jobListingsContainer);

        // Filter jobs when the form is submitted
        jobFilterForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from reloading the page

            const keyword = document.getElementById('keyword').value.toLowerCase();
            const location = document.getElementById('location').value.toLowerCase();
            const category = document.getElementById('category').value;

            // Apply filtering logic
            const filteredJobs = data.filter(job => {
                let matches = true;

                // Filter by keyword (in job title)
                if (keyword && !job.title.toLowerCase().includes(keyword)) {
                    matches = false;
                }

                // Filter by location (country)
                if (location && !job.country.toLowerCase().includes(location)) {
                    matches = false;
                }

                // Filter by category
                if (category && category !== job.category) {
                    matches = false;
                }

                return matches;
            });

            // Display filtered jobs
            displayJobs(filteredJobs, jobListingsContainer);
        });

        // Function to display jobs
        function displayJobs(jobs, container) {
            container.innerHTML = ''; // Clear existing job listings

            if (jobs.length === 0) {
                container.innerHTML = '<p>No jobs found.</p>';
            } else {
                jobs.forEach(job => {
                    const jobListing = document.createElement('div');
                    jobListing.classList.add('job-listing');

                    jobListing.innerHTML = `
                        <div class="job-header">
                            <img src="../img/${job.logo}" alt="${job.title} Logo" class="company-logo">
                            <div class="job-title-container">
                                <h3>${job.title}</h3>
                                <span class="job-type">${job.jobType}</span>
                            </div>
                            <button class="apply-button">Apply Now</button>
                        </div>
                        <div class="job-details">
                            <p><span class="location-icon"></span> ${job.country}</p>
                            <p><span class="salary-icon"></span> ${job.salary}</p>
                            <p><span class="time-icon"></span> ${job.timeRemaining}</p>
                        </div>
                    `;

                    container.appendChild(jobListing);
                });
            }
        }
    })
    .catch(error => {
        console.error('Error fetching jobs:', error);
        document.getElementById('job-listings').innerHTML = '<p>Failed to load job listings.</p>';
    });
});
