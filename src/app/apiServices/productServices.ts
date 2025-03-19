import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productServices = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com",
  }),
  endpoints: (builder) => {
    return {
      getAllProducts: builder.query({
        query: () => `/products`,
      }),
    };
  },
});

export const { useGetAllProductsQuery } = productServices;
