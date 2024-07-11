import { MainApi } from "../MainApi";
import { Transaction } from "../../../const/Url";
import LocalData from "../../../behindTheScene/helper/LocalData";

const TransactionApi = MainApi.injectEndpoints({
  endpoints: (builder) => ({
    createTransaction: builder.mutation({
      query: (data) => ({
        url: `${Transaction}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),

    getUserTransaction: builder.query({
      query: (id) => ({
        url: `${Transaction}/userAccountTransaction`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),

    getTransactionById: builder.query({
      query: (id) => ({
        url: `${Transaction}/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),

    getTransactionByUserBankId: builder.query({
      query: ({ id }) => ({
        url: `${Transaction}/userBank`,
        method: "GET",
        params: { id },

        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),

    getTransactionByMonth: builder.query({
      query: ({ year }) => ({
        url: `${Transaction}/monthwise`,
        params: { year },
        method: "GET",
        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),

    getAllTransaction: builder.query({
      query: () => ({
        url: `${Transaction}/getAllTransaction`,
        method: "GET",

        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),
    updateTransaction: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `${Transaction}/${id}`,
        method: "PUT",
        body: body,
        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `${Transaction}/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useGetAllTransactionQuery,
  useGetTransactionByIdQuery,
  useUpdateTransactionMutation,
  useGetTransactionByUserBankIdQuery,
  useGetTransactionByMonthQuery,
  useGetDepositOfUserBankByIdQuery,
  useGetWithdrawsOfUserBankByIdQuery,
} = TransactionApi;
