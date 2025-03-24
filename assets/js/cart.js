// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Format price in Indian Rupees
const formatPrice = (price) => {
    return '₹' + price.toLocaleString('en-IN');
};

// Update cart display
function updateCartDisplay() {
    const cartContainer = document.getElementById('cartContainer');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const checkoutButton = document.getElementById('checkoutButton');

    // Clear current display
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        subtotalElement.textContent = formatPrice(0);
        shippingElement.textContent = formatPrice(0);
        totalElement.textContent = formatPrice(0);
        checkoutButton.disabled = true;
        checkoutButton.classList.add('button--disabled');
        return;
    }

    // Enable checkout button
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('button--disabled');

    // Calculate totals
    let subtotal = 0;
    const shipping = 500; // Fixed shipping rate

    // Add each item to the display
    cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;

        const itemElement = document.createElement('div');
        itemElement.className = 'cart__item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart__image">
            <div class="cart__details">
                <h3 class="cart__name">${item.name}</h3>
                <div class="cart__price-quantity">
                    <p class="cart__price">${formatPrice(item.price)}</p>
                    <div class="cart__quantity">
                        <button class="quantity__button" onclick="updateQuantity(${index}, -1)" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity__button" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <p class="cart__item-total">Total: ${formatPrice(item.price * item.quantity)}</p>
            </div>
            <button class="cart__remove" onclick="removeItem(${index})" aria-label="Remove item">
                <i class='bx bx-x'></i>
            </button>
        `;

        cartContainer.appendChild(itemElement);
    });

    // Update summary
    const total = subtotal + shipping;
    subtotalElement.textContent = formatPrice(subtotal);
    shippingElement.textContent = formatPrice(shipping);
    totalElement.textContent = formatPrice(total);

    // Store updated cart and total
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartTotal', total);
}

// Update item quantity
function updateQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity = Math.max(1, cart[index].quantity + change);
        updateCartDisplay();
    }
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// Initialize cart display
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
});