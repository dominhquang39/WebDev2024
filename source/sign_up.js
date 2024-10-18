function checkValidateInputs() {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        alert("Please enter a valid Gmail address ending with '@gmail.com'.");
        emailInput.focus();
        return false;
    }

    if (passwordInput.value.length < 8) {
        alert("Password must be at least 8 characters long.");
        passwordInput.focus();
        return false;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
        alert("Passwords do not match. Please check and try again.");
        confirmPasswordInput.focus();
        return false;
    }

    return true; 
}

// Button click event listener for account creation
document.addEventListener("DOMContentLoaded", function () {
    const createAccountButton = document.getElementById("create-account-btn");

    createAccountButton.addEventListener("click", function (event) {
        event.preventDefault();

        if (areAllInputsFilled() && checkValidateInputs()) {
            // Redirect to HomePage.html if validation passes
            window.location.href = "HomePage.html";
        }
    });
});

// Helper function to check if all required inputs are filled
function areAllInputsFilled() {
    const form = document.querySelector("form");
    const requiredInputs = form.querySelectorAll("input[required]");

    for (let input of requiredInputs) {
        if (input.value.trim() === "") {
            alert(`${input.placeholder} is required.`);
            input.focus();
            return false;
        }
    }
    return true;
}
