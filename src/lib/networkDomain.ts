import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface RequestMakerArgs extends AxiosRequestConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: any;
  params?: any;
}

const baseUrl = "https://fakestoreapi.com";

export const request_maker = async ({
  url,
  method = "GET",
  data,
  params,
}: RequestMakerArgs): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios({
      url: baseUrl + url,
      method,
      data,
      params,
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export interface SuccessResponse<T> {
  success: boolean;
  data: T;
}

export const successFormat = <T>(data: T): SuccessResponse<T> => {
  return {
    success: true,
    data,
  };
};

export interface ErrorResponse {
  success: boolean;
  message: string;
  status: number;
  data: any;
}

export const errorFormat = (error: any): ErrorResponse => {
  return {
    success: false,
    message: error?.message || "An error occurred",
    status: error?.status || 500,
    data: error || null,
  };
};
