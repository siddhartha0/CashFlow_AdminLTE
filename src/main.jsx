import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./pages/DashBoard.jsx";
import Bank from "./components/bank/Banks.jsx";
import Profile from "./pages/Profile.jsx";
import Wallet from "./components/wallet/Wallet.jsx";
import Transfer from "./components/bank/Transfer.jsx";
import Deposit from "./components/bank/Deposit.jsx";
import Withdraw from "./components/bank/Withdraw.jsx";
import { Withdraw as WalletWithDraw } from "./components/wallet/Withdraw.jsx";
import { Deposit as WalletDeposit } from "./components/wallet/Deposit.jsx";
import { Transfer as WalletTransfer } from "./components/wallet/Transfer.jsx";
import Banklayout from "./pages/Banklayout.jsx";
import WalletLayout from "./pages/WalletLayout.jsx";
import Business from "./pages/Business.jsx";

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
            <Route path="/wallet/deposit" element={<WalletDeposit />} />
            <Route path="/wallet/transfer" element={<WalletTransfer />} />
            <Route path="/wallet/withdraw" element={<WalletWithDraw />} />
          </Route>

          <Route path="/business" element={<Business />} />

          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
