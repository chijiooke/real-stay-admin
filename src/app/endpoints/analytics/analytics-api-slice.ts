import { BASE_URL } from "@/app/configs/constant";
import { realstayApi } from "@/app/store/storeConfigQuery";
import { ApiRequest, ApiResponse } from "../api";
import { Analytics, StatsResponse } from "./analytics-types";

export const analyticApi = realstayApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    analytics: builder.query<ApiResponse<Analytics>, ApiRequest>({
      query: ({}) => {
        return {
          url: BASE_URL + "/analytics",
          method: "GET",
        };
      },
    }),
    dailyListingStats: builder.query<ApiResponse<StatsResponse>, ApiRequest>({
      query: ({ params }) => {
        return {
          url: BASE_URL + "/analytics/listing-analytics/daily",
          method: "GET",
          params,
        };
      },
    }),
    monthlyListingStats: builder.query<ApiResponse<StatsResponse>, ApiRequest>({
      query: ({ params }) => {
        return {
          url: BASE_URL + "/analytics/listing-analytics/monthly",
          method: "GET",
          params,
        };
      },
    }),
  }),
});
