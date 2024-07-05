import { createSlice } from "@reduxjs/toolkit";
import LocalData from "../../../behindTheScene/helper/LocalData";

const initialState = {
  userInfo: LocalData.checkStorageExists("user")
    ? LocalData.getStorageData("user")
    : null,
  userToken: LocalData.checkStorageExists("token")
    ? LocalData.getStorageData("token")
    : null,
};

const AuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.userInfo = action.payload.user;
      state.userToken = action.payload.token;
      LocalData.storeData("token", action.payload.token);
      LocalData.storeData("user", action.payload.user);
    },

    updateCredentials: (state, action) => {
      state.userInfo = action.payload;
      LocalData.storeData("user", action.payload);
    },

    logOut: (state) => {
      state.userInfo = null;
      state.userToken = null;
      LocalData.deleteStorage("user");
      LocalData.deleteStorage("token");
    },
  },
});

export const { logIn, logOut, updateCredentials } = AuthSlice.actions;
export const userDetails = (state) => state.auth.userInfo;
export const userToken = (state) => state.auth.userToken;
export default AuthSlice.reducer;
