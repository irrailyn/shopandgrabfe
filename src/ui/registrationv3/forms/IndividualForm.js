import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import {Button, Col} from 'react-bootstrap';
import validate from 'validate.js';
import RFBSInput from '../../core/components/RFBSInput';

const constraints = {
  name: {
    presence: true,
  },
  password: {
    presence: true,
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
  phonenumber: {
    presence: true
  }
};


@reduxForm({
  form: 'registrationv3',
  fields: ['name', 'password', 'passwordRepeat', 'email', 'phonenumber'],
  validate: data => validate(data, constraints) || {}
})

export default class Registerv3 extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired
  }

  render() {
    const {
      fields: {
        name,
        password,
        passwordRepeat,
        email,
        phonenumber
      }
    } = this.props;
    return (
      <div>
        <form >
          <Col md={12}>
            <RFBSInput type="text" label="Name*" placeholder="Name" field={name} />
            <RFBSInput type="password" label="Password*" placeholder="Password" field={password} />
            <RFBSInput type="password" label="Repeat Password*" placeholder="Re-type Password" field={passwordRepeat} />
            <RFBSInput type="email" label="Email Address*" placeholder="Email Address" field={email} />
            <RFBSInput type="number" label="Phone Number*" placeholder="Phone Number" field={phonenumber} />
            <p className="fL"><i>* Required fields</i></p>
            <div className="clearfix"></div>
            <Button className="pull-right" type="submit" bsStyle="primary">Register</Button>
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
