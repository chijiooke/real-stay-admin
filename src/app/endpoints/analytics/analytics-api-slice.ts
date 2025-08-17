import { BASE_URL } from "@/app/configs/constant";
import { realstayApi } from "@/app/store/storeConfigQuery";
import { ApiRequest, ApiResponse } from "../api";
import { Analytics } from "./analytics-types";

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
  }),
});
