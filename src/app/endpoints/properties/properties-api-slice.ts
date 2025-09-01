import { BASE_URL } from "@/app/configs/constant";
import { realstayApi } from "@/app/store/storeConfigQuery";
import { ApiRequest, ApiResponse } from "../api";
import { Listing, ListingResponse, ListingsResponse } from "./properties-types";

export const listingsApi = realstayApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getListing: builder.query<ApiResponse<Listing>, ApiRequest>({
      query: ({ path }) => {
        return {
          url: BASE_URL + `/listing/${path?.id}`,
          method: "GET",
        };
      },
    }),
    getListings: builder.query<ApiResponse<ListingsResponse>, ApiRequest>({
      query: ({ params }) => {
        return {
          url: BASE_URL + `/listing`,
          method: "GET",
          params,
        };
      },
    }),
  }),
});
