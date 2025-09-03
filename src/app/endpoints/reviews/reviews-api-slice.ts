import { BASE_URL } from "@/app/configs/constant";
import { realstayApi } from "@/app/store/storeConfigQuery";
import { ApiRequest, ApiResponse } from "../api";
import { ReviewsResponse } from "./reviews-types";

export const reviewsApi = realstayApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getReview: builder.query<ApiResponse<ReviewsResponse>, ApiRequest>({
      query: ({ path }) => {
        return {
          url: BASE_URL + `/reviews/${path?.id}`,
          method: "GET",
        };
      },
    }),
    getReviews: builder.query<ApiResponse<ReviewsResponse>, ApiRequest>({
      query: ({ params }) => {
        return {
          url: BASE_URL + `/reviews`,
          method: "GET",
          params,
        };
      },
    }),
  }),
});
