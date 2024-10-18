document.addEventListener('DOMContentLoaded', function () {
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    function getRandomJobIDs(data){
        let jobRecommendList = []
        let haveId = []
        haveId.push(Number(getQueryParam('jobId')))
        for (let i = 0; i < 6; i ++){
            let randomID = Math.floor((Math.random() * 29) + 1)
            while (haveId.indexOf(randomID) !== -1){
                randomID = Math.floor((Math.random() * 29) + 1)
            }
            let recommendedJob = data.find(job => job.id == randomID)
            jobRecommendList.push(recommendedJob)
        }
        return jobRecommendList
    }

    function displayRecommendedJob(jobRecommendList){
        container = document.getElementById('related-job')
        container.innerHTML = ''; // Clear previous job listings

        if (jobRecommendList.length === 0) {
            container.innerHTML = '<p>No jobs found.</p>';
        } else {
            jobRecommendList.forEach((job) => {
                const jobRecommended = document.createElement('div');
                jobRecommended.classList.add('related-job-card')
                jobRecommended.innerHTML = `
                    <div class="related-job-header">
                    <img src="../../${job.logo}" alt="${job.title}">
                    <h3>${job.title}</h3>
                    <span class="related-badge">Featured</span>
                    </div>
                    <div class="related-job-location">
                        <img src="../../images/jobDetailedRelatedIcon/location.png" alt="Location Icon"> ${job.country}
                    </div>
                    <div class="related-job-salary">${job.salary}</div>
                `

                jobRecommended.addEventListener('click', function () {
                    window.location.href = `DetailedJob.html?jobId=${job.id}`;
                });
                container.appendChild(jobRecommended);
            });
        }
    }

    fetch('../../source/job.json')
        .then(response => response.json())
        .then(data => {
            let jobData = data
            let jobRecommendList = getRandomJobIDs(jobData)

            displayRecommendedJob(jobRecommendList)
        })
        .catch(error => {
            console.error('Error fetching job details:', error);
        });

})





