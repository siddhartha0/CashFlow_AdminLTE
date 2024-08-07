import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import DashBoard from "./pages/dashboard/DashBoard.jsx";
import Wallet from "./pages/wallet/Wallet.jsx";
import Transfer from "./pages/bank/Transfer.jsx";
import DepositPage from "./pages/bank/DepositPage.jsx";
import Withdraw from "./pages/bank/Withdraw.jsx";
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
import { Provider } from "react-redux";
import HomeLayout from "./landingPage/pages/HomeLayout.jsx";
import HomePage from "./landingPage/pages/HomePage.jsx";
import "./index.css";
import LoginPage from "./landingPage/pages/LoginPage.jsx";
import SignupPage from "./landingPage/pages/SignupPage.jsx";
import LinkBanks from "./pages/bank/LinkBanks.jsx";
import CreateDeposit from "./components/bank/CreateDeposit.jsx";
import CreateWithdraw from "./components/bank/CreateWithdraw.jsx";
import BankCalender from "./pages/bank/BankCalender.jsx";

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
              <Route path="withdraw" element={<Withdraw />} />
              <Route path="linkBank" element={<LinkBanks />} />
              <Route path="calender" element={<BankCalender />} />

              <Route path="deposit/new" element={<CreateDeposit />} />

              <Route path="withdraw/new" element={<CreateWithdraw />} />
            </Route>

            <Route path="wallet" element={<WalletLayout />}>
              <Route index element={<Wallet />} />
              <Route path="deposit" element={<WalletDeposit />} />
              <Route path="transfer" element={<WalletTransfer />} />
              <Route path="withdraw" element={<WalletWithdraw />} />
            </Route>

            <Route path="business" element={<Business />} />

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
