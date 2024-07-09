import { configureStore } from "@reduxjs/toolkit";
import { MainApi } from "../slices/api/MainApi";
import AuthSlice from "../slices/slice/auth/AuthSlice";
import BankSlice from "../slices/slice/bank/BankSlice";
import UserBankSlice from "../slices/slice/bank/UserBankSlice";
import UserWalletSlice from "../slices/slice/wallet/UserWalletSlice";
import WalletSlice from "../slices/slice/wallet/WalletSlice";

const store = configureStore({
  reducer: {
    [MainApi.reducerPath]: MainApi.reducer,
    auth: AuthSlice,
    bank: BankSlice,
    wallet: WalletSlice,
    userbank: UserBankSlice,
    userWallet: UserWalletSlice,
  },
  middleware: (getDefaultMiddware) =>
    getDefaultMiddware().concat(MainApi.middleware),
  devTools: true,
});

export default store;
