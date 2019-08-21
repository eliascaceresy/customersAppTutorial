import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import AppFrame from "../components/AppFrame";
import CustomerEdit from "../components/CustomerEdit";
import { createCustomer } from "../actions/createCustomer";

class NewCustomerContainer extends Component {
  handleSubmit = values => {
    return this.props.createCustomer(values);
  };

  handleOnSubmitSuccess = () => {
    this.props.history.goBack();
  };

  handleOnBack = () => {
    this.props.history.goBack();
  };

  renderBody = () => {
    return (
      <CustomerEdit
        onSubmit={this.handleSubmit}
        onSubmitSuccess={this.handleOnSubmitSuccess}
        onBack={this.handleOnBack}
      />
    );
  };

  render() {
    return (
      <div>
        <AppFrame header="Nuevo Cliente" body={this.renderBody()} />
      </div>
    );
  }
}

NewCustomerContainer.propTypes = {
  createCustomer: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    null,
    { createCustomer }
  )(NewCustomerContainer)
);
