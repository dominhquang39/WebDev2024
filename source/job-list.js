document.addEventListener('DOMContentLoaded', function() {
    localStorage.removeItem('filteredJobs');
    localStorage.removeItem('jobFilters');
    localStorage.removeItem('activeTab');
    
    const jobListingsContainer = document.getElementById('job-listings');
    const jobFilterForm = document.getElementById('job-filter-form');
    const keywordInput = document.getElementById('keyword');
    const locationInput = document.getElementById('location');
    const categoryInput = document.getElementById('category');
    const tabs = document.querySelectorAll('.tab-button');
    const paginationControls = document.getElementById('pagination-controls');

    let currentPage = 1;
    const jobsPerPage = 5;
    let allJobs = [];
    let filteredJobs = [];
    let activeTab = localStorage.getItem('activeTab') || 'all';

    // Load saved filter state from localStorage
    const savedFilters = JSON.parse(localStorage.getItem('jobFilters')) || {};
    if (savedFilters.keyword) keywordInput.value = savedFilters.keyword;
    if (savedFilters.location) locationInput.value = savedFilters.location;
    if (savedFilters.category) categoryInput.value = savedFilters.category;

    // Fetch the job data
    fetch('../../source/job.json')
        .then(response => response.json())
        .then(data => {
            allJobs = data;

            // Check if there are saved filtered jobs and search filters
            filteredJobs = JSON.parse(localStorage.getItem('filteredJobs')) || allJobs;
            applyTabFiltering(activeTab); // Initial display based on active tab
        })
        .catch(error => {
            console.error('Error fetching jobs:', error);
            jobListingsContainer.innerHTML = '<p>Failed to load job listings.</p>';
        });

    // Function to filter jobs based on the active tab
    function applyTabFiltering(tab) {
        // Filter jobs based on the active tab
        filteredJobs = allJobs.filter(job => {
            if (tab === 'all') return true;
            return job.category === tab.replace('_', ' '); // Tab names must match job categories
        });

        // Reapply search filters
        const keyword = keywordInput.value.toLowerCase().trim();
        const location = locationInput.value.toLowerCase().trim();
        const category = categoryInput.value;

        // Apply search filters
        filteredJobs = filteredJobs.filter(job => {
            let matches = true;
            if (keyword && !job.title.toLowerCase().includes(keyword)) matches = false;
            if (location && !job.country.toLowerCase().includes(location)) matches = false;
            if (category && category !== job.category) matches = false;
            return matches;
        });

        localStorage.setItem('activeTab', tab); // Save active tab to localStorage
        displayJobsForPage(filteredJobs, currentPage);
        setupPagination(filteredJobs);
    }

    // Add event listeners to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            activeTab = this.getAttribute('data-tab');
            applyTabFiltering(activeTab);
        });
        // Highlight the saved active tab when the page reloads
        if (tab.getAttribute('data-tab') === activeTab) {
            tab.classList.add('active');
        }
    });

    // Function to display jobs for the current page
    function displayJobsForPage(jobs, page) {
        const start = (page - 1) * jobsPerPage;
        const end = start + jobsPerPage;
        const jobsToShow = jobs.slice(start, end);

        displayJobs(jobsToShow, jobListingsContainer);
        updatePagination(page, Math.ceil(jobs.length / jobsPerPage));
    }

    // Function to setup pagination buttons
    function setupPagination(jobs) {
        const totalPages = Math.ceil(jobs.length / jobsPerPage);
        paginationControls.innerHTML = ''; 
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.add('pagination-btn');
            if (i === currentPage) pageButton.classList.add('active');

            // Add click event to navigate to the selected page
            pageButton.addEventListener('click', function() {
                currentPage = i;
                displayJobsForPage(filteredJobs, currentPage);
            });

            paginationControls.appendChild(pageButton);
        }
    }

    // Function to update the active state of pagination buttons
    function updatePagination(current, total) {
        const buttons = paginationControls.querySelectorAll('button');
        buttons.forEach((button, index) => {
            button.classList.toggle('active', index + 1 === current);
        });
    }

    // Function to display jobs in the container
    function displayJobs(jobs, container) {
        container.innerHTML = ''; // Clear previous job listings

        if (jobs.length === 0) {
            container.innerHTML = '<p>No jobs found.</p>';
        } else {
            jobs.forEach((job) => {
                const jobListing = document.createElement('li');
                jobListing.classList.add('job-listings');

                jobListing.innerHTML = `
                    <div class="job-header">
                        <img src="../../${job.logo}" alt="${job.title} Logo" class="company-logo">
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

                // Add click event to navigate to job details
                jobListing.addEventListener('click', function () {
                    localStorage.setItem('currentPage', currentPage);
                    localStorage.setItem('activeTab', activeTab);
                    localStorage.setItem('jobFilters', JSON.stringify({
                        keyword: keywordInput.value,
                        location: locationInput.value,
                        category: categoryInput.value
                    }));
                    localStorage.setItem('selectedJobId', job.id); 
                    window.location.href = `DetailedJob.html?jobId=${job.id}`;
                });

                container.appendChild(jobListing);
            });
        }
    }

    // Handle form submission and filtering
    jobFilterForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent page reload

        currentPage = 1; // Reset to the first page on new search
        localStorage.setItem('currentPage', currentPage);

        // Save current filters
        const filters = {
            keyword: keywordInput.value,
            location: locationInput.value,
            category: categoryInput.value
        };
        localStorage.setItem('jobFilters', JSON.stringify(filters));

        // Filter jobs based on the search inputs
        applyTabFiltering(activeTab); // Reapply the tab filtering to ensure correct jobs are shown
    });

    // Restore the previous pagination state if it exists
    if (localStorage.getItem('currentPage')) {
        currentPage = parseInt(localStorage.getItem('currentPage'));
    }

    // Display jobs for the current tab when the page reloads
    applyTabFiltering(activeTab);
});
