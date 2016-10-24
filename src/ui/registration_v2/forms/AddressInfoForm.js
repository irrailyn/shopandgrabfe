import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import validate from 'validate.js';
import {Button, Col} from 'react-bootstrap';
import RFBSInput from '../../core/components/RFBSInput';

const constraints = {
  address1: {
    presence: true
  },
  address2: {
    presence: true
  },
  city: {
    presence: true
  },
  zipcode: {
    presence: true
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
  fields: ['company', 'address1', 'address2', 'city', 'zipcode', 'country', 'state'],
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
        address1,
        address2,
        city,
        zipcode,
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
            <RFBSInput type="text" label="Address *" placeholder="Address 1" field={address1} />
            <RFBSInput type="text" field={address2} placeholder="Address 2" />
          </Col>
          <Col md={6}>
            <RFBSInput type="text" field={city} placeholder="City" />
          </Col>
          <Col md={6}>
            <RFBSInput type="text" field={zipcode} placeholder="Zip" />
          </Col>
          <Col md={6} className="form-group">
            <RFBSInput type="select" field={country} placeholder="Country">
              <option value="">Country</option>
              <option value="c1">country 1</option>
              <option value="c2">country 2</option>
            </RFBSInput>
          </Col>
          <Col md={6} className="form-group">
            <RFBSInput type="select" field={state} placeholder="State">
              <option value="">State</option>
              <option value="s1">state 1</option>
              <option value="s2">state 2</option>
            </RFBSInput>
          </Col>
          <Col md={12}>
            <p><i>* Required fields</i></p>
          </Col>
          <Col md={12}>
            <Button type="submit" bsStyle="primary" onClick={backHandler}>Prev</Button>
            <Button className="pull-right" type="submit" bsStyle="primary" onClick={handleSubmit} disabled={invalid}>Finish</Button>
          </Col>
        </form>
      </div>
    );
  }
}
