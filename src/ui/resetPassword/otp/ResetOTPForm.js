import React, { Component, PropTypes } from 'react';
import validate from 'validate.js';
import { reduxForm } from 'redux-form';
import { ButtonInput } from 'react-bootstrap';
import { RFBSInput as Input } from '../../core/forms/RFBSInput';

const form = 'verifyOTPForm';
const constraints = {
  code: {
    presence: true
  }
};

@reduxForm({
  form,
  fields: ['code', 'email', 'phoneNumber'],
  validate: data => validate(data, constraints) || {}
},
(state) => {
  const resetPassword = state.resetPassword;
  const result = resetPassword.get('response');
  return {
    initialValues: {
      email: result.get('email'),
      phoneNumber: result.get('phoneNumber')
    }
  };
})
export default class VerifyOTPForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    // email: PropTypes.string,
    // phoneNumber: PropTypes.string,
    touch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    // this.state = {
    //   emailFieldVal: props.email,
    //   phoneFieldVal: props.phoneNumber
    // };
  }

  componentWillMount() {
    this.props.touch('email', 'phoneNumber');
  }

  handleChange = (props) => {
    console.log(props);
  }

  render() {
    // const { emailFieldVal, phoneFieldVal } = this.state;
    const { fields: { code, email, phoneNumber }, invalid, handleSubmit } = this.props;
    return (
      <form>
        <Input type="text" label="OTP Code" field={ code } />
        <Input type="text" label="Email Address" field={ email } onChange={ this.handleChange } />
        <Input type="text" label="Phone Number" field={ phoneNumber } onChange={ this.handleChange } />
        <ButtonInput type="submit" bsStyle="primary" onClick={ handleSubmit } disabled={ invalid } />
        <p><a href="/resetPassword">Back</a></p>
      </form>
    );
  }
}
