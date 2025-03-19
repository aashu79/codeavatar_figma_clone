// Check if you have this store.ts file with proper setup
import { configureStore } from "@reduxjs/toolkit";
import { productServices } from "./apiServices/productServices";

export const store = configureStore({
  reducer: {
    [productServices.reducerPath]: productServices.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productServices.middleware),
});
