import { MainApi } from "../../MainApi";
import { Bank } from "../../../../const/Url";
import LocalData from "../../../../behindTheScene/helper/LocalData";

const BankApi = MainApi.injectEndpoints({
  endpoints: (builder) => ({
    createBank: builder.mutation({
      query: (bank) => ({
        url: `${Bank}/createBank`,
        method: "POST",
        body: bank,
        headers: {
          // Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }),
    }),

    getBankById: builder.query({
      query: (id) => ({
        url: `${Bank}/${id}`,
      }),
    }),

    getAllBanks: builder.query({
      query: () => ({
        url: `${Bank}/getAllBank`,
        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),

    // getAllEntity: () =>
    //   builder.query({
    //     query: () => ({
    //       url: `${Bank}/getAllBank`,
    //       headers: {
    //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ4aW51IiwiZW1haWwiOiJ4aW51QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMDA2NzY0NSwiZXhwIjoxNzIwMTU0MDQ1fQ.inV_jh_J9tY3tbUPZbAvm56M8maigR17qRHplbJ5a5M`,
    //       },
    //     }),
    //   }),

    updateBank: builder.mutation({
      query: (data, id) => ({
        method: "PUT",
        body: data,
        url: `${Bank}/${id}`,
      }),
    }),

    deleteBank: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `${Bank}/${id}`,
      }),
    }),
  }),
});

export const {
  useCreateBankMutation,
  useGetBankByIdQuery,
  useUpdateBankMutation,
  useDeleteBankMutation,
  useGetAllBanksQuery,
} = BankApi;
