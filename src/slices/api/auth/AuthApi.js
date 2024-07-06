import { MainApi } from "../MainApi";
import { USER_URL } from "../../../const/Url";

const AuthApi = MainApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),

    logIn: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignUpMutation, useLogInMutation } = AuthApi;
