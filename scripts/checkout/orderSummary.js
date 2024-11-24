import {
  cart,
  deleteFromCart,
  calculateCartQuantity,
  updateQuantity,
  updateDeliveryOption,
} from "../data/cart.js";
import { product } from "../data/products.js";
import { formatMoney } from "../utilities/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

displayCartQuantity();

export function renderOrderSummary() {
  let cartSummaryHTML = ``;
  let matchingProduct;

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    product.forEach((item) => {
      if (item.id === productId) {
        matchingProduct = item;
      }
    });
    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML += `
    <div class="cart-item js-cart-item-${matchingProduct.id}">
      <div class="delivery-date">Delivery date: ${dateString}</div>
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
              >Quantity: <span class="product-quantity js-product-quantity-${
                matchingProduct.id
              }">${cartItem.quantity} </span>
              <span class="update-link link-primary js-update-link" data-product-id=${
                matchingProduct.id
              }>Update </span>
              <input class="quantity-input js-quantity-input-${
                matchingProduct.id
              } "/> <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id=${
      matchingProduct.id
    }>Save</span>
              <span class="delete-link link-primary js-delete-link" data-product-id=${
                matchingProduct.id
              }>Delete</span>
            </span>
          </div>
        </div>
        <div class="delivery-option-container">
          <div class="delivery-option-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
  `;
  });

  document.querySelector(".js-cart-item-container").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;
      deleteFromCart(productId);
      const cartItem = document.querySelector(`.js-cart-item-${productId}`);
      cartItem.remove();
      displayCartQuantity();
    });
  });

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;
      document
        .querySelector(`.js-cart-item-${productId}`)
        .classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;

      const newQuantity = Number(
        document.querySelector(`.js-quantity-input-${productId}`).value
      );
      if (newQuantity <= 0 || newQuantity >= 100) {
        alert("Quantity must be at least 0 and less than 100");
        return;
      }
      updateQuantity(productId, newQuantity);

      const container = document.querySelector(`.js-cart-item-${productId}`);
      container.classList.remove("is-editing-quantity");

      const productQuantity = document.querySelector(
        `.js-product-quantity-${productId}`
      );
      productQuantity.innerHTML = newQuantity;

      displayCartQuantity();
    });
  });

  function deliveryOptionHTML(matchingProduct, cartItem) {
    let html = ``;

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");

      const priceString =
        deliveryOption.priceCents === 0
          ? `FREE`
          : `$${formatMoney(deliveryOption.priceCents)}`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
          <div class="delivery-option js-delivery-option" data-product-id="${
            matchingProduct.id
          }" data-delivery-option-id="${deliveryOption.id}">
            <input type="radio" name="delivery-option-${matchingProduct.id}" ${
        isChecked ? "checked" : ""
      } />
            <div>
              <div class="delivery-option-date">${dateString}</div>
              <div class="delivery-option-price">${priceString} Shipping</div>
            </div>
          </div>`;
    });

    return html;
  }

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}

renderOrderSummary();

function displayCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector(
    ".js-cart-quantity"
  ).innerHTML = `${cartQuantity} items`;
}
