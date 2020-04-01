import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ResultModal extends Component {
  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} size="sm">
        <ModalHeader toggle={this.props.toggle}>{this.props.head}</ModalHeader>
        <ModalBody>
          <p className="lead">
            <em>{this.props.body}</em>
          </p>
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

export default ResultModal;
