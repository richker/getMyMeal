import React, { Component } from "react";

class SideBar extends Component {
  renderButton = (label, index, func) => {
    return (
      <button // btn-link nav-link
        className="btn btn-outline-info text-nowrap my-2"
        onClick={() => func(index)}
      >
        {label}
      </button>
    );
  };

  render() {
    return (
      <div
        className="col-2 bg-light sticky-top text-center"
        style={{
          height: "100vh"
        }}
      >
        <br />
        <br />
        <h3>
          <span className="badge badge-pill badge-info">
            <div className="clickable" onClick={() => this.props.index(0)}>
              <i>Get my Meal</i>
            </div>
          </span>
        </h3>
        <div className="btn-group-vertical my-4">
          <div className="btn text-center my-2 disabled">
            <b>
              <em>Search By:</em>
            </b>
          </div>
          {this.renderButton("Products", 1, this.props.index)}
          {this.renderButton("Nutritions", 2, this.props.index)}
          {this.renderButton("Preferences", 5, this.props.index)}
          {this.renderButton("Allergies & Caloric", 3, this.props.index)}
        </div>
        <hr />
        <div className="btn-group-vertical my-4">
          <button
            className="btn btn-outline-info"
            onClick={() => {
              this.props.superFunc();
              this.props.index(4);
            }}
          >
            <i>
              Find Me the Closest <div />
              Supermarket
            </i>
          </button>
        </div>
      </div>
    );
  }
}

export default SideBar;
