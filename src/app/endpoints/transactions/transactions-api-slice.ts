import { BASE_URL } from "@/app/configs/constant";
import { realstayApi } from "@/app/store/storeConfigQuery";
import { ApiRequest, ApiResponse } from "../api";
import { Transaction, TransactionsAPIResponse } from "./transactions-types";

export const transactionApi = realstayApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getTransaction: builder.query<ApiResponse<Transaction>, ApiRequest>({
      query: ({ path }) => {
        return {
          url: BASE_URL + `/transactions/${path?.id}`,
          method: "GET",
        };
      },
    }),
    getTransactions: builder.query<ApiResponse<TransactionsAPIResponse>, ApiRequest>({
      query: ({ params }) => {
        return {
          url: BASE_URL + `/transactions`,
          method: "GET",
          params,
        };
      },
    }),
  }),
});
