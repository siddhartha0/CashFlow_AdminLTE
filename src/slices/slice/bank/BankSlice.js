import { createSlice } from "@reduxjs/toolkit";
import LocalData from "../../../behindTheScene/helper/LocalData";

const initialState = {
  bank: LocalData.checkStorageExists("bank")
    ? LocalData.getStorageData("bank")
    : null,
};

const BankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    storeBankData: (state, action) => {
      state.bank = action.payload;
      LocalData.storeData("bank", action.payload);
    },
  },
});

export const { storeBankData } = BankSlice.actions;
export const bankDetails = (state) => state.bank.bank;

export default BankSlice.reducer;
