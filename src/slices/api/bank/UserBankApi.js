import { MainApi } from "../MainApi";
import { UserBank } from "../../../const/Url";
import LocalData from "../../../behindTheScene/helper/LocalData";

const UserBankApi = MainApi.injectEndpoints({
  endpoints: (builder) => ({
    linkUserBank: builder.mutation({
      query: (data) => ({
        url: `${UserBank}/`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),

    getLinkBankById: builder.query({
      query: (id) => ({
        url: `${UserBank}/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),

    getAllLinkBank: builder.query({
      query: () => ({
        url: `${UserBank}/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),
    updateLinkBank: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `${UserBank}/${id}`,
        method: "PUT",
        body: body,
        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),
    deleteLinkBank: builder.mutation({
      query: (id) => ({
        url: `${UserBank}/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),
  }),
});

export const {
  useDeleteLinkBankMutation,
  useGetAllLinkBankQuery,
  useGetLinkBankByIdQuery,
  useLinkUserBankMutation,
  useUpdateLinkBankMutation,
} = UserBankApi;
