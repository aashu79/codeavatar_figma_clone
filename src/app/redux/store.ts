import { configureStore } from "@reduxjs/toolkit";
import { productServices } from "../apiServices/productServices";
import globalReducer from "../state/globalState";
import { setupListeners } from "@reduxjs/toolkit/query";
export const store = configureStore({
  reducer: {
    globalState: globalReducer,
    [productServices.reducerPath]: productServices.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productServices.middleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
