export const cart = [];

export const updateCart = (productId, selectorQuantity) => {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += selectorQuantity;
  } else {
    cart.push({ productId, quantity: selectorQuantity });
  }
};

export const updateCartQuantity = () => {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
};
