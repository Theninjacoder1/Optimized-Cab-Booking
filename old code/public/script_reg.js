async function validateForm() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value; // Now correctly defined
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate password match
    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return false;
    }

    // Prepare data for submission
    const formData = {
        name,
        phone,
        email, // Added email to the object
        password,
    };

    try {
        const response = await fetch('mongodb://localhost:27017/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message); // Show success message
            document.getElementById('registrationForm').reset(); // Optionally clear the form
        } else {
            alert(data.message); // Show error message
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while registering. Please try again.');
    }
}
