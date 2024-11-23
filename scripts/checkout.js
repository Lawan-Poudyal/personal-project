import { cart } from "../scripts/data/cart.js";
import { product } from "../scripts/data/products.js";
import { formatMoney } from "../scripts/utilities/money.js";

let cartSummaryHTML = ``;
let matchingProduct;

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  product.forEach((item) => {
    if (item.id === productId) {
      matchingProduct = item;
    }
  });
  cartSummaryHTML += `
  <div class="cart-item">
    <div class="delivery-date">Delivery date: Tuesday, June 21</div>
    <div class="cart-item-details">
      <img
        src="${matchingProduct.image}"
        class="product-image"
      />
      <div>
        <div class="product-name limit-to-2-lines">
          ${matchingProduct.name}
        </div>
        <div class="product-price">$${formatMoney(
          matchingProduct.priceCents
        )}</div>
        <div class="product-quantity-container">
          <span
            >Quantity: <span class="product-quantity">${
              cartItem.quantity
            } </span>
            <span class="update-link">Update </span>
            <span class="delete-link">Delete</span>
          </span>
        </div>
      </div>
      <div class="delivery-option-container">
        <div class="delivery-option-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" name="delivery-option-${
            matchingProduct.id
          }" checked />
          <div>
            <div class="delivery-option-date">Tuesday, June 21</div>
            <div class="delivery-option-price">FREE Shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" name="delivery-option-${matchingProduct.id}"  />
          <div>
            <div class="delivery-option-date">Tuesday, June 21</div>
            <div class="delivery-option-price">FREE Shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" name="delivery-option-${matchingProduct.id}"  />
          <div>
            <div class="delivery-option-date">Tuesday, June 21</div>
            <div class="delivery-option-price">FREE Shipping</div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
});

document.querySelector(".js-cart-item-container").innerHTML = cartSummaryHTML;
