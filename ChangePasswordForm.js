import React, { Component, PropTypes } from 'react';
import validate from 'validate.js';
import { reduxForm } from 'redux-form';
import { ButtonInput } from 'react-bootstrap';
import { RFBSInput as Input } from '../core/forms/RFBSInput';

const form = 'changePasswordForm';
const constraints = {};

@reduxForm({
  form,
  fields: [],
  validate: data => validate(data, constraints) || {}
})
export default class ResetPasswordForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    token: PropTypes.string.isRequired
  }  

  render() {
    const { fields: {}, invalid, handleSubmit } = this.props;

    return (
      <form>
        <ButtonInput type="submit" bsStyle="primary" onClick={ handleSubmit } disabled={ invalid } />
      </form>
    );
  }
}
