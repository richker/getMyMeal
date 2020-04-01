import React, { Component } from "react";
import {
  Jumbotron,
  Button,
  InputGroup,
  Input,
  InputGroupAddon,
  Row,
  Col
} from "reactstrap";
import {
  sendAllergies,
  sendCaloric,
  sendBoth
} from "../services/recipeService";
import Recipes from "./recipes";
import ResultModal from "./resultModal";

class AllergiesJumb extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.displayModal = this.displayModal.bind(this);
    this.showResult = this.showResult.bind(this);
    this.state = {
      modal: false,
      errFlag: 0,
      modalBody: "",
      modalHead: "",
      vegetarianFlag: false,
      veganFlag: false,
      glutenFlag: false,
      dairyFlag: false,
      ketagonicFlag: false,
      proteinMin: 0,
      proteinMax: 0,
      fatMin: 0,
      fatMax: 0,
      carbsMin: 0,
      carbsMax: 0,
      recipes: [],
      cuisines: [],
      fullRecipes: []
    };
  }

  updateStates(res) {
    const { recipes, cuisines: data, fullRecipes } = res;
    const cuisines = [{ _id: "", name: "All Cuisines" }, ...data];
    this.setState({ recipes, cuisines, fullRecipes });
  }

  async handleSendAllergies() {
    let allergiesTosend = {};
    const recipes = [];
    const cuisines = [];
    const fullRecipes = [];
    this.setState({ recipes, cuisines, fullRecipes });
    if (this.state.glutenFlag) {
      allergiesTosend.gluten_free = 1;
    }
    if (this.state.vegetarianFlag) {
      allergiesTosend.vegetarian = 1;
    }
    if (this.state.veganFlag) {
      allergiesTosend.vegan = 1;
    }
    if (this.state.dairyFlag) {
      allergiesTosend.Dairy_free = 1;
    }
    if (this.state.ketagonicFlag) {
      allergiesTosend.ketagonic = 1;
    }
    if (Object.keys(allergiesTosend).length > 0) {
      allergiesTosend.type = "filter_allergies";
      const res = await sendAllergies(allergiesTosend);
      if (res !== "Error") {
        if (res.recipes.length > 0) {
          this.updateStates(res);
        } else {
          this.setState({ errFlag: 1 });
          this.setState({ modalBody: "please try something else." });
          this.setState({ modalHead: "No result" });
          this.toggle();
        }
      } else {
        this.setState({ errFlag: 1 });
        this.setState({ modalBody: "Error, try again." });
        this.setState({ modalHead: "Error" });
        this.toggle();
      }
    } else {
      this.setState({ errFlag: 1 });
      this.setState({ modalBody: "You need select your allergies before." });
      this.setState({ modalHead: "Error" });
      this.toggle();
    }
  }

  async handleSendCaloric() {
    let caloricTosend = {};
    const recipes = [];
    const cuisines = [];
    const fullRecipes = [];
    this.setState({ recipes, cuisines, fullRecipes });
    if (
      this.state.proteinMin === 0 &&
      this.state.proteinMax === 0 &&
      this.state.fatMin === 0 &&
      this.state.fatMax === 0 &&
      this.state.carbsMin === 0 &&
      this.state.carbsMax === 0
    ) {
      this.setState({ errFlag: 1 });
      this.setState({
        modalBody: "You need to insert at least one value to get recipes"
      });
      this.setState({ modalHead: "Error" });
      this.toggle();
    } else {
      caloricTosend.protein_low = this.state.proteinMin;
      caloricTosend.protein_hight = this.state.proteinMax;
      caloricTosend.fat_low = this.state.fatMin;
      caloricTosend.fat_hight = this.state.fatMax;
      caloricTosend.carbs_low = this.state.carbsMin;
      caloricTosend.carbs_hight = this.state.carbsMax;
      caloricTosend.type = "by_health_percent";
      const res = await sendCaloric(caloricTosend);
      if (res !== "Error") {
        this.updateStates(res);
      } else {
        this.setState({ errFlag: 1 });
        this.setState({ modalBody: "Error, try again." });
        this.setState({ modalHead: "Error" });
        this.toggle();
      }
    }
  }

  async handleSendBoth() {
    let toSend = {};
    const recipes = [];
    const cuisines = [];
    const fullRecipes = [];
    let flag = 1;
    this.setState({ recipes, cuisines, fullRecipes });
    if (this.state.glutenFlag) {
      toSend.gluten_free = 1;
      flag = 0;
    }
    if (this.state.vegetarianFlag) {
      toSend.vegetarian = 1;
      flag = 0;
    }
    if (this.state.veganFlag) {
      toSend.vegan = 1;
      flag = 0;
    }
    if (this.state.dairyFlag) {
      toSend.Dairy_free = 1;
      flag = 0;
    }
    if (this.state.ketagonicFlag) {
      toSend.ketagonic = 1;
      flag = 0;
    }
    if (
      flag === 1 &&
      this.state.proteinMin === 0 &&
      this.state.proteinMax === 0 &&
      this.state.fatMin === 0 &&
      this.state.fatMax === 0 &&
      this.state.carbsMin === 0 &&
      this.state.carbsMax === 0
    ) {
      this.setState({ errFlag: 1 });
      this.setState({
        modalBody: "You need to insert something, try again."
      });
      this.setState({ modalHead: "Error" });
      this.toggle();
    } else {
      toSend.protein_low = this.state.proteinMin;
      toSend.protein_hight = this.state.proteinMax;
      toSend.fat_low = this.state.fatMin;
      toSend.fat_hight = this.state.fatMax;
      toSend.carbs_low = this.state.carbsMin;
      toSend.carbs_hight = this.state.carbsMax;
      if (flag === 1) {
        toSend.type = "by_health_percent";
      } else {
        toSend.type = "by_health_percent_allergies";
      }
      const res = await sendBoth(toSend);
      if (res !== "Error") {
        this.updateStates(res);
      } else {
        this.setState({ errFlag: 1 });
        this.setState({ modalBody: "Error, try again." });
        this.setState({ modalHead: "Error" });
        this.toggle();
      }
    }
  }

  renderBothButton() {
    return (
      <Row className="mt-2">
        <Col className="text-center">
          <br />
          <Button onClick={() => this.handleSendBoth()}>
            Find by Allergies & caloric BreakDown
          </Button>
        </Col>
      </Row>
    );
  }

  renderAllergiesButton() {
    return (
      <Row className="mt-2">
        <Col className="text-center">
          <Button onClick={() => this.handleSendAllergies()}>
            Find by Allergies
          </Button>
        </Col>
      </Row>
    );
  }

  renderCaloricButton() {
    return (
      <Row className="mt-2">
        <Col className="text-center">
          <Button onClick={() => this.handleSendCaloric()}>
            Find by Caloric BreakDown
          </Button>
        </Col>
      </Row>
    );
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  updateProteinMin(evt) {
    this.setState({
      proteinMin: evt.target.value
    });
  }

  updateProteinMax(evt) {
    this.setState({
      proteinMax: evt.target.value
    });
  }

  updateFatMin(evt) {
    this.setState({
      fatMin: evt.target.value
    });
  }

  updateFatMax(evt) {
    this.setState({
      fatMax: evt.target.value
    });
  }

  updateCarbsMin(evt) {
    this.setState({
      carbsMin: evt.target.value
    });
  }

  updateCarbsMax(evt) {
    this.setState({
      carbsMax: evt.target.value
    });
  }

  updateVegetarian() {
    this.setState({
      vegetarianFlag: !this.state.vegetarianFlag
    });
  }

  updateVegan() {
    this.setState({
      veganFlag: !this.state.veganFlag
    });
  }

  updateGluten() {
    this.setState({
      glutenFlag: !this.state.glutenFlag
    });
  }

  updateDairy() {
    this.setState({
      dairyFlag: !this.state.dairyFlag
    });
  }

  updateKetagonic() {
    this.setState({
      ketagonicFlag: !this.state.ketagonicFlag
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
              If you are allergic or under any diet , check the boxes that are
              suitable for you.
              <br /> In addition we have created for you a method of matching
              the dish to the percentage of fat, carbohydrates and proteins you
              desire
            </h5>
          </Row>
          <br />
          <Row>
            <Col>
              <p className="lead">
                <b>Allergies</b>
              </p>
              <InputGroup>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            checked={this.state.vegetarianFlag}
                            className="form-check-input"
                            onChange={() => this.updateVegetarian()}
                          />
                          Vegetarian
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            checked={this.state.veganFlag}
                            className="form-check-input"
                            onChange={() => this.updateVegan()}
                          />
                          Vegan
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            checked={this.state.glutenFlag}
                            className="form-check-input"
                            onChange={() => this.updateGluten()}
                          />
                          Gluten free
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            checked={this.state.dairyFlag}
                            className="form-check-input"
                            onChange={() => this.updateDairy()}
                          />
                          Dairy free
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            checked={this.state.ketagonicFlag}
                            className="form-check-input"
                            onChange={() => this.updateKetagonic()}
                          />
                          Ketagonic
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </InputGroup>
              <div className="text-center">{this.renderAllergiesButton()}</div>
            </Col>
            <Col className="col-7">
              <p className="lead">
                <b>Caloric BreakDown</b>
              </p>
              <hr />
              <table className="table">
                <tbody>
                  <tr>
                    <th>Protein %</th>
                    <td>
                      <InputGroup size="sm">
                        <InputGroupAddon addonType="prepend">
                          Min
                        </InputGroupAddon>
                        <Input
                          id="productUnit"
                          value={this.state.proteinMin}
                          onChange={e => this.updateProteinMin(e)}
                        />
                        <InputGroupAddon addonType="prepend">
                          Max
                        </InputGroupAddon>
                        <Input
                          id="productAmount"
                          value={this.state.proteinMax}
                          onChange={e => this.updateProteinMax(e)}
                        />
                      </InputGroup>
                    </td>
                  </tr>
                  <tr>
                    <th>Fat %</th>
                    <td>
                      <InputGroup size="sm">
                        <InputGroupAddon addonType="prepend">
                          Min
                        </InputGroupAddon>
                        <Input
                          id="productUnit"
                          value={this.state.fatMin}
                          onChange={e => this.updateFatMin(e)}
                        />
                        <InputGroupAddon addonType="prepend">
                          Max
                        </InputGroupAddon>
                        <Input
                          id="productAmount"
                          value={this.state.fatMax}
                          onChange={e => this.updateFatMax(e)}
                        />
                      </InputGroup>
                    </td>
                  </tr>
                  <tr>
                    <th>Carbs %</th>
                    <td>
                      <InputGroup size="sm">
                        <InputGroupAddon addonType="prepend">
                          Min
                        </InputGroupAddon>
                        <Input
                          id="productUnit"
                          value={this.state.carbsMin}
                          onChange={e => this.updateCarbsMin(e)}
                        />
                        <InputGroupAddon addonType="prepend">
                          Max
                        </InputGroupAddon>
                        <Input
                          id="productAmount"
                          value={this.state.carbsMax}
                          onChange={e => this.updateCarbsMax(e)}
                        />
                      </InputGroup>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                {this.renderCaloricButton()}
                {this.renderBothButton()}
              </div>
            </Col>
          </Row>
        </Jumbotron>
        {this.showResult()}
        {this.displayModal()}
      </div>
    );
  }
}

export default AllergiesJumb;
