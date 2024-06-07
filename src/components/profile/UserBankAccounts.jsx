import { Component } from "react";
import UserAccountDetails from "./UserAccountDetails";

export default class AnotherComponent extends Component {
  render() {
    const headings = ["ID", "Bank name", "Account Number", "Status"];
    const accounts = [
      {
        id: 1,
        name: "Nepal bank",
        idNumber: 4514554855448484,
        status: "active",
      },
      {
        id: 2,
        name: "Nepal bank",
        idNumber: 4514554855448484,
        status: "active",
      },
      {
        id: 3,
        name: "Nepal bank",
        idNumber: 4514554855448484,
        status: "Inactive",
      },
    ];

    return (
      <div>
        <UserAccountDetails headings={headings} accounts={accounts} />
      </div>
    );
  }
}
