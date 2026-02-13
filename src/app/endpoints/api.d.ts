import { AxiosHeaders } from "axios";

export type ApiRequestConfig<D, P, T> = {
  data?: D;
  path?: T;
  params?: P & { [key: string]: any };
} & Omit<Partial<AxiosHeaders>, "params">;

export type ApiRequest<
  D = any,
  P = Record<string, any>,
  Q = Record<string, any>
> = {
  path?: P;
  params?: Q;
  data?: D;
} & Omit<Partial<AxiosHeaders>, "params">;

export type ApiResponse<T = any> = {
  success: boolean;
  data: T;
  message: string;
  pagination: Pagination;
};

export type ApiPaginatedResponseData<T = void> = {
  success: boolean;
  data: T;
  message: string;
};

export type ApiErrorResponse = {
  defaultUserMessage: string;
  status: number;
  data: { [key: string]: string };
};

export interface Pagination {
  total_items: number;
  total_pages: number;
  current_page: number;
  limit: number;
}