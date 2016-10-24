import React, { Component, PropTypes } from 'react';
import validate from 'validate.js';
import { reduxForm } from 'redux-form';
import { ButtonInput } from 'react-bootstrap';
import { RFBSInput as Input } from '../../core/forms/RFBSInput';

const form = 'changePasswordForm';
const constraints = {
  password: {
    presence: true
  },
  confirmPassword: {
    presence: true,
    equality: 'password'
  }
};

@reduxForm({
  form,
  fields: ['password', 'confirmPassword'],
  validate: data => validate(data, constraints) || {}
})
export default class ChangePasswordForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
  }

  render() {
    const { fields: { password, confirmPassword }, invalid, handleSubmit } = this.props;

    return (
      <form>
        <Input type="password" label="Password" field={ password } />
        <Input type="password" label="Confirm Password" field={ confirmPassword } />
        <ButtonInput type="submit" bsStyle="primary" onClick={ handleSubmit } disabled={ invalid } />
      </form>
    );
  }
}
