import { BASE_URL } from "@/app/configs/constant";
import { realstayApi } from "@/app/store/storeConfigQuery";
import { ApiRequest, ApiResponse } from "../api";
import { AuthData, InviteAdminUserPayload } from "./auth-types";

export const authApi = realstayApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    login: builder.mutation<any, ApiRequest>({
      query: ({ data }) => {
        console.log(BASE_URL + "/auth/login", "BASE_URL");
        return {
          url: BASE_URL + "/auth/login",
          method: "POST",
          data: data,
        };
      },
    }),
    acceptInvite: builder.mutation<any, ApiRequest>({
      query: ({ data }) => {
        return {
          url: BASE_URL + "/auth/accept-invite",
          method: "POST",
          data: data,
        };
      },
    }),
    inviteAdmin: builder.mutation<any, ApiRequest<InviteAdminUserPayload>>({
      query: ({ data }) => {
        return {
          url: BASE_URL + "/auth/admin-invite",
          method: "POST",
          data: data,
        };
      },
    }),
  }),
});
