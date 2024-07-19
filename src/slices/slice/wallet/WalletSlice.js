import { createSlice } from "@reduxjs/toolkit";
import LocalData from "../../../behindTheScene/helper/LocalData";

const initialState = {
  wallet: LocalData.checkStorageExists("wallet")
    ? LocalData.getStorageData("wallet")
    : null,
};

const WalletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    storeWalletData: (state, action) => {
      state.bank = action.payload;
      LocalData.storeData("wallet", action.payload);
    },
  },
});

export const { storeWalletData } = WalletSlice.actions;
export const walletDetails = (state) => state.wallet.wallet;

export default WalletSlice.reducer;
