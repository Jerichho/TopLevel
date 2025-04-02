// Shopping Cart
let cart = [];

// DOM Elements
const productsGrid = document.querySelector('.products-grid');
const cartItems = document.getElementById('cart-items');
const cartTotalAmount = document.getElementById('cart-total-amount');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');

// Add to Cart Function
function addToCart(product) {
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: product.name,
            price: parseFloat(product.price.replace('$', '')),
            quantity: 1
        });
    }
    
    updateCartDisplay();
}

// Update Cart Display
function updateCartDisplay() {
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                    <p>Total: $${itemTotal.toFixed(2)}</p>
                </div>
                <div>
                    <button onclick="removeFromCart('${item.name}')" class="remove-btn">Remove</button>
                    <button onclick="updateQuantity('${item.name}', ${item.quantity + 1})" class="quantity-btn">+</button>
                    <button onclick="updateQuantity('${item.name}', ${item.quantity - 1})" class="quantity-btn">-</button>
                </div>
            </div>
        `;
    });
    
    cartTotalAmount.textContent = `$${total.toFixed(2)}`;
}

// Remove from Cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartDisplay();
}

// Update Quantity
function updateQuantity(productName, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productName);
    } else {
        const item = cart.find(item => item.name === productName);
        if (item) {
            item.quantity = newQuantity;
            updateCartDisplay();
        }
    }
}

// Filter Products
function filterProducts() {
    const selectedCategory = categoryFilter.value;
    const selectedPrice = priceFilter.value;
    
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const category = product.dataset.category;
        const price = product.dataset.price;
        
        const categoryMatch = selectedCategory === 'all' || category === selectedCategory;
        const priceMatch = selectedPrice === 'all' || price === selectedPrice;
        
        product.style.display = categoryMatch && priceMatch ? 'block' : 'none';
    });
}

// Event Listeners
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const product = {
            name: productCard.querySelector('h3').textContent,
            price: productCard.querySelector('.price').textContent
        };
        addToCart(product);
    });
});

categoryFilter.addEventListener('change', filterProducts);
priceFilter.addEventListener('change', filterProducts);

// Checkout Button
document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your purchase! This is a demo site, so no actual transaction will occur.');
    cart = [];
    updateCartDisplay();
}); 