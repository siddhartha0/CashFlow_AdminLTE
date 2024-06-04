import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./pages/dashboard/DashBoard.jsx";
import Wallet from "./pages/wallet/Wallet.jsx";
import Transfer from "./pages/bank/Transfer.jsx";
import Deposit from "./pages/bank/Deposit.jsx";
import Withdraw from "./pages/bank/Withdraw.jsx";
import { Withdraw as WalletWithDraw } from "./pages/wallet/Withdraw.jsx";
import { Deposit as WalletDeposit } from "./pages/wallet/Deposit.jsx";
import { Transfer as WalletTransfer } from "./pages/wallet/Transfer.jsx";
import Banklayout from "./pages/bank/Banklayout.jsx";
import WalletLayout from "./pages/wallet/WalletLayout.jsx";
import Business from "./pages/business/Business.jsx";
import Bank from "./pages/bank/Bank.jsx";
import Profile from "./pages/profile/Profile.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<DashBoard />} />

          <Route path="/bank" element={<Banklayout />}>
            <Route index element={<Bank />} />
            <Route path="transfer" element={<Transfer />} />
            <Route path="deposit" element={<Deposit />} />
            <Route path="withdraw" element={<Withdraw />} />
          </Route>

          <Route path="/wallet" element={<WalletLayout />}>
            <Route index element={<Wallet />} />
            <Route path="deposit" element={<WalletDeposit />} />
            <Route path="transfer" element={<WalletTransfer />} />
            <Route path="withdraw" element={<WalletWithDraw />} />
          </Route>

          <Route path="/business" element={<Business />} />

          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
