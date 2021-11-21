import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    deleteProduct(state, { payload }) {
      return state.filter(({ id }) => id !== payload);
    },
    resetProducts: (state, action) => {
      state.length = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, deleteProduct, resetProducts } = cartSlice.actions;

export default cartSlice.reducer;
