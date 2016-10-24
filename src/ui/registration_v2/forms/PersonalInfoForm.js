import React, {Component, PropTypes} from 'react';
import { reduxForm, change } from 'redux-form';
import validate from 'validate.js';
import {Button, Col} from 'react-bootstrap';
import RFBSInput from '../../core/components/RFBSInput';
import RFBSFile from '../../core/forms/RFBSFile';

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
  phoneNumber: {
    numericality: {
      onlyInteger: true,
      greaterThan: -1,
      notValid: 'must be a number'
    }
  }
};

@reduxForm({
  form: 'personalInfo',
  fields: ['avatarImageUrl', 'firstName', 'lastName', 'phoneNumber', 'gender'],
  validate: data => validate(data, constraints) || {}
},
undefined,
dispatch => {
  return {
    changeFieldValue(field, value) {
      dispatch(change('personalInfo', field, value));
    }
  };
})
export default class PersonalInfoForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    backHandler: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    changeFieldValue: PropTypes.func.isRequired
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
        lastName,
        phoneNumber,
        gender
      },
      backHandler,
      handleSubmit,
      invalid
    } = this.props;
    let file = '';
    if ( avatarImageUrl.defaultValue !== undefined ) {
      if ( avatarImageUrl.defaultValue._root.entries[0][1] !== null ) {
        file = <RFBSFile type="file" label="Profile Picture*" onChange={this.handleChange.bind(this)} field={avatarImageUrl} value={ null } data={ avatarImageUrl.defaultValue._root.entries[0][1] } />;
      }
    } else {
      file = <RFBSFile type="file" label="Profile Picture*" onChange={this.handleChange.bind(this)} field={avatarImageUrl} value={ null } data={ null } />;
    }
    return (
      <div>
        <Col md={12}>
          <h4><i className="fa fa-user fa-lg"></i> Personal Info</h4>
        </Col>
        <form>
          <Col md={12}>
            {file}
            <RFBSInput type="text" label="First Name *" placeholder="First name" field={firstName} value={ firstName.defaultValue } />
            <RFBSInput type="text" label="Last Name *" placeholder="Last name" field={lastName} value={ lastName.defaultValue } />
            <RFBSInput type="text" label="Mobile Number" placeholder="Mobile number" field={phoneNumber} value={ phoneNumber.defaultValue } />
            <RFBSInput type="select" label="Gender" field={gender} value={ gender.defaultValue }>
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </RFBSInput>
            <p><i>* Required fields</i></p>
          </Col>
          <Col md={12}>
            <Button type="button" bsStyle="primary" onClick={backHandler}>Prev</Button>
            <Button className="pull-right" type="submit" bsStyle="primary" onClick={handleSubmit} disabled={invalid}>Save and Next</Button>
          </Col>
        </form>
      </div>
    );
  }
}
