import React, { Component } from "react";
import { Jumbotron, Button, InputGroup, Row, Col } from "reactstrap";
import Recipes from "./recipes";
import ResultModal from "./resultModal";
import { sendNut } from "../services/recipeService";

class NutritionsJumb extends Component {
  constructor(props) {
    super(props);
    this.renderSendButton = this.renderSendButton.bind(this);
    this.renderCheckBox = this.renderCheckBox.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.showModal = this.showModal.bind(this);
    this.toggle = this.toggle.bind(this);
    this.showResult = this.showResult.bind(this);
    this.displayModal = this.displayModal.bind(this);
    this.state = {
      modal: false,
      modalHead: "",
      modalBody: "",
      errFlag: 0,
      calcium: false,
      copper: false,
      fiber: false,
      folate: false,
      iron: false,
      magnesium: false,
      manganese: false,
      phosphorus: false,
      potassium: false,
      protein: false,
      selenium: false,
      vitaminA: false,
      vitaminB1: false,
      vitaminB12: false,
      vitaminB2: false,
      vitaminB3: false,
      vitaminB5: false,
      vitaminB6: false,
      vitaminC: false,
      vitaminD: false,
      vitaminE: false,
      vitaminK: false,
      zinc: false,
      recipes: [],
      cuisines: [],
      fullRecipes: []
    };
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  showModal(head, body) {
    this.setState({ modalHead: head });
    this.setState({
      modalBody: body
    });
    this.setState({ errFlag: 1 });
    this.toggle();
  }

  async handleSend() {
    let toSend = {};
    const recipes = [];
    const cuisines = [];
    const fullRecipes = [];
    this.setState({ recipes, cuisines, fullRecipes });
    if (this.state.calcium) {
      toSend.Calcium = 1;
    }
    if (this.state.copper) {
      toSend.Copper = 1;
    }
    if (this.state.fiber) {
      toSend.Fiber = 1;
    }
    if (this.state.folate) {
      toSend.Folate = 1;
    }
    if (this.state.iron) {
      toSend.Iron = 1;
    }
    if (this.state.magnesium) {
      toSend.Magnesium = 1;
    }
    if (this.state.manganese) {
      toSend.Manganese = 1;
    }
    if (this.state.phosphorus) {
      toSend.Phosphorus = 1;
    }
    if (this.state.potassium) {
      toSend.Potassium = 1;
    }
    if (this.state.protein) {
      toSend.Protein = 1;
    }
    if (this.state.selenium) {
      toSend.Selenium = 1;
    }
    if (this.state.vitaminA) {
      toSend.Vitamin_A = 1;
    }
    if (this.state.vitaminB1) {
      toSend.Vitamin_B1 = 1;
    }
    if (this.state.vitaminB12) {
      toSend.Vitamin_B12 = 1;
    }
    if (this.state.vitaminB2) {
      toSend.Vitamin_B2 = 1;
    }
    if (this.state.vitaminB3) {
      toSend.Vitamin_B3 = 1;
    }
    if (this.state.vitaminB5) {
      toSend.Vitamin_B5 = 1;
    }
    if (this.state.vitaminB6) {
      toSend.Vitamin_B6 = 1;
    }
    if (this.state.vitaminC) {
      toSend.Vitamin_C = 1;
    }
    if (this.state.vitaminD) {
      toSend.Vitamin_D = 1;
    }
    if (this.state.vitaminE) {
      toSend.Vitamin_E = 1;
    }
    if (this.state.vitaminK) {
      toSend.Vitamin_K = 1;
    }
    if (this.state.zinc) {
      toSend.Zinc = 1;
    }
    if (Object.keys(toSend).length > 0) {
      toSend.type = "find_recipes_with_nutritions";
      const res = await sendNut(toSend);
      if (res !== "Error") {
        const { recipes, cuisines: data, fullRecipes } = await res;
        if (recipes.length === 0) {
          this.showModal("No result", "please try something else.");
        } else {
          const cuisines = [{ _id: "", name: "All Cuisines" }, ...data];
          this.setState({ recipes, cuisines, fullRecipes });
        }
      } else {
        this.showModal(
          "Error",
          "Something in your details wrong. please try again."
        );
      }
    } else {
      this.setState({ errFlag: 1 });
      this.setState({ modalBody: "You need select nutritions before." });
      this.setState({ modalHead: "Error" });
      this.toggle();
    }
  }

  renderSendButton() {
    return (
      <Row className="mt-2">
        <Col className="text-center">
          <Button onClick={this.handleSend}>Find Recipes</Button>
        </Col>
      </Row>
    );
  }

  renderCheckBox(label, handleChange, flag) {
    return (
      <tr>
        <td>
          <label className="form-check-label">
            <input
              type="checkbox"
              checked={flag}
              className="form-check-input"
              onChange={handleChange}
            />
            {label}
          </label>
        </td>
      </tr>
    );
  }

  updateCalcium() {
    this.setState({
      calcium: !this.state.calcium
    });
  }

  updateCopper() {
    this.setState({
      copper: !this.state.copper
    });
  }

  updateFiber() {
    this.setState({
      fiber: !this.state.fiber
    });
  }

  updateFolate() {
    this.setState({
      folate: !this.state.folate
    });
  }

  updateIron() {
    this.setState({
      iron: !this.state.iron
    });
  }

  updateManganese() {
    this.setState({
      manganese: !this.state.manganese
    });
  }

  updateMagnesium() {
    this.setState({
      magnesium: !this.state.magnesium
    });
  }

  updatePhosphorus() {
    this.setState({
      phosphorus: !this.state.phosphorus
    });
  }

  updatePotassium() {
    this.setState({
      potassium: !this.state.potassium
    });
  }

  updateProtein() {
    this.setState({
      protein: !this.state.protein
    });
  }

  updateSelenium() {
    this.setState({
      selenium: !this.state.selenium
    });
  }

  updateVitaminA() {
    this.setState({
      vitaminA: !this.state.vitaminA
    });
  }

  updateVitaminB1() {
    this.setState({
      vitaminB1: !this.state.vitaminB1
    });
  }

  updateVitaminB12() {
    this.setState({
      vitaminB12: !this.state.vitaminB12
    });
  }

  updateVitaminB2() {
    this.setState({
      vitaminB2: !this.state.vitaminB2
    });
  }

  updateVitaminB3() {
    this.setState({
      vitaminB3: !this.state.vitaminB3
    });
  }

  updateVitaminB5() {
    this.setState({
      vitaminB5: !this.state.vitaminB5
    });
  }

  updateVitaminB6() {
    this.setState({
      vitaminB6: !this.state.vitaminB6
    });
  }

  updateVitaminC() {
    this.setState({
      vitaminC: !this.state.vitaminC
    });
  }

  updateVitaminD() {
    this.setState({
      vitaminD: !this.state.vitaminD
    });
  }

  updateVitaminE() {
    this.setState({
      vitaminE: !this.state.vitaminE
    });
  }

  updateVitaminK() {
    this.setState({
      vitaminK: !this.state.vitaminK
    });
  }

  updateZinc() {
    this.setState({
      zinc: !this.state.zinc
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
              Check the selection box for each nutrient or number of nutrients
              you wish to include in the recipe. Then press the search button
            </h5>
          </Row>
          <br />
          <Row>
            <Col>
              <InputGroup>
                <table className="table">
                  <tbody>
                    {this.renderCheckBox(
                      "Calcium",
                      () => this.updateCalcium(),
                      this.state.calcium
                    )}
                    {this.renderCheckBox(
                      "Copper",
                      () => this.updateCopper(),
                      this.state.copper
                    )}
                    {this.renderCheckBox(
                      "Fiber",
                      () => this.updateFiber(),
                      this.state.fiber
                    )}
                    {this.renderCheckBox(
                      "Folate",
                      () => this.updateFolate(),
                      this.state.folate
                    )}
                    {this.renderCheckBox(
                      "Iron",
                      () => this.updateIron(),
                      this.state.iron
                    )}
                  </tbody>
                </table>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <table className="table">
                  <tbody>
                    {this.renderCheckBox(
                      "Manganese",
                      () => this.updateManganese(),
                      this.state.manganese
                    )}
                    {this.renderCheckBox(
                      "Magnesium",
                      () => this.updateMagnesium(),
                      this.state.magnesium
                    )}
                    {this.renderCheckBox(
                      "Phosphorus",
                      () => this.updatePhosphorus(),
                      this.state.phosphorus
                    )}
                    {this.renderCheckBox(
                      "Potassium",
                      () => this.updatePotassium(),
                      this.state.potassium
                    )}
                    {this.renderCheckBox(
                      "Protein",
                      () => this.updateProtein(),
                      this.state.protein
                    )}
                  </tbody>
                </table>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <table className="table">
                  <tbody>
                    {this.renderCheckBox(
                      "Selenium",
                      () => this.updateSelenium(),
                      this.state.selenium
                    )}
                    {this.renderCheckBox(
                      "Vitamin A",
                      () => this.updateVitaminA(),
                      this.state.vitaminA
                    )}
                    {this.renderCheckBox(
                      "Vitamin B1",
                      () => this.updateVitaminB1(),
                      this.state.vitaminB1
                    )}
                    {this.renderCheckBox(
                      "Vitamin B12",
                      () => this.updateVitaminB12(),
                      this.state.vitaminB12
                    )}
                    {this.renderCheckBox(
                      "Vitamin B2",
                      () => this.updateVitaminB2(),
                      this.state.vitaminB2
                    )}
                  </tbody>
                </table>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <table className="table">
                  <tbody>
                    {this.renderCheckBox(
                      "Vitamin B3",
                      () => this.updateVitaminB3(),
                      this.state.vitaminB3
                    )}
                    {this.renderCheckBox(
                      "Vitamin B5",
                      () => this.updateVitaminB5(),
                      this.state.vitaminB5
                    )}
                    {this.renderCheckBox(
                      "Vitamin B6",
                      () => this.updateVitaminB6(),
                      this.state.vitaminB6
                    )}
                    {this.renderCheckBox(
                      "Vitamin C",
                      () => this.updateVitaminC(),
                      this.state.vitaminC
                    )}
                    {this.renderCheckBox(
                      "Vitamin D",
                      () => this.updateVitaminD(),
                      this.state.vitaminD
                    )}
                  </tbody>
                </table>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <table className="table">
                  <tbody>
                    {this.renderCheckBox(
                      "Vitamin E",
                      () => this.updateVitaminE(),
                      this.state.vitaminE
                    )}
                    {this.renderCheckBox(
                      "Vitamin K",
                      () => this.updateVitaminK(),
                      this.state.vitaminK
                    )}
                    {this.renderCheckBox(
                      "Zinc",
                      () => this.updateZinc(),
                      this.state.zinc
                    )}
                  </tbody>
                </table>
              </InputGroup>
            </Col>
          </Row>
          {this.renderSendButton()}
        </Jumbotron>
        {this.showResult()}
        {this.displayModal()}
      </div>
    );
  }
}

export default NutritionsJumb;
