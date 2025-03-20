import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { errorFormat, successFormat, request_maker } from "./networkDomain";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
      body?: any;
      params?: any;
    },
    unknown,
    unknown
  > =>
  async ({ url, method = "GET", body, params }) => {
    try {
      // Use request_maker to make the API call
      const response = await request_maker({
        url,
        method,
        data: body,
        params,
      });

      return { data: successFormat(response.data) };
    } catch (error: any) {
      return {
        error: errorFormat(error.response?.data || error.message),
      };
    }
  };

export default axiosBaseQuery;
