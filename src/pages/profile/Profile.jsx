import { Component } from "react";
import UserDetail from "../../components/Profile/UserDetail";

export default class Profile extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Profile</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="/Home">Home</a>
                    </li>
                    <li className="breadcrumb-item active">User Profile</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* MAIN CONTENT STARTS FROM HERE */}

          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <UserDetail />

                {/* COLUMN OF THE CONTENT */}
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">User Bank Acoounts</h3>
                    </div>
                    <div className="card-body">
                    <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Bank name</th>
                      <th>Account Number</th>
                      <th>Status</th>
                  
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <td>1</td>
                      <td>Nabil Bank</td>
                      <td>4546125451212</td>
                      <td><span className="tag tag-success">Active</span></td>
                    </tr>

                    <tr>
                      <td>2</td>
                      <td>Nepal Bank</td>
                      <td>4546125451212</td>
                      <td><span className="tag tag-success">Active</span></td>
                    </tr>

                    <tr>
                      <td>3</td>
                      <td>Rastriya Banijya Bank</td>
                      <td>56255895255889</td>
                      <td><span className="tag tag-success">Inactive</span></td>
                    </tr>
                    
                  </tbody>
                  </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
       
      </>
    );
  }
}
