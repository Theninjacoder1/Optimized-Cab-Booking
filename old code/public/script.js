document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieve form data
    const pickup = document.getElementById('pickup').value;
    const destination = document.getElementById('destination').value;
    const time = document.getElementById('time').value;
    const payment = document.getElementById('payment').value;

    // Check that all fields are filled out
    if (!destination) {
        alert('Please select a destination.');
        return;
    }
    if (!time) {
        alert('Please select a time.');
        return;
    }
    if (!payment) {
        alert('Please select a payment method.');
        return;
    }

    // Confirm booking details with the user
    const confirmation = confirm(`Confirm booking:\nPickup: ${pickup}\nDestination: ${destination}\nTime: ${time}\nPayment Method: ${payment}`);
    if (!confirmation) return;

    // Submit the form if all validations pass
    this.submit();
});
