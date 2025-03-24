// Cart count functionality
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
}

// Update cart count when page loads
document.addEventListener('DOMContentLoaded', updateCartCount);

// Listen for cart updates
window.addEventListener('storage', (e) => {
    if (e.key === 'cart') {
        updateCartCount();
    }
});