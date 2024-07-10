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
