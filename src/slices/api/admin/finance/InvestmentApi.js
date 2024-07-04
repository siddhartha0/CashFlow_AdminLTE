import { MainApi } from "../../MainApi";
import { Investment } from "../../../../const/Url";

const InvestmentApi = MainApi.injectEndpoints({
  endpoints: (builder) => ({
    createInvestment: builder.mutation({
      query: (bank) => ({
        url: `${Investment}/createInvestment`,
        method: "POST",
        body: bank,
      }),
    }),

    getInvestmentById: builder.query({
      query: (id) => ({
        url: `${Investment}/${id}`,
      }),
    }),

    getAllInvestment: builder.query({
      query: () => ({
        url: `${Investment}/getAllInvestment`,
      }),
    }),

    updateInvestment: builder.mutation({
      query: (data, id) => ({
        method: "PUT",
        body: data,
        url: `${Investment}/${id}`,
      }),
    }),

    deleteInvestment: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `${Investment}/${id}`,
      }),
    }),
  }),
});

export const {
  useCreateInvestmentMutation,
  useDeleteInvestmentMutation,
  useGetAllInvestmentQuery,
  useGetInvestmentByIdQuery,
  useUpdateInvestmentMutation,
} = InvestmentApi;
