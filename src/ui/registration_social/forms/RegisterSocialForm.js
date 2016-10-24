import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {Col} from 'react-bootstrap';
import validate from 'validate.js';
import RFBSInput from '../../core/components/RFBSInput';
import RFBSFile from '../../core/forms/RFBSFile';

const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

validate.validators.boolValue = (value, option) => {
  if (!value === option) {
    return 'should be accepted';
  }
};

const constraints = {
  email: {
    presence: true,
    email: {
      message: 'must be a valid email address'
    }
  },
  userName: {
    presence: true,
    length: {
      minimum: 6,
      tooShort: 'needs to have %{count} letters or more',
    },
    format: {
      pattern: '[a-z0-9]+',
      flags: 'i',
      message: 'can only contain a-z and 0-9'
    }
  },
  password: {
    presence: true,
    format: {
      pattern: pattern,
      message: 'should have at least one upper and one lower case english letter, at least one digit, at least one special character, and minimum 8 in length.'
    }
  },
  passwordRepeat: {
    presence: true,
    equality: {
      attribute: 'password',
      message: '^The passwords does not match'
    }
  },
  agreement: {
    presence: true,
    boolValue: true,
  }
};

@connect(
  state => ({auth: state.auth}),
  { }
)

@reduxForm({
  form: 'registrationsocial',
  fields: ['avatarImageUrl', 'firstName', 'lastName', 'email', 'phoneNumber', 'gender', 'address1', 'address2', 'city', 'zipcode', 'country', 'state'],
  validate: data => validate(data, constraints) || {}
})

export default class RegisterSocialForm extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
  }

  ComponentDidMount = () => {
    console.log('ComponentDidMount');
  }

  render() {
    const {
      fields: {
        avatarImageUrl,
        firstName,
        lastName,
        email,
        phoneNumber,
        gender,
        address1,
        address2,
        city,
        zipcode,
        country,
        state
      }
    } = this.props;
    const { auth } = this.props;
    const authjs = auth.toJS();
    return (
      <div>
        <Col md={12}>
          <form>
            <Col md={12}>
            <p><i>* Required Fields</i></p>
              <h4><i className="fa fa-user" aria-hidden="true"></i> Personal Info</h4>
            </Col>
            <Col md={12}>
              <RFBSFile type="file" label="Profile Picture *" field={avatarImageUrl} value={ null } />
              <RFBSInput type="text" label="First Name *" field={firstName} value={ authjs.user.name } />
              <RFBSInput type="text" label="Last Name *" field={lastName} value={ lastName.value || lastName.defaultValue } />
              <RFBSInput type="text" label="Email Address *" field={email} value={ email.value || email.defaultValue } />
              <RFBSInput type="text" label="Mobile Number" field={phoneNumber} value={ phoneNumber.value || phoneNumber.defaultValue } />
              <RFBSInput type="select" label="Gender" field={gender} value={ gender.value || gender.defaultValue }>
                <option></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </RFBSInput>
              <RFBSInput type="text" label="Address" placeholder="Address 1" field={address1} />
              <RFBSInput type="text" field={address2} placeholder="Address 2" />
            </Col>
            <Col md={8}>
              <RFBSInput type="text" field={city} placeholder="City" />
            </Col>
            <Col md={4}>
              <RFBSInput type="text" field={zipcode} placeholder="Zip" />
            </Col>
            <Col md={6} className="form-group">
              <RFBSInput type="select" field={country} value={ country.value || country.defaultValue } placeholder="Country">
                <option value="">Country</option>
                <option value="c1">country 1</option>
                <option value="c2">country 2</option>
              </RFBSInput>
            </Col>
            <Col md={6} className="form-group">
              <RFBSInput type="select" field={state} value={ state.value || state.defaultValue } placeholder="State">
                <option value="">State</option>
                <option value="s1">state 1</option>
                <option value="s2">state 2</option>
              </RFBSInput>
            </Col>
          </form>
          <div className="clearfix"></div>
        </Col>
      </div>
    );
  }
}
