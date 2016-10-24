import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';
import validate from 'validate.js';
import {Button, Col} from 'react-bootstrap';
import RFBSInput from '../../core/components/RFBSInput';
import RFBSFile from '../../core/forms/RFBSFile';
import { Link } from 'react-router';
import { fbLoginUser } from 'redux/modules/auth';
import FacebookLogin from 'react-facebook-login';
// import multiparty from 'multiparty';
// import fs from 'fs';
import { VerifyUniqueFields } from '../../../helpers/App';

const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const constraints = {
  firstName: {
    presence: true,
    length: {
      minimum: 2,
      tooShort: 'needs to have %{count} letters or more',
      maximum: 30,
      tooLong: 'needs to have less than %{count} letters',
    }
  },
  lastName: {
    presence: true,
    length: {
      minimum: 2,
      tooShort: 'needs to have %{count} letters or more',
      maximum: 30,
      tooLong: 'needs to have less than %{count} letters',
    }
  },
  email: {
    presence: true,
    email: {
      message: 'must be a valid email address'
    }
  },
  mobile: {
    numericality: {
      onlyInteger: true,
      greaterThan: -1,
      notValid: 'must be a number'
    }
  },
  userName: {
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
    presence: true,
    equality: {
      attribute: 'password',
      message: '^The passwords does not match'
    }
  }
};

const asyncValidate = (values, dispatch, props) => {
  if (props.form._active !== undefined) {
    return VerifyUniqueFields(values, dispatch, props);
  }
};

@connect(
  state => ({auth: state.auth}),
  { fbLoginUser }
)

@reduxForm({
  form: 'addressInfo',
  fields: ['avatarImageUrl', 'firstName', 'lastName', 'email', 'phoneNumber', 'gender', 'userName', 'password', 'passwordRepeat', 'address1', 'address2', 'city', 'zipcode', 'country', 'state'],
  asyncValidate,
  asyncBlurFields: ['userName', 'email'],
  validate: data => validate(data, constraints) || {}
},
undefined,
dispatch => {
  return {
    changeFieldValue(field, value) {
      dispatch(change('addressInfo', field, value));
    }
  };
})
export default class RegistrationForm extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    fbLoginUser: PropTypes.func.isRequired,
    changeFieldValue: PropTypes.func.isRequired,
    asyncValidating: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  callback = (key) => {
    console.log('callback:', key);
  };

  recaptchaLoaded = (key) => {
    console.log('recaptchaLoaded:', key);
  };

  responseFacebook = (response) => {
    this.props.fbLoginUser(response);
  };

  handleChange = (name, value, type) => {
    console.log('name:', name);
    console.log('value:', value);
    console.log('type:', type);
    this.props.changeFieldValue(name, type);
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
        userName,
        password,
        passwordRepeat,
        address1,
        address2,
        city,
        zipcode,
        country,
        state
      },
      handleSubmit,
      invalid,
      asyncValidating
    } = this.props;
    return (
      <div>
        <form>
          <Col md={12}>
          <p><i>* Required Fields</i></p>
            <h4><i className="fa fa-user" aria-hidden="true"></i> Personal Info</h4>
          </Col>
          <Col md={12}>
            <RFBSFile type="file" label="Profile Picture *" onChange={this.handleChange.bind(this)} field={avatarImageUrl} value={ null } />
            <RFBSInput type="text" label="First Name *" field={firstName} value={ firstName.value || firstName.defaultValue } />
            <RFBSInput type="text" label="Last Name *" field={lastName} value={ lastName.value || lastName.defaultValue } />
            <RFBSInput type="text" label="Email Address *" field={email} value={ email.value || email.defaultValue } />
            {asyncValidating === 'email' ? '<i className="fa fa-cog fa-spin fa-3x fa-fw" />' : ''}
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
          <Col md={12}>
            <h4><i className="fa fa-unlock-alt fa-lg"></i> Authentication</h4>
          </Col>
          <Col md={12}>
            <RFBSInput type="text" label="Username *" placeholder="Username" field={userName} value={ userName.value || userName.defaultValue } />
            {asyncValidating === 'userName' ? <i className="fa fa-cog fa-spin fa-3x fa-fw" /> : ''}
            <RFBSInput type="password" label="Password *" placeholder="Password" field={password} value={ password.value || password.defaultValue } />
            <RFBSInput type="password" label="Repeat Password *" placeholder="Re-type Password" field={passwordRepeat} value={ passwordRepeat.value || passwordRepeat.defaultValue } />
            <div className="clearfix"></div>
          </Col>
          <Col md={6}>
            <Link to="/">Already have an account?</Link>
          </Col>
          <Col md={6}>
            <Button className="pull-right" type="submit" bsStyle="primary" onClick={handleSubmit} disabled={invalid}>Register</Button>
          </Col>
          <br/>
          <div className="clearfix"></div>
          <Col md={12}>
            <p>By clicking Create, you indicate that you have read and agree to the <a href="">Terms of Use</a> and <a href="">Privacy Policy.</a></p>
          </Col>
        </form>
        <div className="clearfix"></div>
        <p className="text-center">or</p>
        <div className="clearfix"></div>
        <Col md={12}>
          <FacebookLogin
            appId="919914488119141"
            scope="public_profile, email, user_birthday, last_name, user_about_me"
            fields="id,name,first_name,last_name,picture,middle_name,gender,name_format,email"
            callback={this.responseFacebook.bind(this)}
            cssClass="btn btn-primary col-md-12 text-center"
            icon="fa fa-facebook"
          />
          <div className="clearfix"></div>
          <br/>
          <p className="text-center">We won't post on your wall without your permission.</p>
        </Col>
      </div>
    );
  }
}
