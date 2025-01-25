document.addEventListener("DOMContentLoaded", () => { //waits for the DOM to be fully loaded before running the script
    const products = [
      { id: 1, name: "Product 1", price: 49.99 },
      { id: 2, name: "Product 2", price: 69.99 },
      { id: 3, name: "Product 3", price: 59.99 },
      { id: 4, name: "Product 4", price: 79.99 },
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || []; //parses the cart from the local storage or sets it to an empty array
  
    const productList = document.getElementById("product-list"); 
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkOutBtn = document.getElementById("checkout-btn");
  
    products.forEach((product) => { //loops through the products array
      const productDiv = document.createElement("div"); //creates a div element
      productDiv.classList.add("product"); //adds the product class to the div
      productDiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span> 
      <button data-id="${product.id}">Add to cart</button>
      `;
      productList.appendChild(productDiv); //appends the div to the productList
    });
  
    productList.addEventListener("click", (e) => { //listens for a click event on the productList
      if (e.target.tagName === "BUTTON") {
        const productId = parseInt(e.target.getAttribute("data-id")); 
        const product = products.find((p) => p.id === productId);
        addToCart(product);
      }
    });
  
    function addToCart(product) {
      cart.push(product);
      saveCart();
      renderCart();
    }
  
    function renderCart() {
      cartItems.innerText = "";
      let totalPrice = 0;
  
      if (cart.length > 0) { 
        emptyCartMessage.classList.add("hidden");
        cart.forEach((product, index) => {
          const cartItemDiv = document.createElement("div");
          cartItemDiv.classList.add("cart-item");
          cartItemDiv.innerHTML = `
          <span>${product.name} - $${product.price.toFixed(2)}</span>
          <button data-index="${index}">Remove</button>
          `;
          cartItems.appendChild(cartItemDiv);
          totalPrice += product.price;
        });
        totalPriceDisplay.innerText = `$${totalPrice.toFixed(2)}`;
        cartTotalMessage.classList.remove("hidden");
      } else {
        emptyCartMessage.classList.remove("hidden");
        cartTotalMessage.classList.add("hidden");
        totalPriceDisplay.innerText = `$0.00`;
      }
    }
  
    cartItems.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const productIndex = parseInt(e.target.getAttribute("data-index"));
        removeFromCart(productIndex);
      }
    });
  
    function removeFromCart(index) {
      cart.splice(index, 1);
      saveCart();
      renderCart();
    }
  
    checkOutBtn.addEventListener("click", () => { //listens for a click event on the checkout button
      cart.length = 0;
      saveCart();
      alert("Checkout successfully");
      renderCart();
    });

    function saveCart() {
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Initial render
    renderCart();
});