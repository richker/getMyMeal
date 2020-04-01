import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class RecipeModal extends Component {
  constructor(props) {
    super(props);
    this.displayIngs = this.displayIngs.bind(this);
    this.displaySubs = this.displaySubs.bind(this);
    this.state = {
      ingsArr: []
    };
  }
  componentDidMount() {
    const ingsArr = this.props.ings;
    this.setState({ ingsArr });
  }

  renderLine = (label, data) => {
    return (
      <div className="row">
        <div className="col-4">
          <li>{label}</li>
        </div>
        <div className="col-3">{data}</div>
      </div>
    );
  };

  renderAllergies = (label, data) => {
    if (data === 1) {
      return (
        <div className="row">
          <div className="col">
            <li>{label}</li>
          </div>
        </div>
      );
    }
  };

  displayIngs(ings) {
    return ings.map(x => (
      <div className="row my-1">
        <div className="col">
          <li>{x}</li>
        </div>
      </div>
    ));
  }

  displaySubs(data, flag) {
    if (flag === 1) {
      return (
        <div className="row my-1">
          <div className="col">
            <strong>Substitutes products:</strong>
            <em>{data}</em>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} size="lg">
        <ModalHeader toggle={this.props.toggle}>
          {this.props.recipe.title}
        </ModalHeader>
        <ModalBody>
          {this.displaySubs(this.props.recipe.ADDED_DATA, this.props.subs)}
          <div className="row">
            {/* COL LEFT */}
            <div className="col-6">
              <strong>Ingredients:</strong>
              {this.displayIngs(this.props.ings)}
            </div>
            <div className="col-6">
              <br />
              {this.renderLine("Prep Time:", this.props.recipe.prep_time)}
              {this.renderLine("Servings:", this.props.recipe.servings)}
              {this.renderLine("Cuisine:", this.props.recipe.cuisine)}
              {this.renderAllergies("Vegan", this.props.recipe.vegan)}
              {this.renderAllergies("Vegetarian", this.props.recipe.vegetarian)}
              {this.renderAllergies(
                "Very healithy",
                this.props.recipe.very_healithy
              )}
              {this.renderAllergies("Gluten free", this.props.recipe.gluten)}
              {this.renderAllergies("Kategonic", this.props.recipe.kategonic)}
              {this.renderAllergies("Dairy free", this.props.recipe.dairy)}
            </div>
            {/* END COL LEFT */}
          </div>
          <strong>Instructions</strong>
          <p className="lead">{this.props.recipe.instructions}</p>
          <img src={this.props.recipe.img} alt="new" />
        </ModalBody>
        <ModalFooter>
          <a href={this.props.recipe.source_url}>
            <Button className="btn btn-success">Go to recipe website</Button>
          </a>
          <Button
            className="btn btn-outline-secondary btn-sm"
            onClick={this.props.toggle}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default RecipeModal;
