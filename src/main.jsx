import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import DashBoard from "./pages/dashboard/DashBoard.jsx";
import Wallet from "./pages/wallet/Wallet.jsx";
import Transfer from "./pages/bank/Transfer.jsx";
import DepositPage from "./pages/bank/DepositPage.jsx";
import Withdraw from "./pages/bank/Withdraw.jsx";
import CreateWithdraw from "./pages/bank/CreateWithdraw.jsx";
import CreateDeposit from "./pages/bank/CreateDeposit.jsx";
import Banklayout from "./pages/bank/Banklayout.jsx";
import WalletLayout from "./pages/wallet/WalletLayout.jsx";
import Business from "./pages/business/Business.jsx";
import Bank from "./pages/bank/Bank.jsx";
import Profile from "./pages/profile/Profile.jsx";
import BankProfileDetails from "./pages/profile/BankProfileDetails.jsx";
import WalletProfileDetails from "./pages/profile/WalletProfileDetails.jsx";
import EditProfile from "./pages/profile/EditProfile.jsx";
import ProfileLayout from "./pages/profile/ProfileLayout.jsx";
import WalletDeposit from "./pages/wallet/WalletDeposit.jsx";
import { WalletTransfer } from "./pages/wallet/WalletTransfer.jsx";
import { WalletWithdraw } from "./pages/wallet/WalletWithdraw.jsx";
import store from "./store/index.js";
import Asset from "./pages/asset/Asset.jsx";
import CreateAsset from "./pages/asset/CreateAsset.jsx";
import UpdateAsset from "./pages/asset/UpdateAsset.jsx";
import { Provider } from "react-redux";
import HomeLayout from "./landingPage/pages/HomeLayout.jsx";
import HomePage from "./landingPage/pages/HomePage.jsx";
import "./index.css";
import LoginPage from "./landingPage/pages/LoginPage.jsx";
import SignupPage from "./landingPage/pages/SignupPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>

          <Route path="/dashboard" element={<App />}>
            <Route index element={<DashBoard />} />
            <Route path="bank" element={<Banklayout />}>
              <Route index element={<Bank />} />
              <Route path="transfer" element={<Transfer />} />
              <Route path="deposit" element={<DepositPage />} />
              <Route path="deposit/new" element={<CreateDeposit />} />
              <Route path="withdraw" element={<Withdraw />} />
              <Route path="withdraw/new" element={<CreateWithdraw />} />
            </Route>
            <Route path="wallet" element={<WalletLayout />}>
              <Route index element={<Wallet />} />
              <Route path="deposit" element={<WalletDeposit />} />
              <Route path="transfer" element={<WalletTransfer />} />
              <Route path="withdraw" element={<WalletWithdraw />} />
            </Route>
            <Route path="business" element={<Business />} />
            <Route path="asset" element={<Asset />} />
            <Route path="asset/new" element={<CreateAsset />} />{" "}
            {/* Add this route */}
            <Route path="asset/update/:id" element={<UpdateAsset />} />
            <Route path="profile" element={<ProfileLayout />}>
              <Route index element={<Profile />} />
              <Route path="bank" element={<BankProfileDetails />} />
              <Route path="wallet" element={<WalletProfileDetails />} />
              <Route path="edit-profile" element={<EditProfile />} />
            </Route>
            <Route path="profile" element={<ProfileLayout />}>
              <Route index element={<Profile />} />
              <Route path="bank" element={<BankProfileDetails />} />
              <Route path="wallet" element={<WalletProfileDetails />} />
              <Route path="edit-profile" element={<EditProfile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
