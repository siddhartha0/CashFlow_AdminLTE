import { configureStore } from "@reduxjs/toolkit";
import { MainApi } from "../slices/api/MainApi";

const store = configureStore({
  reducer: {
    [MainApi.reducerPath]: MainApi.reducer,
  },
  middleware: (getDefaultMiddware) =>
    getDefaultMiddware().concat(MainApi.middleware),
  devTools: true,
});

export default store;
