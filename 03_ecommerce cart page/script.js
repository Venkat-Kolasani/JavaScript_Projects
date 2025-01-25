document.addEventListener("DOMContentLoaded", () => { //waits for the DOM to be fully loaded before running the script
    const products = [
      { id: 1, name: "Product 1", price: 49.99 },
      { id: 2, name: "Product 2", price: 69.99 },
      { id: 3, name: "Product 3", price: 59.99 },
      { id: 3, name: "Product 4", price: 79.99 },
    ];
  
    const cart = [];
  
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
      renderCart();
    }
  
    function renderCart() {
      cartItems.innerText = "";
      let totalPrice = 0;
  
      if (cart.length > 0) { 
        emptyCartMessage.classList.add("hidden");
        cartTotalMessage.classList.remove("hidden");
        cart.forEach((item, index) => { //loops through the cart array
          totalPrice += item.price; //adds the price of the item to the total price
          const cartItem = document.createElement("div");
          cartItem.innerHTML = ` 
          ${item.name} - $${item.price.toFixed(2)}
          `;
          cartItems.appendChild(cartItem);
          totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`; //displays the total price
        });
      } else {
        emptyCartMessage.classList.remove("hidden"); //unlocks the hidden class
        totalPriceDisplay.textContent = `$0.00`;
      }
    }
  
    checkOutBtn.addEventListener("click", () => { //listens for a click event on the checkout button
      cart.length = 0;
      alert("Checkout successfully");
      renderCart();
    });
  });
  