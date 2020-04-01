import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import wine from "../img/wine.jpeg";

class WineModal extends Component {
  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} size="md">
        <ModalHeader toggle={this.props.toggle}>{this.props.head}</ModalHeader>
        <ModalBody>
          <p className="lead">
            <em>{this.props.wineText}</em>
          </p>
          <div className="row">
            <div className="col">
              {this.props.wines.map(wine => (
                <li>{wine}</li>
              ))}
            </div>
            <div className="col">
              <img src={wine} alt="new" />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
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

export default WineModal;
