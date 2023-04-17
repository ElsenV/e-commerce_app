import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./reducer";

export default configureStore({
  reducer: { clickedProduct: productSlice },
});
