import React, { Component, PropTypes } from 'react';
import { reduxForm, change } from 'redux-form';
import {Button, Col} from 'react-bootstrap';
import validate from 'validate.js';
import RFBSInput from '../../core/components/RFBSInput';
import RFBSFile from '../../core/forms/RFBSFile';
import { VerifyUniqueFields } from '../../../helpers/App';

const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const constraints = {
  firstName: {
    presence: true,
  },
  password: {
    presence: true,
    format: {
      pattern: pattern,
      message: 'should have at least one upper and one lower case english letter, at least one digit, at least one special character, and minimum 8 in length.'
    }
  },
  passwordRepeat: {
    equality: {
      attribute: 'password',
      message: '^The passwords does not match'
    }
  },
  email: {
    presence: true,
    email: {
      message: 'must be a valid email address'
    }
  },
  phoneNumber: {
    numericality: {
      onlyInteger: true,
      greaterThan: -1,
      notValid: 'must be a number'
    }
  }
};

const asyncValidate = (values, dispatch, props) => {
  if (props.form._active !== undefined) {
    return VerifyUniqueFields(values, dispatch, props);
  }
  return Promise.resolve();
};

@reduxForm({
  form: 'registrationv3indi',
  fields: ['avatarImageUrl', 'firstName', 'password', 'passwordRepeat', 'email', 'phoneNumber'],
  asyncValidate,
  asyncBlurFields: ['email'],
  validate: data => validate(data, constraints) || {}
},
undefined,
dispatch => {
  return {
    changeFieldValue(field, value) {
      dispatch(change('registrationv3indi', field, value));
    }
  };
})

export default class IndividualForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    changeFieldValue: PropTypes.func.isRequired,
    asyncValidating: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  handleChange = (name, value, type) => {
    console.log('name:', name);
    console.log('value:', value);
    console.log('type:', type);
    this.props.changeFieldValue(name, value);
  }

  render() {
    const {
      fields: {
        avatarImageUrl,
        firstName,
        password,
        passwordRepeat,
        email,
        phoneNumber
      },
      handleSubmit,
      invalid,
      asyncValidating
    } = this.props;
    return (
      <div>
        <form >
          <Col md={12}>
            <RFBSFile type="file" label="Profile Picture*" onChange={this.handleChange.bind(this)} field={avatarImageUrl} value={ null } />
            <RFBSInput type="text" label="Name*" placeholder="Name" field={firstName} />
            <RFBSInput type="password" label="Password*" placeholder="Password" field={password} />
            <RFBSInput type="password" label="Repeat Password*" placeholder="Re-type Password" field={passwordRepeat} />
            <RFBSInput type="email" label="Email Address*" placeholder="Email Address" field={email} />
            {asyncValidating === 'email' ? '<i className="fa fa-cog fa-spin fa-3x fa-fw" />' : ''}
            <RFBSInput type="text" label="Phone Number*" placeholder="Phone Number" field={phoneNumber} />
            <p className="fL"><i>* Required fields</i></p>
            <div className="clearfix"></div>
            <Button className="pull-right" type="submit" bsStyle="primary" disabled={invalid} onClick={handleSubmit}>Register</Button>
            <div className="clearfix"></div>
            <p>By clicking Create, you indicate that you have read and agree to the <a href="">Terms of Use</a> and <a href="">Privacy Policy.</a></p>
            <br />
            <div className="clearfix"></div>
          </Col>
        </form>
      </div>
    );
  }
}
