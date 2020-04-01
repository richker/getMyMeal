import React, { Component } from "react";
import FridgeJumb from "./fridgeJumb";
import AllergiesJumb from "./allergiesJumb";
import NutritionsJumb from "./nutritionsJumb";
import SideBar from "./sidebar";
import WelcomeJumb from "./welcomeJumb";
import PreferJumb from "./preferencesJumb";
import SuperMarket from "./superMarket";
import { getSupers } from "../services/recipeService";
import ResultModal from "./resultModal";

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSuperMarket = this.handleSuperMarket.bind(this);
    this.toggle = this.toggle.bind(this);
    this.displayModal = this.displayModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.state = {
      searchIndex: 0,
      supers: [],
      errFlag: 0,
      modal: false,
      modalHead: "",
      modalBody: ""
    };
  }

  handleIndexChange = index => {
    this.setState({ searchIndex: index });
  };

  showModal(head, body) {
    this.setState({ modalHead: head });
    this.setState({
      modalBody: body
    });
    this.setState({ errFlag: 1 });
    this.toggle();
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  displayModal() {
    if (this.state.errFlag === 1) {
      return (
        <ResultModal
          modal={this.state.modal}
          toggle={this.toggle}
          head={this.state.modalHead}
          body={this.state.modalBody}
        />
      );
    }
  }

  async handleSuperMarket() {
    const supers = [];
    this.setState({ supers });
    const res = await getSupers();
    if (res !== "Error") {
      const { supers } = await res;
      if (supers.length === 0) {
        this.showModal("No result", "Sorry we not found supermarkets.");
      }
    this.setState({ supers });
    } else {
      this.showModal("Error", "please try again.");
    }
  }

  showSearch = () => {
    switch (this.state.searchIndex) {
      case 0:
        return <WelcomeJumb />;
      case 1:
        return <FridgeJumb />;
      case 2:
        return <NutritionsJumb />;
      case 3:
        return <AllergiesJumb />;
      case 4: {
        if (this.state.supers.length > 0) {
          return <SuperMarket supers={this.state.supers} />;
        } else {
          return <WelcomeJumb />;
        }
      }
      case 5:
        return <PreferJumb />;
      default:
        break;
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <SideBar
            index={this.handleIndexChange}
            superFunc={this.handleSuperMarket}
          />
          <div className="col-10">
            <br />
            {this.showSearch()}
            {this.displayModal()}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
