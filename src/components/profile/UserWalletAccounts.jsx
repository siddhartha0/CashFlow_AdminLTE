import { Component } from 'react'

export default class UserWalletAccounts extends Component {
  render() {
    return (
        <div className="card">
        <div className="card-header">
          <h3 className="card-title">My Wallet Accounts</h3>
        </div>
      
        <div className="card-body table-responsive p-0">
          <table className="table table-hover text-nowrap">
            <thead>
              <tr>
                <th>ID</th>
                <th>Wallet name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Nepal bank </td>
                <td><span className="tag tag-success">Active</span></td>
                
              </tr>
              <tr>
                <td>1</td>
                <td>Nepal bank </td>
                <td><span className="tag tag-success">Active</span></td>
                
              </tr>
              <tr>
                <td>1</td>
                <td>Nepal bank </td>
                <td><span className="tag tag-success">Active</span></td>
                
              </tr>
              </tbody>
              </table>
              </div>
              </div>
    )
  }
}
