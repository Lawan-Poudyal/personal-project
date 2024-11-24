import { deliveryOption } from "./deliveryOptions.js";

export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 5,
    deliveryOptionId: "1",
  },

  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 9,
    deliveryOptionId: "3",
  },
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
    cart.push({ productId, quantity: selectorQuantity, deliveryOptionId: "1" });
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

export const updateQuantity = (productId, newQuantity) => {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.quantity = newQuantity;

  saveToStorage();
};
