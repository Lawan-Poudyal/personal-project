class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(
      localStorage.getItem(this.#localStorageKey)
    ) || [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 5,
        deliveryOptionId: "1",
      },

      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 9,
        deliveryOptionId: "2",
      },
    ];
  }
  saveToStorage = () => {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  };

  updateCart = (productId, selectorQuantity) => {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += selectorQuantity;
    } else {
      this.cartItem.push({
        productId,
        quantity: selectorQuantity,
        deliveryOptionId: "1",
      });
    }
    this.saveToStorage();
  };

  calculateCartQuantity = () => {
    let cartQuantity = 0;

    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  };

  deleteFromCart = (productId) => {
    const newCart = [];

    this.cartItems.forEach((item) => {
      if (item.productId != productId) {
        newCart.push(item);
      }
    });
    this.cartItems = newCart;
    this.saveToStorage();
  };

  updateQuantity = (productId, newQuantity) => {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.quantity = newQuantity;

    this.saveToStorage();
  };

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
}

export const cart = new Cart("cart");
