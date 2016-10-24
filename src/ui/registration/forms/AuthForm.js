import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import Recaptcha from 'react-gcaptcha';
import validate from 'validate.js';
import {Button, Col} from 'react-bootstrap';
import RFBSInput from '../../core/components/RFBSInput';

const constraints = {
  username: {
    presence: true,
  },
  password: {
    presence: true
  },
  passwordRepeat: {
    presence: true,
    equality: {
      attribute: 'password',
      message: '^The passwords does not match'
    }
  },
  agreement: {
    presence: true
  },
};

@reduxForm({
  form: 'registration',
  fields: ['username', 'password', 'passwordRepeat', 'agreement', 'subscription', 'captcha'],
  validate: data => validate(data, constraints) || {}
})
export default class AuthForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    backHandler: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
  };

  callback = (key) => {
    console.log('callback:', key);
  };

  recaptchaLoaded = (key) => {
    console.log('recaptchaLoaded:', key);
    console.log('recaptchaLoaded');
  };

  render() {
    const {
      fields: {
        username,
        password,
        passwordRepeat,
        agreement,
        subscription,
      },
      handleSubmit,
      backHandler,
      invalid
    } = this.props;

    return (
      <div>
        <Col md={12}>
          <h4><i className="fa fa-unlock-alt fa-lg"></i> Address Info</h4>
        </Col>
        <form>
          <Col md={12}>
            <RFBSInput type="text" label="Username *" placeholder="Username" field={username} value={ username.value || username.defaultValue } />
            <RFBSInput type="password" label="Password *" placeholder="Password" field={password} value={ password.value || password.defaultValue } />
            <RFBSInput type="password" label="Repeat Password *" placeholder="Re-type Password" field={passwordRepeat} value={ passwordRepeat.value || passwordRepeat.defaultValue } />
            <div className="clearfix"></div>
            <Recaptcha
              sitekey="6LckBCMTAAAAAHLXOwfIbWzX3Gdgti8QQaygaYhr"
              onloadCallback={this.recaptchaLoaded.bind(this)}
              verifyCallback={this.callback.bind(this)}
            />
            <div className="clearfix"></div>
            <RFBSInput type="checkbox" label="Terms and Agreement *" checked={ agreement.value || agreement.defaultValue } field={agreement} />
            <RFBSInput type="checkbox" label="Newsletter Subscription" checked={ subscription.value || subscription.defaultValue } field={subscription} />
            <p><i>* Required fields</i></p>
          </Col>
          <Col md={6}>
            <Button type="submit" bsStyle="primary" onClick={backHandler}>Prev</Button>
          </Col>
          <Col md={6}>
            <Button className="pull-right" type="submit" bsStyle="primary" onClick={handleSubmit} disabled={invalid}>Sign Up</Button>
          </Col>
        </form>
      </div>
    );
  }
}
