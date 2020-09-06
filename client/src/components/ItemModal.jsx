import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemAction";
import PropTypes from "prop-types";

class ItemModal extends Component {
  state = {
    modal: false,
    name: "",
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
    };

    // Add item via addItem action
    this.props.addItem(newItem);

    // close the modal
    this.toggle();
  };

  render() {
    const addNew = (
      <Button
        color="dark"
        style={{ marginBottom: "2rem" }}
        onClick={this.toggle}
      >
        Add New
      </Button>
    );

    const pleaseLogin = (
      <h4 className="mb-3 ml-4">Please Login to manage the Item</h4>
    );

    return (
      <div>
        {this.props.isAuthenticated ? addNew : pleaseLogin}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add New</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label htmlFor="item">Add Shopping List</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Name"
                  onChange={this.onChange}
                />

                <Button color="primary" style={{ marginTop: "2rem" }} block>
                  Save
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
