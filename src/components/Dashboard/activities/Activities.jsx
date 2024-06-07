import { Component } from "react";
import ActivityHeader from "./ActivityHeader";

export default class Activities extends Component {
  constructor() {
    super();
    this.state = {
      selectedId: 1,
    };
    this.selectMenu = this.selectMenu.bind(this);
  }

  selectMenu = (id) => {
    this.setState({
      selectedId: id,
    });
  };

  render() {
    return (
      <div
        className="d-flex flex-column"
        style={{
          marginLeft: "-1rem",
        }}
        id="activitiesParentDiv"
      >
        <ActivityHeader
          currentId={this.state.selectedId}
          selectMenu={this.selectMenu}
        />
      </div>
    );
  }
}
