import LocalData from "../../../../behindTheScene/helper/LocalData";
import { wallet } from "../../../../const/Url";
import { MainApi } from "../../MainApi";

const WalletApi = MainApi.injectEndpoints({
  endpoints: (builder) => ({
    createWallet: builder.mutation({
      query: (data) => ({
        url: `${wallet}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),

    getWalletById: builder.query({
      query: (id) => ({
        url: `${wallet}/${id}`,
        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),

    getAllWallet: builder.query({
      query: () => ({
        url: `${wallet}/getAllWallet`,
        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),

    updateWallet: builder.mutation({
      query: (data, id) => ({
        method: "PUT",
        body: data,
        url: `${wallet}/${id}`,
        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),

    deleteWallet: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `${wallet}/${id}`,
        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateWalletMutation,
  useDeleteWalletMutation,
  useGetAllWalletQuery,
  useGetWalletByIdQuery,
  useUpdateWalletMutation,
} = WalletApi;
