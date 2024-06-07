import  { Component } from "react";
import PropTypes from "prop-types";

export default class UserAccountDetails extends Component {
  static propTypes = {
    accounts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        idNumber: PropTypes.number.isRequired,
        Status: PropTypes.string.isRequired,
      })
    ).isRequired,
    headings: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  render() {
    const { accounts, headings } = this.props;

    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">My Bank Accounts</h3>
        </div>

        <div className="card-body table-responsive p-0">
          <table className="table table-hover text-nowrap">
            <thead>
              <tr>
                {headings.map((heading, index) => (
                  <th key={index}>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id}>
                  <td>{account.id}</td>
                  <td>{account.name}</td>
                  <td>{account.idNumber}</td>
                  <td>{account.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
