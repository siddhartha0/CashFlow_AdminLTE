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
        <div className="card-header">
          <h3 className="card-title">Bank Totals</h3>
        </div>
        <div className="card-body p-0">
          {Object.keys(totals).length === 0 ? (
            <div className="p-4 text-center">No transactions found</div>
          ) : (
            <table className="table table-responsive-sm">
              <thead>
                <tr>
                  <th>Account</th>
                  <th>Bank</th>
                  <th>Current Balance</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(totals).map((bank) => (
                  <tr key={bank}>
                    <td>{totals[bank].account}</td>
                    <td>{bank}</td>
                    <td>{totals[bank].deposit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </>
    );
  }
}

export default BankList;
