import React, { Component } from "react";
import {
  Jumbotron,
  Button,
  InputGroup,
  Input,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { sendPrefers } from "../services/recipeService";
import Recipes from "./recipes";
import ResultModal from "./resultModal";

class PreferJumb extends Component {
  constructor(props) {
    super(props);
    this.handleSendPref = this.handleSendPref.bind(this);
    this.updatePrefer = this.updatePrefer.bind(this);
    this.updateNotPrefer = this.updateNotPrefer.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.displayModal = this.displayModal.bind(this);
    this.showResult = this.showResult.bind(this);
    this.handleSendPref = this.handleSendPref.bind(this);
    this.showModal = this.showModal.bind(this);
    this.state = {
      notPrefer: "Baking",
      prefer: "Frying",
      dropdownOpen: false,
      dropdownOpen2: false,
      modal: false,
      errFlag: 0,
      mustValue: "",
      cantValue: "",
      preferValue: "",
      modalHead: "",
      modalBody: "",
      recipes: [],
      cuisines: [],
      fullRecipes: []
    };
  }

  showModal(head, body) {
    this.setState({ modalHead: head });
    this.setState({
      modalBody: body
    });
    this.setState({ errFlag: 1 });
    this.toggle3();
  }

  async handleSendPref() {
    const recipes = [];
    const cuisines = [];
    const fullRecipes = [];
    this.setState({ recipes, cuisines, fullRecipes });
    let toSend = {};
    toSend.need = this.state.mustValue;
    toSend.cant_be = this.state.cantValue;
    toSend.prefer_not_to = this.state.preferValue;
    toSend.better_op = this.state.prefer;
    toSend.than = this.state.notPrefer;
    toSend.type = "handle_desires";
    const res = await sendPrefers(toSend);
    if (res !== "Error") {
      const { recipes, cuisines: data, fullRecipes } = await res;
      if (recipes.length === 0) {
        this.showModal("No result", "please try something else.");
      } else {
        const cuisines = [{ _id: "", name: "All Cuisines" }, ...data];
        this.setState({ recipes, cuisines, fullRecipes });
      }
    } else {
      this.showModal("Error", "please try something else.");
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggle3() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggle2() {
    this.setState({
      dropdownOpen2: !this.state.dropdownOpen2
    });
  }

  updateMust(evt) {
    this.setState({
      mustValue: evt.target.value
    });
  }

  updateCant(evt) {
    this.setState({
      cantValue: evt.target.value
    });
  }

  updatePreferText(evt) {
    this.setState({
      preferValue: evt.target.value
    });
  }

  updatePrefer(evt) {
    this.setState({
      prefer: evt.target.value
    });
  }

  updateNotPrefer(evt) {
    this.setState({
      notPrefer: evt.target.value
    });
  }

  displayModal() {
    if (this.state.errFlag === 1) {
      return (
        <ResultModal
          modal={this.state.modal}
          toggle={this.toggle3}
          head={this.state.modalHead}
          body={this.state.modalBody}
        />
      );
    }
  }

  showResult() {
    if (this.state.fullRecipes.length > 0) {
      return (
        <Recipes
          recipes={this.state.recipes}
          cuisines={this.state.cuisines}
          fullRecipes={this.state.fullRecipes}
          subs={0}
        />
      );
    }
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <Row>
            <h5 className="display-5">
              Choose what you prefer to include, not include and forbid in the
              recipe. <br />
              In addition to the right side of the screen you can choose your
              preferred method of preparation.
            </h5>
          </Row>
          <hr />
          <Row>
            <Col className="col-7">
              <table className="table">
                <tbody>
                  <tr>
                    <th>Must be:</th>
                    <td>
                      <InputGroup size="sm">
                        <Input
                          id="must"
                          value={this.state.mustValue}
                          onChange={e => this.updateMust(e)}
                          placeholder="e.g. salmon "
                        />
                      </InputGroup>
                    </td>
                  </tr>
                  <tr>
                    <th>Can't be:</th>
                    <td>
                      <InputGroup size="sm">
                        <Input
                          id="cant"
                          value={this.state.cantValue}
                          onChange={e => this.updateCant(e)}
                          placeholder="e.g. spicey "
                        />
                      </InputGroup>
                    </td>
                  </tr>
                  <tr>
                    <th>Prefer not to:</th>
                    <td>
                      <InputGroup size="sm">
                        <Input
                          id="preferNotBe"
                          value={this.state.preferValue}
                          onChange={e => this.updatePreferText(e)}
                          placeholder="e.g. pork "
                        />
                      </InputGroup>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
            <Col>
              <h6 className="display-6">
                The preferred method of preparation:
              </h6>
              <table className="table my-3">
                <tbody>
                  <tr>
                    <th>Preferred method</th>
                    <td>
                      <Dropdown
                        isOpen={this.state.dropdownOpen}
                        toggle={this.toggle}
                      >
                        <DropdownToggle caret>
                          {this.state.prefer}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem
                            value="Frying"
                            onClick={this.updatePrefer}
                          >
                            Frying
                          </DropdownItem>
                          <DropdownItem
                            onClick={this.updatePrefer}
                            value="Cooking"
                          >
                            Cooking
                          </DropdownItem>
                          <DropdownItem
                            onClick={this.updatePrefer}
                            value="Baking"
                          >
                            Baking
                          </DropdownItem>
                          <DropdownItem
                            onClick={this.updatePrefer}
                            value="Deep oil"
                          >
                            Deep oil
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </td>
                  </tr>
                  <tr>
                    <th>Not preferred method</th>
                    <td>
                      <Dropdown
                        isOpen={this.state.dropdownOpen2}
                        toggle={this.toggle2}
                      >
                        <DropdownToggle caret>
                          {this.state.notPrefer}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem
                            onClick={this.updateNotPrefer}
                            value="Frying"
                          >
                            Frying
                          </DropdownItem>
                          <DropdownItem
                            onClick={this.updateNotPrefer}
                            value="Cooking"
                          >
                            Cooking
                          </DropdownItem>
                          <DropdownItem
                            onClick={this.updateNotPrefer}
                            value="Baking"
                          >
                            Baking
                          </DropdownItem>
                          <DropdownItem
                            onClick={this.updateNotPrefer}
                            value="Deep oil"
                          >
                            Deep oil
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col className="text-center">
              <Button onClick={this.handleSendPref}>Find Recipes</Button>
            </Col>
          </Row>
        </Jumbotron>
        {this.showResult()}
        {this.displayModal()}
      </div>
    );
  }
}

export default PreferJumb;
