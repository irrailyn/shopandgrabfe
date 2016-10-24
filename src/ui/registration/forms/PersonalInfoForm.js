import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import validate from 'validate.js';
import {Button, Col} from 'react-bootstrap';
import RFBSInput from '../../core/components/RFBSInput';
import { Link } from 'react-router';

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
  mobile: {
    numericality: {
      onlyInteger: true,
      greaterThan: -1,
      notValid: 'must be a number'
    }
  }
};

@reduxForm({
  form: 'personalInfo',
  fields: ['firstName', 'lastName', 'email', 'mobile', 'gender'],
  validate: data => validate(data, constraints) || {}
})
export default class PersonalInfoForm extends Component {

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
        mobile,
        gender
      },
      handleSubmit,
      invalid
    } = this.props;

    return (
      <div>
        <Col md={12}>
          <h4><i className="fa fa-user fa-lg"></i> Personal Info</h4>
        </Col>
        <form>
          <Col md={12}>
            <RFBSInput type="text" label="First Name *" field={firstName} value={ firstName.value || firstName.defaultValue } />
            <RFBSInput type="text" label="Last Name *" field={lastName} value={ lastName.value || lastName.defaultValue } />
            <RFBSInput type="text" label="Email Address *" field={email} value={ email.value || email.defaultValue } />
            <RFBSInput type="text" label="Mobile Number" field={mobile} value={ mobile.value || mobile.defaultValue } />
            <RFBSInput type="select" label="Gender" field={gender} value={ gender.value || gender.defaultValue }>
              <option></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </RFBSInput>
            <p><i>* Required fields</i></p>
          </Col>
          <Col md={6}>
            <Link to="/">Already have an account?</Link>
          </Col>
          <Col md={6}>
            <Button className="pull-right" type="submit" bsStyle="primary" onClick={handleSubmit} disabled={invalid}>Save and Next</Button>
          </Col>
        </form>
      </div>
    );
  }
}
