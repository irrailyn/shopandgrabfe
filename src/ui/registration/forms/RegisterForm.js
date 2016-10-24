import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import validate from 'validate.js';
import {ButtonInput} from 'react-bootstrap';
import RFBSInput from '../../core/components/RFBSInput';

const constraints = {
  firstName: {
    presence: true
  },
  lastName: {
    presence: true
  },
  email: {
    presence: true,
    email: {
      message: 'must be a valid email address'
    }
  },
  password: {
    presence: true
  },
  confirmpassword: {
    presence: true,
    equality: 'password'
  }
};

@reduxForm({
  form: 'register',
  fields: ['firstName', 'lastName', 'email', 'password', 'confirmpassword'],
  validate: data => validate(data, constraints) || {}
})
export default class RegisterForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired
  };

  render() {
    const {
      fields: {
        firstName,
        lastName,
        email,
        password,
        confirmpassword
      },
      handleSubmit,
      invalid
    } = this.props;

    return (
      <div>
        <form>
          <RFBSInput type="text" label="Firstname" field={firstName} />
          <RFBSInput type="text" label="Lastname" field={lastName} />
          <RFBSInput type="text" label="Email Address" field={email} />
          <RFBSInput type="password" label="Password" field={password} />
          <RFBSInput type="password" label="Confirm Password" field={confirmpassword} />
          <ButtonInput type="submit" bsStyle="primary" onClick={handleSubmit} disabled={invalid} />
        </form>
      </div>
    );
  }

}
