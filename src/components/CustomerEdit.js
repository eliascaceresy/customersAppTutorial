import React, { Component } from "react";
import PropTypes from "prop-types";
import { reduxForm, Field } from "redux-form";
import { Prompt } from "react-router-dom";
import { setPropsAsInitial } from "../helpers/setPropsAsInitial";
import CustomersActions from "../components/CustomersActions";

const isNumber = value => isNaN(Number(value)) && "El campo debe ser un número";

const toNumber = value => value && Number(value);

const validate = values => {
  const error = {};

  if (!values.name) {
    error.name = "Debe agregar un Nombre";
  }
  if (!values.dni) {
    error.dni = "Debe agregar un DNI";
  }

  return error;
};

class CustomerEdit extends Component {
  componentDidMount() {
    if (this.txt) {
      this.txt.focus();
    }
  }

  renderField = ({ input, meta, type, label, name, withFocus }) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        {...input}
        type={type}
        ref={withFocus && (txt => (this.txt = txt))}
      />
      {meta.touched && meta.error && <span>{meta.error}</span>}
    </div>
  );
  render() {
    const {
      name,
      dni,
      age,
      handleSubmit,
      submitting,
      onBack,
      pristine,
      submitSucceded
    } = this.props;
    return (
      <div>
        <div className="customers-edit">
          <h2>Edición del Cliente</h2>
          <form onSubmit={handleSubmit}>
            <Field
              withFocus
              name="name"
              label="Nombre"
              component={this.renderField}
              type="text"
            />
            <Field
              name="dni"
              label="DNI"
              component={this.renderField}
              type="text"
            />
            <Field
              name="age"
              label="Edad"
              component={this.renderField}
              type="number"
              validate={isNumber}
              parse={toNumber}
            />
            <CustomersActions>
              <button type="submit" disabled={pristine || submitting}>
                Guardar
              </button>
              <button type="button" disabled={submitting} onClick={onBack}>
                Cancelar
              </button>
            </CustomersActions>
            <Prompt
              when={!pristine && !submitSucceded}
              message="Se perderán los cambios realizados si continúa"
            />
          </form>
        </div>
      </div>
    );
  }
}

CustomerEdit.propTypes = {
  name: PropTypes.string,
  dni: PropTypes.string,
  age: PropTypes.number,
  onBack: PropTypes.func.isRequired
};

const CustomerEditForm = reduxForm({ form: "CustomerEdit", validate })(
  CustomerEdit
);

export default setPropsAsInitial(CustomerEditForm);
