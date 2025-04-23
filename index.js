document.addEventListener("DOMContentLoaded", function () {
    loadCart();
});

function addToCart(title, author, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ title, author, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${title} added to cart!`);
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let total = 0;
    cartContainer.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" class="cart-image">
                <div class="cart-details">
                    <p><strong>${item.title}</strong> by ${item.author} - $${item.price.toFixed(2)}</p>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
            <hr>
        `;
    });

    document.getElementById("cart-total").textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function clearCart() {
    localStorage.removeItem("cart");
    alert("Cart cleared successfully!");
    loadCart();
}

function checkout() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart && cart.length > 0) {
        alert("Payment successful! Your order has been placed.");
        localStorage.removeItem("cart");
        window.location.href = "index.html";
    } else {
        alert("Cart is empty!");
    }
}

function goToHome() {
    window.location.href = "index.html";
}
