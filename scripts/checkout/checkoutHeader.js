import { calculateCartQuantity } from "../data/cart.js";

export function renderCheckoutHeader() {
  const cartQuantity = calculateCartQuantity();

  const checkoutHeaderHTML = `<div class="checkout-header">
        <div class="checkout-header-left-section">
          <div>
            <a class="header-link" href="../html/amazon.html">
              <img src="../images/amazon-logo.png" class="amazon-logo" />
              <img
                src="../images/amazon-mobile-logo.png"
                class="amazon-mobile-logo"
              />
            </a>
          </div>
        </div>

        <div class="checkout-header-middle-section">
          <div>
            <span class="checkout-text"
              >Checkout (<a href="../html/amazon.html" class="return-home-link"
                ><span class="js-cart-quantity">${cartQuantity}${
    cartQuantity === 1 ? " item" : " items"
  }</span></a
              >)</span
            >
          </div>
        </div>
        <div class="checkout-header-right-section">
          <div>
            <img
              class="checkout-lock-icon"
              src="../images/icons/checkout-lock-icon.png"
            />
          </div>
        </div>
      </div>`;

  document.querySelector(".js-checkout-header-container").innerHTML =
    checkoutHeaderHTML;
}
