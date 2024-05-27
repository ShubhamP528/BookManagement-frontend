import { createSlice } from "@reduxjs/toolkit";

const cartLoad = createSlice({
  name: "cartloader",
  initialState: {
    loading: true,
  },
  reducers: {
    setLoad: (state, action) => {
      state.loading = action.payload;
      console.log(state.loading);
    },
  },
});

export const { setLoad } = cartLoad.actions;

export default cartLoad.reducer;
