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
import { sendProduct, sendSubs } from "../services/recipeService";
import Recipes from "./recipes";
import ResultModal from "./resultModal";

class FridgeJumb extends Component {
  constructor(props) {
    super(props);
    this.pushProduct = this.pushProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.handleSendProducts = this.handleSendProducts.bind(this);
    this.handleSendSub = this.handleSendSub.bind(this);
    this.toggle = this.toggle.bind(this);
    this.showResult = this.showResult.bind(this);
    this.renderSend = this.renderSend.bind(this);
    this.showModal = this.showModal.bind(this);
    this.displayModal = this.displayModal.bind(this);
    this.state = {
      modal: false,
      modalHead: "",
      modalBody: "",
      errFlag: 0,
      productSub: "",
      productValue: "",
      productAmount: 0,
      productUnit: "",
      products: [],
      recipes: [],
      cuisines: [],
      fullRecipes: [],
      subs: 0
    };
  }

  showModal(head, body) {
    this.setState({ modalHead: head });
    this.setState({
      modalBody: body
    });
    this.setState({ errFlag: 1 });
    this.toggle();
  }

  renderSend() {
    if (this.state.products.length > 0) {
      return (
        <Col className="text-center">
          <Button onClick={this.handleSendProducts}>Find Recipes</Button>
        </Col>
      );
    }
  }

  async handleSendSub() {
    if (this.state.productSub) {
      const recipes = [];
      const cuisines = [];
      const fullRecipes = [];
      this.setState({ recipes, cuisines, fullRecipes });
      const res = await sendSubs(this.state.productSub);
      if (res !== "Error") {
        const { recipes, cuisines: data, fullRecipes } = await res;
        if (recipes.length === 0) {
          this.showModal("No result", "please try something else.");
        } else {
          this.setState({ subs: 1 });
          const cuisines = [{ _id: "", name: "All Cuisines" }, ...data];
          this.setState({ recipes, cuisines, fullRecipes });
        }
      } else {
        this.showModal(
          "Error",
          "Something in your product details wrong. please try again."
        );
      }
    } else {
      this.showModal("Error", "Insert product name.");
    }
  }

  async handleSendProducts() {
    const recipes = [];
    const cuisines = [];
    const fullRecipes = [];
    this.setState({ recipes, cuisines, fullRecipes });
    let productsToSend = [];
    this.state.products.forEach(x => {
      let current = { name: x.name };
      current.amount = x.amount;
      productsToSend.push(current);
    });
    const res = await sendProduct(productsToSend);
    if (res !== "Error") {
      const { recipes, cuisines: data, fullRecipes } = await res;
      if (recipes.length === 0) {
        this.showModal("No result", "please try something else.");
      } else {
        this.setState({ subs: 0 });
        const cuisines = [{ _id: "", name: "All Cuisines" }, ...data];
        this.setState({ recipes, cuisines, fullRecipes });
      }
    } else {
      this.showModal(
        "Error",
        "Something in your products details wrong. please try again."
      );
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  pushProduct = () => {
    if (this.state.productValue) {
      // if (Number.isNaN(this.state.productAmount)) {  CHECK IF VAL INSIDE PRODUCTS TABLE
      //   this.setState({ productAmount: 0 });
      //   this.showModal("Error", "Amount need to be a number");
      // }
      if (Number.isNaN(this.state.productAmount)) {
        this.setState({ productAmount: 0 });
        this.showModal("Error", "Amount need to be a number");
      } else {
        if (this.state.productAmount === 0) {
          this.showModal("Error", "Must fill amount");
        } else {
          let products = this.state.products;
          let newProduct = { name: this.state.productValue };
          newProduct.amount = this.state.productAmount;
          newProduct.unit = this.state.productUnit;
          products.push(newProduct);
          this.setState(products); //UPDATE 'products' object
          // initlaize all product varibles
          this.setState({ productValue: "" });
          this.setState({ productUnit: "" });
          this.setState({ productAmount: 0 });
        }
      }
    } else {
      this.showModal("Error", "Insert product name.");
    }
  };

  deleteProduct = product => {
    let products = this.state.products;
    let newProducts = products.filter(p => p.name !== product.name);
    this.setState({ products: newProducts });
  };

  updateProductSubs(evt) {
    this.setState({
      productSub: evt.target.value
    });
  }

  updateProductValue(evt) {
    this.setState({
      productValue: evt.target.value
    });
  }

  updateProductUnit(evt) {
    this.setState({
      productUnit: evt.target.value
    });
  }

  updateProductAmount(evt) {
    this.setState({
      productAmount: evt.target.value
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
          subs={this.state.subs}
        />
      );
    }
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <Row>
            <Col>
              <h5 className="display-5">
                Write down the products in your refrigerator or you want them to
                be included in the recipe and let us look for recipes for you!
              </h5>
              <br />
              <br />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup>
                <Input
                  id="productValue"
                  value={this.state.productValue}
                  onChange={e => this.updateProductValue(e)}
                  placeholder="Write your Ingredient Here..."
                />
                <Button className="ml-2" onClick={this.pushProduct}>
                  Insert
                </Button>
              </InputGroup>
              <InputGroup className="my-2" size="sm">
                <InputGroupAddon addonType="prepend">Unit</InputGroupAddon>
                <Input
                  id="productUnit"
                  value={this.state.productUnit}
                  onChange={e => this.updateProductUnit(e)}
                />
                <InputGroupAddon addonType="prepend">Amount</InputGroupAddon>
                <Input
                  id="productAmount"
                  value={this.state.productAmount}
                  onChange={e => this.updateProductAmount(e)}
                />
              </InputGroup>
              <hr />
              <br />
              <br />
              <h5 className="display-5">OR:</h5>
              <h6 className="display-6">
                you can search for substitutes ingredients
              </h6>
              <br />
              <h6 className="display-6">
                Insert ingredient and get recipes with substitutes products
              </h6>
              <InputGroup>
                <Input
                  id="productValue"
                  value={this.state.productSub}
                  onChange={e => this.updateProductSubs(e)}
                  placeholder="Write your Ingredient Here..."
                />
                <Button className="ml-2" onClick={this.handleSendSub}>
                  <i className="fa fa-refresh" aria-hidden /> Get
                </Button>
              </InputGroup>
            </Col>
            <Col>
              <h5 className="display-5">My Fridge</h5>
              <hr className="my-2" />
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.products.map(p => (
                    <tr key={p.name}>
                      <td>{p.name}</td>
                      <td>{p.amount}</td>
                      <td>{p.unit}</td>
                      <td>
                        <button
                          style={{ indent: "30%" }}
                          onClick={() => this.deleteProduct(p)}
                          className="btn btn-danger btn-sm"
                        >
                          <i className="fa fa-trash-o" aria-hidden="true" />{" "}
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {this.renderSend()}
            </Col>
          </Row>
          <Row className="mt-2" />
        </Jumbotron>
        {this.showResult()}
        {this.displayModal()}
      </div>
    );
  }
}

export default FridgeJumb;
