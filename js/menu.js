document.addEventListener("DOMContentLoaded", function () {
  const menuItems = [
    { name: 'Aloo Paratha', price: 60, image: 'Images/Aloo Paratha.jpeg' },
    { name: 'Paneer Paratha', price: 80, image: 'Images/Paneer paratha.jpeg' },
    { name: 'Chowmein Roll', price: 50, image: 'Images/Chowmein roll.jpeg' },
    { name: 'Veg Roll', price: 80, image: 'Images/Veg roll.jpeg' },
    { name: 'Samosa', price: 30, image: 'Images/Samosa.jpeg' },
    { name: 'Cold Coffee', price: 70, image: 'Images/Cold coffee.jpeg' },
    { name: 'Chocolateshake', price: 70, image: 'Images/Chocolateshake.jpg' },
    { name: 'Oreoshake', price: 70, image: 'Images/Oreoshake.jpeg' },
    { name: 'Tea', price: 20, image: 'Images/Tea.jpeg' },
    { name: 'Coffee', price: 30, image: 'Images/Coffee.jpeg' },
    { name: 'Maggi', price: 40, image: 'Images/Maggi.jpeg' },
    { name: 'Fried Momos', price: 120, image: 'Images/Fried momos.jpeg' },
    { name: 'Steam Momos', price: 100, image: 'Images/Steam momos.jpg' },
    { name: 'Onion Pizza', price: 100, image: 'Images/Pizza.jpeg' },
    { name: 'Jalapeno Corn Pizza', price: 100, image: 'Images/Jalapeno corn.jpeg' },
    { name: 'Veg Burger', price: 50, image: 'Images/Vegburger.jpeg' },
    { name: 'Paneer Burger', price: 80, image: 'Images/Paneer burger.jpeg' },
    { name: 'French fries', price: 80, image: 'Images/Frenchfries.jpeg' },
    { name: 'Hakka Noodles', price: 160, image: 'Images/Hakkanoodles.jpeg' },
    { name: 'Paneer Patties', price: 35, image: 'Images/Paneer patties.jpeg' }

  ];

  const parentContainer = document.querySelector('.parentContainer');
  const cartCount = document.getElementById('cart-count');
  const cartItemsList = document.getElementById('cart-items');
  const cartSummary = document.getElementById('cart-summary');
  let cartItems = [];
  let totalItems = 0;

  menuItems.forEach(item => {
    const container = document.createElement('div');
    container.classList.add('container');

    container.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="menuImage" height="170px">
      <p class="imgHead">${item.name}</p>
      <p class="imgPrice">Rs. ${item.price}</p>
      <div class="counter">
        <button class="value" onclick="decreaseValue(this)">-</button>
        <input type="text" value="1" readonly>
        <button class="value" onclick="increaseValue(this)">+</button>
      </div>
      <button class="addCart">Add to Cart</button>
    `;

    parentContainer.appendChild(container);

    const addToCartBtn = container.querySelector('.addCart');
    addToCartBtn.addEventListener('click', function () {
      const quantityInput = container.querySelector('input').value;
      addToCart(item, parseInt(quantityInput));
    });
  });

  function addToCart(item, quantity) {
    // Check if the item is already in the cart
    const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({ ...item, quantity });
    }

    // Update cart count
    totalItems += quantity;
    cartCount.textContent = totalItems;

    // Store cart items in localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update cart summary
    updateCartSummary();

    // Show the cart summary for 2 seconds and then hide it
    cartSummary.classList.add('visible');  // Add 'visible' class to show the cart
    setTimeout(() => {
      cartSummary.classList.remove('visible');  // Remove 'visible' class after 2 seconds
    }, 2000);
  }


  function updateCartSummary() {
    cartItemsList.innerHTML = '';  // Clear the list first
    cartItems.forEach(cartItem => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span>${cartItem.name} x ${cartItem.quantity}</span>
        <span>Rs. ${cartItem.price * cartItem.quantity}</span>
      `;
      cartItemsList.appendChild(listItem);
    });
  }

  // Quantity adjustment functions
  window.decreaseValue = function (button) {
    const input = button.parentNode.querySelector('input');
    let value = parseInt(input.value);
    if (value > 1) {
      value--;
      input.value = value;
    }
  }

  window.increaseValue = function (button) {
    const input = button.parentNode.querySelector('input');
    let value = parseInt(input.value);
    value++;
    input.value = value;
  }
});

document.getElementById('cart-icon').addEventListener('click', function () {
  // Open the cart page in a new tab
  window.open('cart.html', '_blank');
});
