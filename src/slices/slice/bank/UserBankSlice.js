import { createSlice } from "@reduxjs/toolkit";
import LocalData from "../../../behindTheScene/helper/LocalData";

const initialState = {
  bank: LocalData.checkStorageExists("userbank")
    ? LocalData.getStorageData("userbank")
    : null,
};

const UserBankSlice = createSlice({
  name: "userbank",
  initialState,
  reducers: {
    storeUserBankData: (state, action) => {
      state.bank = action.payload;
      LocalData.storeData("userbank", action.payload);
    },
  },
});

export const { storeUserBankData } = UserBankSlice.actions;
export const userbankDetails = (state) => state.userbank.bank;

export default UserBankSlice.reducer;
