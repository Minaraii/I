
// Dia 1 - script.js basico 7/18/25. 11:11 pm

let cart = [];

function addToCart(productName, price) {
    const item = { productName, price};
    cart.push(item);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    let total = 0;
    cart.forEach((item, index) => {
        total  += item.price;

        const li = document.createElement("li");
       li.textContent = `${item.productName} - $${item.price}`;

        cartItems.appendChild(li);
    });

    document.getElementById("cart-total").textContent = `$${total}`;
}