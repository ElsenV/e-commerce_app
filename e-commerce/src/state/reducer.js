import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {
    products: [],
    count: 0,
    total: 0,
  },
  isLogin: false,
  username: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    ADD_CART(state, action) {
      const hasProduct = state.cart.products.some(
        (product) => product.id === action.payload.product.id
      );

      if (hasProduct) {
        state.cart.products.map((product) =>
          product.id === action.payload.product.id
            ? (product.quantity += action.payload.quantity) &&
              (product.totalPrice = product.quantity * product.price) &&
              (state.cart.total += product.price * action.payload.quantity)
            : product
        );
      } else if (!hasProduct) {
        state.cart.products = [
          ...state.cart.products,
          {
            ...action.payload.product,
            quantity: action.payload.quantity,
            totalPrice: action.payload.product.price * action.payload.quantity,
          },
        ];
        state.cart.count += 1;
        state.cart.total +=
          action.payload.product.price * action.payload.quantity;
      }
    },

    DELETE_PRODUCT(state, action) {
      const filtered = state.cart.products.filter(
        (product) => product.id !== action.payload.id
      );
      state.cart.products = filtered;
      state.cart.count -= 1;
      state.cart.total -= action.payload.totalPrice;
    },
    CHECK_FOR_LOGIN(state, action) {
     
      state.isLogin = !state.isLogin;
      state.username = action.payload;
    },
  },
});

export const { ADD_CART, DELETE_PRODUCT, CHECK_FOR_LOGIN } =
  productSlice.actions;
export default productSlice.reducer;
