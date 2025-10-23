// Shopping Cart Functionality
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartDisplay();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const product = e.target.dataset.product;
                const price = parseFloat(e.target.dataset.price);
                this.addItem(product, price);
            });
        });

        // Cart toggle
        document.querySelector('.cart-btn').addEventListener('click', () => {
            document.getElementById('cart-sidebar').classList.add('active');
        });

        // Close cart
        document.querySelector('.close-cart').addEventListener('click', () => {
            document.getElementById('cart-sidebar').classList.remove('active');
        });

        // Checkout button
        document.querySelector('.checkout-btn').addEventListener('click', () => {
            this.checkout();
        });
    }

    addItem(product, price) {
        this.items.push({ product, price });
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification(`${product} added to cart!`);
    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.saveCart();
        this.updateCartDisplay();
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartDisplay() {
        // Update cart count
        document.getElementById('cart-count').textContent = this.items.length;

        // Update cart items
        const cartItems = document.querySelector('.cart-items');
        const cartTotal = document.getElementById('cart-total');

        if (this.items.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty</p>';
            cartTotal.textContent = '0.00';
            return;
        }

        let total = 0;
        cartItems.innerHTML = this.items.map((item, index) => {
            total += item.price;
            return `
                <div class="cart-item">
                    <div>
                        <h4>${item.product}</h4>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            `;
        }).join('');

        cartTotal.textContent = total.toFixed(2);

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.removeItem(index);
            });
        });
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #ff0000;
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            z-index: 1002;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    checkout() {
        if (this.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        const total = this.items.reduce((sum, item) => sum + item.price, 0);
        alert(`Proceeding to checkout! Total: $${total.toFixed(2)}\n\nNote: This is a demo store. For a real store, you would integrate with Stripe or PayPal.`);
        
        // In a real store, you would redirect to payment processing
        // window.location.href = 'checkout.html';
    }
}

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ShoppingCart();
});