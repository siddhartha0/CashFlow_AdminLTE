import React, { Component } from "react";

class BankList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: this.props.transactions,
      totals: {},
    };
  }

  componentDidMount() {
    this.calculateTotals();
  }

  calculateTotals() {
    const { transactions } = this.state;
    const totals = {};

    transactions.forEach((transaction) => {
      if (!totals[transaction.bank]) {
        totals[transaction.bank] = {
          deposit: 0,
          withdraw: 0,
          account: transaction.account,
        };
      }

      if (transaction.status === "deposit") {
        totals[transaction.bank].deposit += transaction.amount;
      } else if (transaction.status === "withdraw") {
        totals[transaction.bank].withdraw += transaction.amount;
      }
    });

    this.setState({ totals });
  }

  render() {
    const { totals } = this.state;

    // console.log(this.props.transactions);

    return (
      <>
        <h3 className="card-title mb-3">Bank Totals</h3>
        {Object.keys(totals).length === 0 ? (
          <h3>No transactions available</h3>
        ) : (
          <table className="table table-responsive-sm">
            <thead>
              <tr>
                <th>Bank</th>
                <th>Account</th>
                <th>Total Deposit</th>
                <th>Total Withdraw</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(totals).map((bank) => (
                <tr key={bank}>
                  <td>{bank}</td>
                  <td>{totals[bank].account}</td>
                  <td>{totals[bank].deposit}</td>
                  <td>{totals[bank].withdraw}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    );
  }
}

export default BankList;
