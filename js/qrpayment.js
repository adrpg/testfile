// Retrieve the total amount from localStorage or use a default amount for testing
const totalAmount = JSON.parse(localStorage.getItem('totalAmount')) || 500;  // Set a default amount if not provided
document.getElementById('total-amount').innerText = totalAmount;

// URL or data to encode in the QR code (replace with your payment URL or UPI link)
const paymentUrl = `https://example.com/pay?amount=${totalAmount}`;  // Example payment URL

// Generate the QR code
const qrcode = new QRCode(document.getElementById('qrcode'), {
    text: paymentUrl,  // The payment URL or UPI link
    width: 256,        // QR code size
    height: 256
});

// Timer setup
let timeLeft = 300;  // 5 minutes = 300 seconds
const timeLeftDisplay = document.getElementById('time-left');

// Function to update the countdown every second
function updateTimer() {
    if (timeLeft >= 0) {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        // Display formatted time (MM:SS) in timer
        timeLeftDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Decrease timeLeft by 1 second
        timeLeft--;

    } else {
        // If time runs out, show the order confirmation
        clearInterval(countdownTimer);
        showOrderConfirmation();
    }
}

// Start the timer (updates every 1 second)
const countdownTimer = setInterval(updateTimer, 1000);

// Simulate payment detection (for testing)
function checkPaymentCompletion() {
    // Simulate payment completion after 10 seconds (for testing)
    setTimeout(() => {
        // Stop the timer
        clearInterval(countdownTimer);
        
        // Show the order confirmation when payment is detected
        showOrderConfirmation();
    }, 10000);  // Simulated 10-second delay (replace with actual payment detection)
}

// Show order confirmation and pickup/delivery options
function showOrderConfirmation() {
    // Change the header to "Payment Successful!"
    document.querySelector('.qr-container h1').innerText = "Payment Successful!";
    
    // Hide the QR code and timer
    document.getElementById('qrcode').style.display = 'none';
    document.getElementById('time-left').style.display = 'none';

    // Show the order confirmation message and options
    document.getElementById('order-confirmation').style.display = 'block';
}

// Event listeners for the pick-up and delivery options
document.getElementById('self-pickup').addEventListener('click', () => {
    alert('You selected Self Pick-Up.');
    // Handle pick-up logic here
});

document.getElementById('delivery').addEventListener('click', () => {
    alert('You selected Delivery.');
    // Handle delivery logic here
});

// Start checking for payment completion (this is a placeholder)
checkPaymentCompletion();
