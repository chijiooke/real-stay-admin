import { BASE_URL } from "@/app/configs/constant";
import { realstayApi } from "@/app/store/storeConfigQuery";
import { ApiRequest, ApiResponse } from "../api";
import { IdentityVerificationData, IdentityVerificationResponse } from "./kyc-types";

export const kycApi = realstayApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getUserKyc: builder.query<
      ApiResponse<IdentityVerificationData>,
      ApiRequest
    >({
      query: ({ path }) => {
        return {
          url: BASE_URL + `/kyc/admin/${path?.id}`,
          method: "GET",
        };
      },
    }),
  }),
});
