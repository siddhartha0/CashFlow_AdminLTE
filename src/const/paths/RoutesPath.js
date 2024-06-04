import dashboard from "../../assets/icons/dashboard.svg";
import profile from "../../assets/icons/profile.svg";
import bank from "../../assets/icons/bank.svg";
import wallet from "../../assets/icons/wallet.svg";
import business from "../../assets/icons/business.svg";

const RoutesPath = [
  {
    id: 1,
    title: "Dashboard",
    path: "/",
    icons: dashboard,
  },

  {
    id: 2,
    title: "Banks",
    path: "/bank",
    icons: bank,
    children: [
      {
        id: 20,
        title: "Deposit",
        path: "/bank/deposit",
        icons: bank,
      },
      {
        id: 21,
        title: "Withdraw",
        path: "/bank/withdraw",
        icons: bank,
      },
      {
        id: 22,
        title: "Transfer",
        path: "/bank/transfer",
        icons: bank,
      },
    ],
  },
  {
    id: 3,
    title: "Wallet",
    path: "/wallet",
    icons: wallet,
    children: [
      {
        id: 31,
        title: "Deposit",
        path: "/wallet/deposit",

        icons: wallet,
      },
      {
        id: 32,
        title: "Withdraw",
        path: "/wallet/withdraw",

        icons: wallet,
      },
      {
        id: 33,
        title: "Transfer",
        path: "/wallet/transfer",

        icons: wallet,
      },
    ],
  },
  {
    id: 4,
    title: "Business",
    path: "/business",
    icons: business,
  },
  {
    id: 5,
    title: "Profile",
    path: "/profile",
    icons: profile,
    children: [
      {
        id: 50,
        title: "Bank",
        path: "/profile/bank",
        icons: bank,
      },
      {
        id: 51,
        title: "Wallet",
        path: "/profile/wallet",
        icons: wallet,
      },
      {
        id: 52,
        title: "Edit profile",
        path: "/profile/edit-profile",
        icons: bank,
      },
    ],
  },
];

export default RoutesPath;
