import { createSlice } from "@reduxjs/toolkit";
import LocalData from "../../../behindTheScene/helper/LocalData";

const initialState = {
  wallet: LocalData.checkStorageExists("userwallet")
    ? LocalData.getStorageData("userwallet")
    : null,
};

const UserWalletSlice = createSlice({
  name: "userwallet",
  initialState,
  reducers: {
    storeUserWalletData: (state, action) => {
      state.bank = action.payload;
      LocalData.storeData("userwallet", action.payload);
    },
  },
});

export const { storeUserWalletData } = UserWalletSlice.actions;
export const userWalletDetail = (state) => state.userWallet.wallet;

export default UserWalletSlice.reducer;
