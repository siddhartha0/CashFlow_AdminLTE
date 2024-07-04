import { MainApi } from "../MainApi";
import { USER_URL } from "../../../const/Url";

const UserApi = MainApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/createUser`,
        method: "POST",
        body: data,
        headers: {
          // Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }),
    }),

    getUserById: builder.query({
      query: (id) => ({
        url: `${Bank}/${id}`,
      }),
    }),

    getAllUser: builder.query({
      query: () => ({
        url: `${Bank}/getAllBank`,
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ4aW51IiwiZW1haWwiOiJ4aW51QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMDA2NzY0NSwiZXhwIjoxNzIwMTU0MDQ1fQ.inV_jh_J9tY3tbUPZbAvm56M8maigR17qRHplbJ5a5M`,
        },
      }),
    }),

    updateUser: builder.mutation({
      query: (data, id) => ({
        method: "PUT",
        body: data,
        url: `${Bank}/${id}`,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `${Bank}/${id}`,
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
