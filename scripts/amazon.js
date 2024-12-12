import {
  cart,
  updateCart,
  calculateCartQuantity,
} from "../scripts/data/cart.js";
import { product } from "../scripts/data/products.js";

let productsHTML = ``;
displayCartQuantity();

product.forEach((product) => {
  productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img
              src="${product.image}"
              class="product-img"
            />
          </div>

          <div class="product-title limit-to-2-lines">${product.name}</div>
          <div class="product-rating">
            <img
              src="${product.getStarURL()}"
              class="product-rating-star"
            />
            <span class="product-rating-count">${product.rating.count}</span>
          </div>
          <div class="product-price">${product.getPrice()}</div>
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
    const { productId } = button.dataset;

    const selectorQuantity = Number(
      document.querySelector(`.js-quantity-selector-${productId}`).value
    );

    updateCart(productId, selectorQuantity);
    displayCartQuantity();
  });
});

function displayCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}
