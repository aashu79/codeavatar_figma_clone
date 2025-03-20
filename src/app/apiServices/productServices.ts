import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../lib/utils";

export const productServices = createApi({
  reducerPath: "products",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => {
    return {
      getAllProducts: builder.query({
        query: () => ({
          url: "/products",
          method: "GET",
        }),
      }),
    };
  },
});

export const { useGetAllProductsQuery } = productServices;
