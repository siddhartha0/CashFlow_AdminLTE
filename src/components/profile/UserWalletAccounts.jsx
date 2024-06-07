import  { Component } from "react";
import UserAccountDetails from "./UserAccountDetails";

export default class UserWalletAccounts extends Component {
  render() {
    const headings = ["ID", "Wallet name", "UserID", "Status"];
    const wallets = [
      {
        id: 1,
        name: "Khalti",
        idNumber: 984522558,
        status: "Active",
      },
      {
        id: 2,
        name: "IME pay",
        idNumber: 9455458445,
        status: "Active",
      },
      {
        id: 3,
        name: "Esewa",
        idNumber: 9845415845,
        status: "Inactive",
      },
    ];

    return (
      <div>
        <UserAccountDetails headings={headings} accounts={wallets} />
      </div>
    );
  }
}
