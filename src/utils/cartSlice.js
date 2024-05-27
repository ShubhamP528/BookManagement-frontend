import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    showcart: (state, action) => {
      state.items = action.payload;
    },
    addItems: (state, action) => {
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].book._id === action.payload._id) {
          state.items[i].quantity++;
          return;
        }
      }
      state.items.push({ book: action.payload, quantity: 1 });
    },
    removeItems: (state, action) => {
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].book._id === action.payload.book._id) {
          state.items[i].quantity--;
          if (state.items[i].quantity === 0) {
            state.items.splice(i, 1);
          }
          return;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItems, removeItems, clearCart, showcart } = cartSlice.actions;

export default cartSlice.reducer;
