import React, { Component } from "react";
import { Jumbotron, Collapse, Button } from "reactstrap";
import UserManual from "./userManual";

class WelcomeJumb extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <React.Fragment>
        <Jumbotron>
          <em>
            <h4 className="display-4 text-center">
              Welcome to get My Meal App!
            </h4>
          </em>
          <br />
          <hr />
          <h6 className="display-6">
            <p>
              Welcome to the network application that allows you to customize a
              recipe for you according to several different categories.
            </p>
            <p>
              Our main feature allows you to list your products in the
              refrigerator and find the right recipe for you. <br />
              If you do not have all the products for the above recipe, you can
              get a variety of recipes suitable for your products.
            </p>
            <p>
              If you are on a diet and want to keep it - you can look for the
              recipe according to your nutritional values.
            </p>
            <p>Allergic, no problem check out our allergy search!</p>
            <p>
              If you really want to diversify - use <em>Preferences</em> to find
              the dish really easily according to your preferences
            </p>
            <p>
              <i>
                In the recipe there is a product that is not found in your home
                ?!?
              </i>
              - there is a search that will find replacement products for those
              products that are difficult to keep at home.
            </p>
            <p>
              And finally if you do not have the product at home and really like
              the recipe, you can easily find the closest open supermarket to
              your home by our supermarket matching algorithm.
            </p>
            <br />
            <p>
              <em>enjoy your meal!</em>
            </p>
          </h6>
          <div className="text-right">
            <Button
              color="primary"
              onClick={this.toggle}
              style={{ marginBottom: "1rem" }}
            >
              User Manual
            </Button>
          </div>
        </Jumbotron>
        <Collapse isOpen={this.state.collapse}>
          <Jumbotron className="text-center">
            <em>
              <h4 className="display-4 text-center">User Manual</h4>
            </em>
            <UserManual /> <br />
            <div className="text-right">
              <Button
                color="outline-secondary sm"
                onClick={this.toggle}
                style={{ marginBottom: "1rem" }}
              >
                close
              </Button>
            </div>
          </Jumbotron>
        </Collapse>
      </React.Fragment>
    );
  }
}

export default WelcomeJumb;
