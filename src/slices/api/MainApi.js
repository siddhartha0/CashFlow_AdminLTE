import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { Base_Url } from "../../const/Url";

const baseQuery = fetchBaseQuery({ baseUrl: Base_Url });

export const MainApi = createApi({
  baseQuery,
  tagTypes: [
    "user",
    "bank",
    "wallet",
    "transaction",
    "country",
    "currency",
    "assets",
    "investment",
  ],
  endpoints: () => ({}),
});
