import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme";
import cartReducer from "./cart";
export default configureStore({
  reducer: {
    theme: themeReducer,
    cart: cartReducer,
  },
});
