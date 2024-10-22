
// Retrieve cart items from localStorage or initialize as an empty array
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const cartItemsList = document.getElementById('cart-items-list');
const totalPrice = document.getElementById('total-price');

// Function to render the cart items and total price
function renderCart() {
    cartItemsList.innerHTML = '';  // Clear the list first
    let totalAmount = 0;

    cartItems.forEach((item, index) => {
        const listItem = document.createElement('li');

        // Calculate total for the current item
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;

        // Insert HTML for cart item with quantity controls and price
        listItem.innerHTML = `
            <div class="item-details">
                <span>${item.name}</span>
            </div>
            <div class="item-controls">
                <div class="quantity-controls">
                    <button onclick="decreaseQuantity(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${index})">+</button>
                </div>
                <div class="item-price">Rs. ${itemTotal}</div>
            </div>
        `;
        cartItemsList.appendChild(listItem);
    });

    // Update the total price
    totalPrice.innerHTML = `Total: Rs. ${totalAmount}`;
}

// Function to decrease the quantity of an item in the cart
function decreaseQuantity(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
    } else {
        // If quantity is 1, remove the item from the cart
        cartItems.splice(index, 1);
    }
    updateCart();
}

// Function to increase the quantity of an item in the cart
function increaseQuantity(index) {
    cartItems[index].quantity++;
    updateCart();
}

// Function to update the cart in localStorage and re-render the UI
function updateCart() {
    // Save updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Re-render the cart UI
    renderCart();
}

// Event listener for the checkout button
document.getElementById('checkout').addEventListener('click', function() {
    if (cartItems.length > 0) {
        // Save the total amount in localStorage
        const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        localStorage.setItem('totalAmount', JSON.stringify(totalAmount));

        // Redirect to payment page
        window.location.href = 'payment.html';
    } else {
        alert('Your cart is empty!');
    }
});


// Initial render of the cart
renderCart();

