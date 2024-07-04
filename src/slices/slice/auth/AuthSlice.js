import { createSlice } from "@reduxjs/toolkit";
import {
  storeData,
  getStorageData,
  deleteStorage,
  checkStorageExists,
} from "../../../behindTheScene/helper/LocalData";

const initialState = {
  userInfo: checkStorageExists("user") ? getStorageData("user") : null,
};

const AuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createBank: (state, action) => {
      state.userInfo = action.payload;
      storeData("user", action.payload);
    },

    logOut: (state) => {
      state.userInfo = null;
      deleteStorage("user");
    },
  },
});

export const { logIn, logOut } = AuthSlice.actions;

export default AuthSlice.reducer;
