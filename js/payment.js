// Retrieve the total amount from localStorage
const totalAmount = JSON.parse(localStorage.getItem('totalAmount')) || 0;
document.getElementById('total-amount').innerText = `Total Amount: Rs. ${totalAmount}`;

// Handle "Pay Now" button click
document.getElementById('pay-now').addEventListener('click', function() {
    // Redirect to the QR code payment page
    window.location.href = 'qrpayment.html';
});

// Handle "Pay Later" button click
document.getElementById('pay-later').addEventListener('click', function() {
    alert('Order placed! You chose to pay later.');
    // Optionally, add logic to save the pay-later option in your system
});
