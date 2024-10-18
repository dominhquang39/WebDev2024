document.addEventListener('DOMContentLoaded', function () {
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    function setApplyBtnListener() {
        var popup = document.getElementById("applyPopup");
        var btn = document.getElementById("applyBtn");
        var span = document.getElementsByClassName("close")[0];

        if (btn) {
            btn.onclick = function() {
                popup.classList.add('show');
                popup.style.display = "block";
            }
        }

        if (span) {
            span.onclick = function() {
                popup.classList.remove('show');
                setTimeout(() => {
                    popup.style.display = "none";
                }, 300);
            }
        }

        window.onclick = function(event) {
            if (event.target == popup) {
                popup.classList.remove('show');
                setTimeout(() => {
                    popup.style.display = "none"; 
                }, 300);
            }
        }
    }
    const jobId = getQueryParam('jobId');

    if (jobId !== null) {
        fetch('../../source/job.json')
            .then(response => response.json())
            .then(data => {
                const job = data.find(job => job.id == jobId); // Find job by ID

                if (job) {
                    document.getElementById('job-description').innerHTML = `
                            <!-- Job Card Section -->
                            <div class="job-card">
                                <div class="job-card-wrapper">
                                    <div class="job-card-header">
                                        <!-- Company Logo -->
                                        <div class="job-company-logo">
                                            <img src="../../${job.logo}" alt="Apple Logo" class="company-logo-img">
                                        </div>

                                        <!-- Job Info and Badges -->
                                        <div class="job-info">
                                            <div class="job-title-and-badges">
                                                <h3 class="job-title">${job.title}</h3>
                                                <span class="job-status-badge job-featured-badge">Featured</span>
                                                <span class="job-status-badge job-full-time-badge">${job.jobType}</span>
                                            </div>

                                            <div class="job-links">
                                                <a href="#">
                                                    <span class="job-icons">🌐</span> companywebsite.com
                                                </a>
                                                <a href="#">
                                                    <span class="job-icons">📞</span> +123456789
                                                </a>
                                                <a href="#">
                                                    <span class="job-icons">✉️</span> hr@company.com
                                                </a>
                                            </div>
                                        </div>

                                        <!-- Apply Now Button (Top Right) -->
                                        <a href="#" class="apply-now-btn" id="applyBtn">Apply Now</a>
                                    </div>

                                    <!-- Job Expiry Date -->
                                    <div class="job-expiry">
                                        Expiry Date: 2024-10-10
                                    </div>
                                </div>
                            </div>

                            <div class="job-layout">
                                <!-- Left Column -->
                                <div class="left-column">
                                    <div class="job-description">
                                        <h2>Job Description</h2>
                                        <p>
                                            Integer aliquet pretium consequat. Donec et sapien id leo accumsan pellentesque eget maximus tellus. 
                                            Duis et est ac leo rhoncus tincidunt vitae vehicula augue. Donec in suscipit diam. Pellentesque quis justo sit amet arcu commodo sollicitudin. 
                                            Integer finibus blandit condimentum. Vivamus sit amet ligula ullamcorper, pulvinar ante id, tristique erat. Quisque sit amet aliquam urna. Maecenas blandit felis id massa sodales finibus. 
                                            Integer bibendum eu nulla eu sollicitudin. Sed lobortis diam tincidunt accumsan faucibus. 
                                            Quisque blandit augue quis turpis auctor, dapibus euismod ante ultricies. Ut non felis lacinia turpis feugiat euismod at id magna. Sed ut orci arcu. 
                                            Suspendisse sollicitudin faucibus aliquet.
                                        </p>
                                        <p>
                                            Nam dapibus consectetur erat in euismod. Cras urna augue, mollis venenatis augue sed, porttitor aliquet nibh. 
                                            Sed tristique dictum elementum. Nulla imperdiet sit amet quam eget lobortis. Etiam in neque sit amet orci interdum tincidunt. </p>
                                    </div>
                            
                                    <div class="responsibilities">
                                        <h2>Responsibilities</h2>
                                        <ul>
                                            <li>Quisque semper gravida est et consectetur.</li>
                                            <li>Curabitur blandit lorem velit, vitae pretium leo placerat eget.</li>
                                            <li>Morbi mattis in ipsum ac tempus.</li>
                                            <li>Curabitur eu vehicula libero.</li>
                                            <li>vulputate turpis. Quisque ante odio, iaculis a porttitor sit amet.</li>
                                            <li>lobortis vel lectus. Nulla at risus ut diam.</li>
                                            <li>commodo feugiat. Nullam laoreet, diam placerat dapibus tincidunt.</li>
                                            <li>odio metus posuere lorem, id condimentum erat velit nec neque.</li>
                                            <li>dui sodales ut. Curabitur tempus augue.</li>

                                        </ul>
                                    </div>
                                </div>
                            
                                <!-- Right Column -->
                                <div class="right-column">
                                    <!-- Job Overview Box -->
                                    <div class="job-overview-box">
                                        <h3>Job Overview</h3>
                                        <div class="job-overview-details">
                                            <div class="overview-item">
                                                <img src="../../images/jobDetailedRelatedIcon/calendarPurple.png" alt="Job Posted Icon" class="icon"> 
                                                <span>Job Posted: 6 October, 2024</span>
                                            </div>
                                            <div class="overview-item">
                                                <img src="../../images/jobDetailedRelatedIcon/clock.png" alt="Job Expire Icon" class="icon"> 
                                                <span>Job Expire: 10 October, 2024</span>
                                            </div>
                                            <div class="overview-item">
                                                <img src="../../images/jobDetailedRelatedIcon/education.png" alt="Education Icon" class="icon"> 
                                                <span>Education: Graduation</span>
                                            </div>
                                            <div class="overview-item">
                                                <img src="../../images/jobDetailedRelatedIcon/wallet.png" alt="Salary Icon" class="icon"> 
                                                <span>Salary: ${job.salary}/month</span>
                                            </div>
                                            <div class="overview-item">
                                                <img src="../../images/jobDetailedRelatedIcon/locationPurple.png" alt="Location Icon" class="icon"> 
                                                <span>Location: New York, USA</span>
                                            </div>
                                            <div class="overview-item">
                                                <img src="../../images/jobDetailedRelatedIcon/briefcase.png" alt="Job Type Icon" class="icon"> 
                                                <span>Job Type: ${job.jobType}</span>
                                            </div>
                                            <div class="overview-item">
                                                <img src="../../images/jobDetailedRelatedIcon/skillsBar.png" alt="Experience Icon" class="icon"> 
                                                <span>Experience: 10-15 Years</span>
                                            </div>
                                        </div>
                                    </div>
                            
                                    <!-- Company Info Box -->
                                    <div class="company-info-box">
                                        <div class="company-header">
                                            <img class="job-company-logo" src="../../${job.logo}" alt="Company Logo">
                                            <h3>${job.company}</h3>
                                        </div>
                                        <div class="company-info-details">
                                            <p><strong>Found in:</strong> ${job.founded}</p>
                                            <p><strong>Organization type:</strong> ${job.organizationType}</p>
                                            <p><strong>Company size:</strong> ${job.companySize}</p>
                                            <p><strong>Phone:</strong> ${job.phone}</p>
                                            <p><strong>Email:</strong> ${job.email}</p>
                                            <p><strong>Website:</strong> <a href="#">${job.website}</a></p>
                                        </div>
                            
                                        <!-- Social Media Icons -->
                                        <div class="social-icons">
                                            <a href="#"><img src="../../images/socialMedia/facebook.png" alt="Facebook"></a>
                                            <a href="#"><img src="../../images/socialMedia/twitter.png" alt="Twitter"></a>
                                            <a href="#"><img src="../../images/socialMedia/instagram.png" alt="Instagram"></a>
                                            <a href="#"><img src="../../images/socialMedia/youtube.png" alt="YouTube"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    `;
                    document.getElementById('applyPopup').innerHTML = `
                    <div class="popup-content">
                        <span class="close">&times;</span>
                        <h2 class="popup-title">Apply Job: ${job.title}</h2>

                        <label for="resume">Choose Resume:</label>
                        <select id="resume">
                            <option value="">Select...</option>
                            <option value="computer">Upload from Computer</option>
                            <option value="website">Link from Website</option>
                        </select>

                        <label for="coverLetter">Cover Letter:</label>
                        <textarea id="coverLetter" placeholder="Write down your biography here..."></textarea>
                        <button id="submitBtn">Apply Now</button>
                    </div>
                    `;
                    setApplyBtnListener();

                } else {
                    document.getElementById('job-title').innerText = `Job not found`;
                }
            })
            .catch(error => {
                console.error('Error fetching job details:', error);
                document.getElementById('job-title').innerText = 'Error loading job details';
            });
    } else {
        document.getElementById('job-title').innerText = `No job selected`;
    }
});