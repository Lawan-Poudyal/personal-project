export let cart = JSON.parse(localStorage.getItem("cart")) || [
  { productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", quantity: 5 },

  { productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", quantity: 9 },
];

const saveToStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

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
  saveToStorage();
};

export const calculateCartQuantity = () => {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
};

export const deleteFromCart = (productId) => {
  const newCart = [];

  cart.forEach((item) => {
    if (item.productId != productId) {
      newCart.push(item);
    }
  });
  cart = newCart;
  saveToStorage();
};
