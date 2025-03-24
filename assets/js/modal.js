export function createConfirmationModal(orderDetails) {
    const modal = document.createElement('div');
    modal.className = 'processing-overlay';
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    let paymentDetails = '';

    switch (paymentMethod) {
        case 'card':
            const cardNumber = document.getElementById('cardNumber').value;
            const maskedCard = '**** '.repeat(3) + cardNumber.slice(-4);
            paymentDetails = `<p><strong>Payment Method:</strong> Credit/Debit Card</p>
                             <p><strong>Card Number:</strong> ${maskedCard}</p>`;
            break;
        case 'upi':
            const upiId = document.getElementById('upiId').value;
            paymentDetails = `<p><strong>Payment Method:</strong> UPI</p>
                             <p><strong>UPI ID:</strong> ${upiId}</p>`;
            break;
        case 'netbanking':
            const bank = document.getElementById('bankSelect').options[document.getElementById('bankSelect').selectedIndex].text;
            paymentDetails = `<p><strong>Payment Method:</strong> Net Banking</p>
                             <p><strong>Bank:</strong> ${bank}</p>`;
            break;
    }

    modal.innerHTML = `
        <div class="confirmation-content">
            <h2>Confirm Your Order</h2>
            <div class="order-details">
                <p><strong>Name:</strong> ${orderDetails.fullName}</p>
                <p><strong>Email:</strong> ${orderDetails.email}</p>
                <p><strong>Address:</strong> ${orderDetails.address}</p>
                <p><strong>Total Amount:</strong> ₹${orderDetails.total}</p>
                ${paymentDetails}
            </div>
            <div class="button-group">
                <button class="button" id="confirmOrder">Confirm Order</button>
                <button class="button button--ghost" id="cancelOrder">Cancel</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    return new Promise((resolve, reject) => {
        document.getElementById('confirmOrder').addEventListener('click', () => {
            modal.remove();
            resolve(true);
        });

        document.getElementById('cancelOrder').addEventListener('click', () => {
            modal.remove();
            resolve(false);
        });
    });
}

export function showSuccessMessage(orderId) {
    const successModal = document.createElement('div');
    successModal.className = 'processing-overlay';
    successModal.innerHTML = `
        <div class="confirmation-content">
            <i class='bx bx-check-circle'></i>
            <h2>Order Placed Successfully!</h2>
            <p>Your order has been confirmed and will be shipped soon.</p>
            <p>Order ID: ${orderId}</p>
            <button class="button" onclick="window.location.href='index.html'">Continue Shopping</button>
        </div>
    `;
    document.body.appendChild(successModal);
}

export function createProcessingOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'processing-overlay';
    overlay.innerHTML = `
        <div class="processing-content">
            <div class="spinner"></div>
            <p>Processing your order...</p>
        </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
}