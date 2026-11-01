import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const addQty = action.payload.quantity || 1;
      const payloadId = product._id || product.id;

      const existingItem = state.items.find(
        (item) => (item._id || item.id) === payloadId
      );

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + addQty;
      } else {
        state.items.push({
          ...product,
          quantity: addQty,
        });
      }

      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    updateQuantity: (state, action) => {
      const { id, delta } = action.payload;

      const item = state.items.find(
        (i) => (i._id || i.id) === id
      );

      if (item) {
        item.quantity = (item.quantity || 1) + delta;

        if (item.quantity <= 0) {
          state.items = state.items.filter(
            (i) => (i._id || i.id) !== id
          );
        }
      }

      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => (item._id || item.id) !== action.payload
      );

      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cart');
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;