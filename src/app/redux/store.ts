import { configureStore } from "@reduxjs/toolkit";
import { productServices } from "../apiServices/productServices";

export const store = configureStore({
  reducer: {
    [productServices.reducerPath]: productServices.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productServices.middleware);
  },
});
