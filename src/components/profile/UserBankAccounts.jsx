import { Component } from "react";
import UserAccountDetails from "./UserAccountDetails";

export default class UserBankAccounts extends Component {
  render() {
    const headings = ["ID", "Bank Name", "Account Number", "Status"];
    const accounts = [
      {
        id: 1,
        name: "Nepal Bank",
        idNumber: 4514554855448484,
        status: "Active",
      },
      {
        id: 2,
        name: "Nepal Bank",
        idNumber: 4514554855448484,
        status: "Active",
      },
      {
        id: 3,
        name: "Nepal Bank",
        idNumber: 4514554855448484,
        status: "Inactive",
      },
    ];

    return (
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h3 className="card-title">My Bank Accounts</h3>
        </div>
        <div className="card-body">
          <UserAccountDetails headings={headings} accounts={accounts} />
        </div>
      </div>
    );
  }
}
