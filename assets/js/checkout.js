// // Checkout functionality
// document.addEventListener('DOMContentLoaded', () => {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const checkoutForm = document.getElementById('checkoutForm');
//     const cardDetails = document.getElementById('cardDetails');
//     const upiDetails = document.getElementById('upiDetails');
//     const netbankingDetails = document.getElementById('netbankingDetails');
//     const paymentOptions = document.querySelectorAll('input[name="payment"]');
//     const orderSummaryItems = document.getElementById('orderSummaryItems');

//     // Format price in Indian Rupees
//     const formatPrice = (price) => {
//         return '₹' + price.toLocaleString('en-IN');
//     };

//     // Update order summary
//     function updateOrderSummary() {
//         const subtotalElement = document.getElementById('checkout-subtotal');
//         const shippingElement = document.getElementById('checkout-shipping');
//         const totalElement = document.getElementById('checkout-total');
//         const orderSummaryItems = document.getElementById('orderSummaryItems');

//         let subtotal = 0;
//         const shipping = 500; // Fixed shipping rate

//         // Clear and update order items
//         if (orderSummaryItems) {
//             orderSummaryItems.innerHTML = '';
//             cart.forEach(item => {
//                 subtotal += item.price * item.quantity;

//                 const itemElement = document.createElement('div');
//                 itemElement.className = 'order-summary__item';
//                 itemElement.innerHTML = `
//                     <div class="item__details">
//                         <span class="item__name">${item.name}</span>
//                         <span class="item__quantity">x${item.quantity}</span>
//                     </div>
//                     <span class="item__price">${formatPrice(item.price * item.quantity)}</span>
//                 `;
//                 orderSummaryItems.appendChild(itemElement);
//             });
//         } else {
//             // If orderSummaryItems doesn't exist, just calculate the subtotal
//             cart.forEach(item => {
//                 subtotal += item.price * item.quantity;
//             });
//         }

//         const total = subtotal + shipping;

//         if (subtotalElement) subtotalElement.textContent = formatPrice(subtotal);
//         if (shippingElement) shippingElement.textContent = formatPrice(shipping);
//         if (totalElement) totalElement.textContent = formatPrice(total);
//     }

//     // Handle payment method change
//     paymentOptions.forEach(option => {
//         option.addEventListener('change', (e) => {
//             // Hide all payment details sections
//             cardDetails.style.display = 'none';
//             upiDetails.style.display = 'none';
//             netbankingDetails.style.display = 'none';

//             // Show selected payment details
//             switch (e.target.value) {
//                 case 'card':
//                     cardDetails.style.display = 'block';
//                     break;
//                 case 'upi':
//                     upiDetails.style.display = 'block';
//                     break;
//                 case 'netbanking':
//                     netbankingDetails.style.display = 'block';
//                     break;
//             }
//         });
//     });

//     // Format card number input
//     const cardNumberInput = document.getElementById('cardNumber');
//     cardNumberInput.addEventListener('input', (e) => {
//         let value = e.target.value.replace(/\D/g, '');
//         if (value.length > 16) value = value.slice(0, 16);
//         value = value.replace(/(.{4})/g, '$1 ').trim();
//         e.target.value = value;
//     });

//     // Format expiry date input
//     const expiryInput = document.getElementById('expiry');
//     expiryInput.addEventListener('input', (e) => {
//         let value = e.target.value.replace(/\D/g, '');
//         if (value.length > 4) value = value.slice(0, 4);
//         if (value.length >= 2) {
//             const month = value.slice(0, 2);
//             if (parseInt(month) > 12) value = '12' + value.slice(2);
//             value = value.slice(0, 2) + '/' + value.slice(2);
//         }
//         e.target.value = value;
//     });

//     // Format CVV input
//     const cvvInput = document.getElementById('cvv');
//     cvvInput.addEventListener('input', (e) => {
//         let value = e.target.value.replace(/\D/g, '');
//         if (value.length > 3) value = value.slice(0, 3);
//         e.target.value = value;
//     });

//     // Validate email format
//     function isValidEmail(email) {
//         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//     }

//     // Validate PIN code format (6 digits for Indian PIN codes)
//     function isValidPincode(pincode) {
//         return /^\d{6}$/.test(pincode);
//     }

//     // Handle form submission
//     checkoutForm.addEventListener('submit', async (e) => {
//         e.preventDefault();

//         // Reset all error states
//         document.querySelectorAll('.error-message').forEach(el => el.remove());
//         document.querySelectorAll('.error-field').forEach(el => el.classList.remove('error-field'));

//         let isValid = true;
//         const errors = new Map();

//         // Validate required fields
//         const requiredFields = ['fullName', 'email', 'address', 'city', 'pincode', 'phone'];
//         requiredFields.forEach(field => {
//             const input = document.getElementById(field);
//             const value = input.value.trim();

//             if (!value) {
//                 errors.set(field, 'This field is required');
//                 isValid = false;
//             }
//         });

//         // Validate email format
//         const email = document.getElementById('email').value.trim();
//         if (email && !isValidEmail(email)) {
//             errors.set('email', 'Please enter a valid email address');
//             isValid = false;
//         }

//         // Validate phone number (10 digits)
//         const phone = document.getElementById('phone').value.trim();
//         if (phone && !/^\d{10}$/.test(phone)) {
//             errors.set('phone', 'Please enter a valid 10-digit phone number');
//             isValid = false;
//         }

//         // Validate PIN code
//         const pincode = document.getElementById('pincode').value.trim();
//         if (pincode && !isValidPincode(pincode)) {
//             errors.set('pincode', 'Please enter a valid 6-digit PIN code');
//             isValid = false;
//         }

//         // Validate payment details
//         const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
//         switch (selectedPayment) {
//             case 'card':
//                 const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
//                 const expiry = document.getElementById('expiry').value;
//                 const cvv = document.getElementById('cvv').value;

//                 if (!/^\d{16}$/.test(cardNumber)) {
//                     errors.set('cardNumber', 'Please enter a valid 16-digit card number');
//                     isValid = false;
//                 }
//                 if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
//                     errors.set('expiry', 'Please enter a valid expiry date (MM/YY)');
//                     isValid = false;
//                 }
//                 if (!/^\d{3}$/.test(cvv)) {
//                     errors.set('cvv', 'Please enter a valid 3-digit CVV');
//                     isValid = false;
//                 }
//                 break;

//             case 'upi':
//                 const upiId = document.getElementById('upiId').value.trim();
//                 if (!/[a-zA-Z0-9.-]{2,256}@[a-zA-Z][a-zA-Z]{2,64}/.test(upiId)) {
//                     errors.set('upiId', 'Please enter a valid UPI ID');
//                     isValid = false;
//                 }
//                 break;

//             case 'netbanking':
//                 const bank = document.getElementById('bankSelect').value;
//                 if (!bank) {
//                     errors.set('bankSelect', 'Please select a bank');
//                     isValid = false;
//                 }
//                 break;
//         }

//         // Display errors if any
//         errors.forEach((message, field) => {
//             const input = document.getElementById(field);
//             input.classList.add('error-field');

//             const errorDiv = document.createElement('div');
//             errorDiv.className = 'error-message';
//             errorDiv.textContent = message;
//             input.parentNode.appendChild(errorDiv);
//         });

//         if (!isValid) return;

//         // Show loading state
//         const submitButton = document.getElementById("placeOrder");
//         const originalText = submitButton.textContent;
//         submitButton.disabled = true;
//         submitButton.textContent = 'Processing...';


//             // Simulate order processing delay
//             await new Promise(resolve => setTimeout(resolve, 1500));

//             // Create order object
//             const order = {
//                 items: cart,
//                 shipping: {
//                     fullName: document.getElementById('fullName').value.trim(),
//                     email: email,
//                     phone: phone,
//                     address: document.getElementById('address').value.trim(),
//                     city: document.getElementById('city').value.trim(),
//                     pincode: pincode
//                 },
//                 payment: {
//                     method: selectedPayment,
//                     status: 'completed'
//                 },
//                 total: parseFloat(document.getElementById('checkout-total').textContent.replace(/[^\d.]/g, '')),
//                 orderDate: new Date().toISOString(),
//                 status: 'confirmed'
//             };

//             // Save order to localStorage (in a real app, this would be sent to a server)
//             const orders = JSON.parse(localStorage.getItem('orders')) || [];
//             orders.push(order);
//             localStorage.setItem('orders', JSON.stringify(orders));

//             // Clear cart
//             localStorage.removeItem('cart');

//             // Show success message and redirect
//             alert('Order placed successfully! Thank you for shopping with us.');
//             window.location.href = 'shop.html';

//     });

//     // Initialize order summary
//     updateOrderSummary();
// });

//     function placeOrder(){
//         alert('Order placed successfully! Thank you for shopping with us.');
//         window.location.href = 'shop.html';            
//     }

document.addEventListener('DOMContentLoaded', () => {
    updateOrderSummary();
    setupPaymentMethodSwitching();
    setupFormValidation();
});

function updateOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const shipping = 500;
    const total = subtotal + shipping;

    document.getElementById('checkout-subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('checkout-shipping').textContent = `₹${shipping.toFixed(2)}`;
    document.getElementById('checkout-total').textContent = `₹${total.toFixed(2)}`;

    // Store the total for order processing
    localStorage.setItem('orderTotal', total.toFixed(2));
}

function setupPaymentMethodSwitching() {
    const paymentMethods = document.querySelectorAll('input[name="payment"]');
    const paymentDetails = {
        card: document.getElementById('cardDetails'),
        upi: document.getElementById('upiDetails'),
        netbanking: document.getElementById('netbankingDetails')
    };

    paymentMethods.forEach(method => {
        method.addEventListener('change', () => {
            Object.values(paymentDetails).forEach(detail => {
                if (detail) detail.style.display = 'none';
            });

            const selectedMethod = method.value;
            if (paymentDetails[selectedMethod]) {
                paymentDetails[selectedMethod].style.display = 'block';
            }
        });
    });
}

function setupFormValidation() {
    const form = document.getElementById('checkoutForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const orderDetails = {
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            address: document.getElementById('address').value.trim(),
            city: document.getElementById('city').value.trim(),
            pincode: document.getElementById('pincode').value.trim(),
            total: localStorage.getItem('orderTotal') || '0'
        };

        const errors = validateForm(orderDetails);
        if (errors.length > 0) {
            showErrors(errors);
            return;
        }

        processOrder(orderDetails);
    });
}

function validateForm(orderDetails) {
    const errors = [];

    if (!orderDetails.fullName) errors.push('Please enter your full name');
    if (!orderDetails.email) {
        errors.push('Please enter your email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderDetails.email)) {
        errors.push('Please enter a valid email address');
    }
    if (!orderDetails.address) errors.push('Please enter your address');
    if (!orderDetails.city) errors.push('Please enter your city');
    if (!orderDetails.pincode) errors.push('Please enter your PIN code');

    const selectedPayment = document.querySelector('input[name="payment"]:checked')?.value;
    if (!selectedPayment) {
        errors.push('Please select a payment method');
        return errors;
    }

    switch (selectedPayment) {
        case 'card':
            const cardNumber = document.getElementById('cardNumber').value.trim();
            const expiry = document.getElementById('expiry').value.trim();
            const cvv = document.getElementById('cvv').value.trim();

            if (!cardNumber || !/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
                errors.push('Please enter a valid 16-digit card number');
            }
            if (!expiry || !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiry)) {
                errors.push('Please enter a valid expiry date (MM/YY)');
            }
            if (!cvv || !/^\d{3,4}$/.test(cvv)) {
                errors.push('Please enter a valid CVV (3-4 digits)');
            }
            break;

        case 'upi':
            const upiId = document.getElementById('upiId').value.trim();
            if (!upiId || !/[a-zA-Z0-9.-]{2,256}@[a-zA-Z][a-zA-Z]{2,64}/.test(upiId)) {
                errors.push('Please enter a valid UPI ID');
            }
            break;

        case 'netbanking':
            const bank = document.getElementById('bankSelect').value;
            if (!bank) errors.push('Please select a bank');
            break;
    }

    return errors;
}

function showErrors(errors) {
    const errorModal = document.createElement('div');
    errorModal.className = 'error-modal';
    errorModal.innerHTML = `
        <div class="error-content">
            <h3>Please Fix the Following Errors</h3>
            <ul>${errors.map(error => `<li>${error}</li>`).join('')}</ul>
            <button class="button" onclick="this.parentElement.parentElement.remove()">OK</button>
        </div>
    `;
    document.body.appendChild(errorModal);
}

async function processOrder(orderDetails) {
    const overlay = document.createElement('div');
    overlay.className = 'processing-overlay';
    overlay.innerHTML = `
        <div class="processing-content">
            <div class="spinner"></div>
            <p>Processing your order...</p>
        </div>
    `;
    document.body.appendChild(overlay);

    try {
        // Simulate order processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Generate order ID and show success message
        const orderId = 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();
        showOrderConfirmation(orderId, orderDetails);

        // Clear cart
        localStorage.removeItem('cart');
        localStorage.removeItem('orderTotal');
    } catch (error) {
        console.error('Order processing failed:', error);
        showErrors(['An error occurred while processing your order. Please try again.']);
    } finally {
        overlay.remove();
    }
}

function showOrderConfirmation(orderId, orderDetails) {
    const confirmationModal = document.createElement('div');
    confirmationModal.className = 'confirmation-modal';
    confirmationModal.innerHTML = `
        <div class="confirmation-content">
            <i class='bx bx-check-circle'></i>
            <h2>Order Confirmed!</h2>
            <p>Your order has been successfully placed.</p>
            <div class="order-details">
                <p><strong>Order ID:</strong> ${orderId}</p>
                <p><strong>Total Amount:</strong> ₹${orderDetails.total}</p>
            </div>
            <button class="button" onclick="window.location.href = 'index.html'">Continue Shopping</button>
        </div>
    `;
    document.body.appendChild(confirmationModal);
}
