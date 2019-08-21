import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, withRouter } from "react-router-dom";
import AppFrame from "../components/AppFrame";
import { getCustomerByDni } from "../selectors/customers";
import CustomerData from "../components/CustomerData";
import CustomerEdit from "../components/CustomerEdit";
import { fetchCustomers } from "../actions/fetchCustomers";
import { updateCustomer } from "../actions/updateCustomer";
import { deleteCustomer } from "../actions/deleteCustomer";

class CustomerContainer extends Component {
  componentDidMount() {
    if (!this.props.customer) {
      this.props.fetchCustomers();
    }
  }

  handleSubmit = values => {
    const { id } = values;
    return this.props.updateCustomer(id, values);
  };

  handleOnBack = () => {
    this.props.history.goBack();
  };

  handleOnSubmitSuccess = () => {
    this.props.history.goBack();
  };

  handleOnDelete = id => {
    console.log("deleteeeee");
    this.props.deleteCustomer(id).then(v => {
      this.props.history.goBack();
    });
  };

  renderCustomerControl = (isEdit, isDelete) => {
    if (this.props.customer) {
      const CustomerControl = isEdit ? CustomerEdit : CustomerData;
      return (
        <CustomerControl
          {...this.props.customer}
          onSubmit={this.handleSubmit}
          onSubmitSuccess={this.handleOnSubmitSuccess}
          onBack={this.handleOnBack}
          isDeleteAllow={!!isDelete}
          onDelete={this.handleOnDelete}
        />
      );
    }
  };

  renderBody = () => (
    <Route
      path="/customers/:dni/edit"
      children={({ match: isEdit }) => (
        <Route
          path="/customers/:dni/del"
          children={({ match: isDelete }) =>
            this.renderCustomerControl(isEdit, isDelete)
          }
        />
      )}
    />
  );

  render() {
    return (
      <div>
        <AppFrame
          header={`Cliente ${this.props.dni}`}
          body={this.renderBody()}
        />
      </div>
    );
  }
}

CustomerContainer.propTypes = {
  dni: PropTypes.string.isRequired,
  customer: PropTypes.object,
  fetchCustomers: PropTypes.func.isRequired,
  updateCustomer: PropTypes.func.isRequired,
  updateCustomer: PropTypes.func
};

const mapStateToProps = (state, props) => ({
  customer: getCustomerByDni(state, props)
});

export default withRouter(
  connect(
    mapStateToProps,
    { fetchCustomers, updateCustomer, deleteCustomer }
  )(CustomerContainer)
);
