import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import validate from 'validate.js';
import {ButtonInput} from 'react-bootstrap';
import { RFBSInput as Input } from '../core/forms/RFBSInput';
import Checkbox from 'react-toolbox/lib/checkbox';

const constraints = {
  userName: {
    // presence: true,
  },
  password: {
    // presence: true
  }
};

validate.validators.presence.options = {message: 'is required'};

const form = 'login';

@reduxForm({
  form,
  fields: ['userName', 'password', 'rememberMe'],
  validate: data => validate(data, constraints) || {},
})
export default class LoginForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      check1: true,
      check2: false
    };
  }

  handleChange = (field, value) => {
    this.setState({...this.state, [field]: value});
  };

  render() {
    const {
      fields: {
        userName,
        password,
        rememberMe
      },
      handleSubmit,
      invalid
    } = this.props;
    // <Input type="checkbox" label="Remember Me" field={rememberMe} />
    return (
      <div>
        <form>
          <Input type="text" label="Username or Email Address" icon={<i className="fa fa-envelope fa-1x" aria-hidden="true"></i>} maxLength={40} field={userName} required/>
          <Input type="password" label="Password" icon={<i className="fa fa-key fa-1x" aria-hidden="true"></i>} field={password} required />
          <div>
            <Checkbox
              checked={this.state.check2}
              label="Remember Me"
              onChange={this.handleChange.bind(this, 'check2')}
              field={rememberMe}
            />
          </div>
          <ButtonInput type="submit" bsStyle="primary" onClick={handleSubmit} disabled={invalid} />
          <div className="clearfix">
            <a className="pull-left" href="/resetPassword">Forgot Password</a>
            <a className="pull-right" href="/register_v1">Register New Account?</a>
          </div>
        </form>
      </div>
    );
  }
}
