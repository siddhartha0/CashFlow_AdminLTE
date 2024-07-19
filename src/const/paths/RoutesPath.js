import dashboard from "../../assets/icons/dashboard.svg";
import profile from "../../assets/icons/profile.svg";
import bank from "../../assets/icons/bank.svg";
import wallet from "../../assets/icons/wallet.svg";
import business from "../../assets/icons/business.svg";

const RoutesPath = [
  {
    id: 1,
    title: "Dashboard",
    path: "/dashboard",
    icons: dashboard,
  },

  {
    id: 2,
    title: "Banks",
    path: "/dashboard/bank",
    icons: bank,
    children: [
      {
        id: 20,
        title: "Deposit",
        path: "/dashboard/bank/deposit",
        icons: bank,
      },
      {
        id: 21,
        title: "Withdraw",
        path: "/dashboard/bank/withdraw",
        icons: profile,
      },
      {
        id: 22,
        title: "Transfer",
        path: "/dashboard/bank/transfer",
        icons: bank,
      },
      {
        id: 23,
        title: "Link Banks",
        path: "/dashboard/bank/linkBank",
        icons: bank,
      },
      {
        id: 24,
        title: "Calender",
        path: "/dashboard/bank/calender",
        icons: bank,
      },
    ],
  },
  {
    id: 3,
    title: "Wallet",
    path: "/dashboard/wallet",
    icons: wallet,
    children: [
      {
        id: 31,
        title: "Deposit",
        path: "/dashboard/wallet/deposit",

        icons: wallet,
      },
      {
        id: 32,
        title: "Withdraw",
        path: "/dashboard/wallet/withdraw",

        icons: wallet,
      },
      {
        id: 33,
        title: "Transfer",
        path: "/dashboard/wallet/transfer",

        icons: wallet,
      },
    ],
  },
  {
    id: 4,
    title: "Business",
    path: "/dashboard/business",
    icons: business,
  },

  {
    id: 5,
    title: "Profile",
    path: "/dashboard/profile",
    icons: profile,
    children: [
      {
        id: 50,
        title: "Bank",
        path: "/dashboard/profile/bank",
        icons: bank,
      },
      {
        id: 51,
        title: "Wallet",
        path: "/dashboard/profile/wallet",
        icons: wallet,
      },
      {
        id: 52,
        title: "Edit profile",
        path: "/dashboard/profile/edit-profile",
        icons: bank,
      },
    ],
  },
];

export default RoutesPath;
