import { MainApi } from "./MainApi";
import { Bank } from "../../const/Url";

const BankApi = MainApi.injectEndpoints({
  endpoints: (builder) => ({
    createBank: builder.mutation({
      query: (bank) => ({
        url: `${Bank}/createBank`,
        method: "POST",
        body: bank,
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
