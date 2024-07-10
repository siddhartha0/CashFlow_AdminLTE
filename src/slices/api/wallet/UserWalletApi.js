import LocalData from "../../../behindTheScene/helper/LocalData";
import { UserWallet } from "../../../const/Url";
import { MainApi } from "../MainApi";

const UserWalletApi = MainApi.injectEndpoints({
  endpoints: (builder) => ({
    createUserWallet: builder.mutation({
      query: (data) => ({
        url: `${UserWallet}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),

    getUserWalletById: builder.query({
      query: (id) => ({
        url: `${UserWallet}/${id}`,
        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),

    getUsersAllWallet: builder.query({
      query: () => ({
        url: `${UserWallet}`,
        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),

    getAllUsersWallet: builder.query({
      query: () => ({
        url: `${UserWallet}/alluserWallet`,
        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),

    updateUserWallet: builder.mutation({
      query: (data, id) => ({
        method: "PUT",
        body: data,
        url: `${UserWallet}/${id}`,
        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),

    deleteuserWallet: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `${UserWallet}/${id}`,
        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateUserWalletMutation,
  useDeleteuserWalletMutation,
  useGetAllUsersWalletQuery,
  useGetUserWalletByIdQuery,
  useGetUsersAllWalletQuery,
  useUpdateUserWalletMutation,
} = UserWalletApi;
