import { configureStore } from "@reduxjs/toolkit";
import { MainApi } from "../slices/api/MainApi";
import AuthSlice from "../slices/slice/auth/AuthSlice";
import BankSlice from "../slices/slice/bank/BankSlice";

const store = configureStore({
  reducer: {
    [MainApi.reducerPath]: MainApi.reducer,
    auth: AuthSlice,
    bank: BankSlice,
  },
  middleware: (getDefaultMiddware) =>
    getDefaultMiddware().concat(MainApi.middleware),
  devTools: true,
});

export default store;
