import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import validate from 'validate.js';
import {Button, Col} from 'react-bootstrap';
import RFBSInput from '../../core/components/RFBSInput';

const constraints = {
  address: {
    presence: true
  },
  address2: {
    presence: true
  },
  city: {
    presence: true
  },
  zip: {
    numericality: {
      onlyInteger: true,
      greaterThan: -1,
      notValid: 'must be a number'
    }
  },
  country: {
    presence: true
  },
  state: {
    presence: true
  },
};

@reduxForm({
  form: 'addressInfo',
  fields: ['company', 'address', 'address2', 'city', 'zip', 'country', 'state'],
  validate: data => validate(data, constraints) || {}
})
export default class AddressInfoForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    backHandler: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
  };

  render() {
    const {
      fields: {
        company,
        address,
        address2,
        city,
        zip,
        country,
        state
      },
      handleSubmit,
      backHandler,
      invalid
    } = this.props;

    return (
      <div>
        <Col md={12}>
          <h4><i className="fa fa-map-marker fa-lg"></i> Address Info</h4>
        </Col>
        <form onSubmit={handleSubmit}>
          <Col md={12}>
            <RFBSInput type="text" label="Company Name" placeholder="Company Name" field={company} />
            <RFBSInput type="text" label="Address *" placeholder="Address 1" field={address} />
            <RFBSInput type="text" field={address2} placeholder="Address 2" />
          </Col>
          <Col md={6}>
            <RFBSInput type="text" field={city} placeholder="City" />
          </Col>
          <Col md={6}>
            <RFBSInput type="text" field={zip} placeholder="Zip" />
          </Col>
          <Col md={6} className="form-group">
            <RFBSInput type="select" field={country} value={ country.value || country.defaultValue } placeholder="Country">
              <option></option>
              <option value="c1">country 1</option>
              <option value="c2">country 2</option>
            </RFBSInput>
          </Col>
          <Col md={6} className="form-group">
            <RFBSInput type="select" field={state} value={ state.value || state.defaultValue } placeholder="State">
              <option></option>
              <option value="s1">state 1</option>
              <option value="s2">state 2</option>
            </RFBSInput>
          </Col>
          <Col md={12}>
            <p><i>* Required fields</i></p>
          </Col>
          <Col md={6}>
            <Button type="button" bsStyle="primary" onClick={backHandler}>Prev</Button>
          </Col>
          <Col md={6}>
            <Button className="pull-right" type="submit" bsStyle="primary" disabled={invalid}>Save and Next</Button>
          </Col>
        </form>
      </div>
    );
  }
}
