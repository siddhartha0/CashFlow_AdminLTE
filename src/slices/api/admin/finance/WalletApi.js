import { wallet } from "../../../../const/Url";
import { MainApi } from "../../MainApi";

const ApiCollection = MainApi.injectEndpoints({
  endpoints: (builder) => ({
    createWallet: builder.mutation({
      query: (data) => ({
        url: `${wallet}`,
        method: "POST",
        body: data,
      }),
    }),

    getWalletById: builder.query({
      query: (id) => ({
        url: `${wallet}/${id}`,
      }),
    }),

    getAllWallet: builder.query({
      query: () => ({
        url: `${wallet}/getAllWallet`,
      }),
    }),

    updateWallet: builder.mutation({
      query: (data, id) => ({
        method: "PUT",
        body: data,
        url: `${wallet}/${id}`,
      }),
    }),

    deleteWallet: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `${wallet}/${id}`,
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
} = ApiCollection;
