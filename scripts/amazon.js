let productsHTML = ``;

product.forEach((product) => {
  productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img
              src="${product.image}"
              class="product-img"
            />
          </div>

          <div class="product-title">${product.name}</div>
          <div class="product-rating">
            <img
              src="../images/ratings/rating-${product.rating.stars * 10}.png"
              class="product-rating-star"
            />
            <span class="product-rating-count">${product.rating.count}</span>
          </div>
          <div class="product-price">$${(product.priceCents / 100).toFixed(
            2
          )}</div>
          <div class="product-quantity">
            <select class=js-quantity-selector-${product.id}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div class="product-spacer"></div>
          <div class="added-to-cart">
            <img src="../images/icons/checkmark.png" />
            Added
          </div>
          <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id=${
            product.id
          }>Add to Cart</button>
        </div>`;
});
document.querySelector(".js-product-container-grid").innerHTML = productsHTML;

document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;

    const selectorQuantity = Number(
      document.querySelector(`.js-quantity-selector-${productId}`).value
    );

    let matchingItem;

    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += selectorQuantity;
    } else {
      cart.push({ productId, quantity: selectorQuantity });
    }

    let cartQuantity = 0;

    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  });
});
