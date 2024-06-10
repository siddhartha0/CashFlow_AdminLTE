import { Component } from "react";
import UserAccountDetails from "./UserAccountDetails";

export default class UserWalletAccounts extends Component {
  render() {
    const headings = ["ID", "Wallet Name", "User ID", "Status"];
    const wallets = [
      {
        id: 1,
        name: "Khalti",
        idNumber: 984522558,
        status: "Active",
      },
      {
        id: 2,
        name: "IME Pay",
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
      <div className="card mb-4">
        <div className="card-header bg-secondary text-white">
          <h3 className="card-title">My Wallets</h3>
        </div>
        <div className="card-body">
          <UserAccountDetails headings={headings} accounts={wallets} />
        </div>
      </div>
    );
  }
}
