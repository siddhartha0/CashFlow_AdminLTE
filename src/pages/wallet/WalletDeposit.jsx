import { Component } from "react";
import $ from "jquery";
// import "jquery-ui/ui/widgets/sortable";

export default class WalletDeposit extends Component {
  componentDidMount() {
    $(function () {
      $("#sortable").sortable();
    });
  }

  render() {
    return (
      <>
        <section className="row" id="sortable">
          <div className="col-lg-3">
            <div className="card p-3">
              <h1>Hello World</h1>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="card p-3">
              <h1>Good Game</h1>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="card p-3">
              <h1>Well Played</h1>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="card p-3">
              <h1>Overpowered</h1>
            </div>
          </div>
        </section>
      </>
    );
  }
}
