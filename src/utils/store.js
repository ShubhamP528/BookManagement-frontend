import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import cartLoad from "./cartLoad";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    cartloader: cartLoad,
  },
});

export default store;
