import { cart } from "../data/cart.js";
import { getDeliveryOption } from "../data/deliveryOptions.js";
import { getProduct } from "../data/products.js";
import { formatMoney } from "../utilities/money.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const matchingProduct = getProduct(cartItem.productId);

    productPriceCents += matchingProduct.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents / 10;

  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `    <div class="payment-summary-title">Order Summary</div>
            <div class="payment-summary-row">
              <div>Item (<span class="">3</span>):</div>
              <div class="payment-summary-money">$${formatMoney(
                productPriceCents
              )}</div>
            </div>
            <div class="payment-summary-row">
              <div>Shipping & handling:</div>
              <div class="payment-summary-money">$${formatMoney(
                shippingPriceCents
              )}</div>
            </div>
            <div class="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div class="payment-summary-money">$${formatMoney(
                totalBeforeTaxCents
              )}</div>
            </div>
            <div class="payment-summary-row">
              <div>Estimated tax(10%):</div>
              <div class="payment-summary-money">$${formatMoney(taxCents)}</div>
            </div>
            <div class="payment-summary-row total-row">
              <div>Order total:</div>
              <div class="payment-summary-money">$${formatMoney(
                totalCents
              )}</div>
            </div>
            <div>
              <button class="place-order-button button-primary">
                Place your order
              </button>
        </div>`;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}
