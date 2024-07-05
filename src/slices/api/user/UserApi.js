import { MainApi } from "../MainApi";
import { USER_URL } from "../../../const/Url";
import LocalData from "../../../behindTheScene/helper/LocalData";

const UserApi = MainApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/createUser`,
        method: "POST",
        body: data,
      }),
    }),

    getUserById: builder.query({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
      }),
    }),

    getAllUser: builder.query({
      query: () => ({
        url: `${USER_URL}/getAllBank`,
      }),
    }),

    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        method: "PUT",
        body: body,
        url: `${USER_URL}/${id}`,
        headers: {
          Authorization: `Bearer ${LocalData.getStorageData("token")}`,
        },
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `${USER_URL}/${id}`,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetAllUserQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = UserApi;
