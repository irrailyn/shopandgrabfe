import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import Recaptcha from 'react-gcaptcha';
import validate from 'validate.js';
import {Button, Col} from 'react-bootstrap';
import RFBSInput from '../../core/components/RFBSInput';
import { Link } from 'react-router';
import { VerifyUniqueFields } from '../../../helpers/App';

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

const asyncValidate = (values, dispatch, props) => {
  if (props.form._active !== undefined) {
    return VerifyUniqueFields(values, dispatch, props);
  }
  return Promise.resolve();
};

@reduxForm({
  form: 'registration',
  fields: ['email', 'userName', 'password', 'passwordRepeat', 'agreement', 'subscription'],
  asyncValidate,
  asyncBlurFields: ['userName', 'email'],
  validate: data => validate(data, constraints) || {}
})
export default class AuthForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    disableFields: PropTypes.bool.isRequired,
    asyncValidating: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      valid: true
    };
  }

  callback = (key) => {
    console.log('callback:', key);
    if (key !== null) {
      this.setState({valid: false});
    }
  };

  recaptchaLoaded = (key) => {
    console.log('recaptchaLoaded:', key);
    console.log('recaptchaLoaded');
  };

  render() {
    let captcha = '';
    const {
      fields: {
        email,
        userName,
        password,
        passwordRepeat,
        agreement,
        subscription
      },
      disableFields,
      handleSubmit,
      invalid,
      asyncValidating
    } = this.props;
    if (disableFields) {
      agreement.defaultValue = true;
    }
    if (!agreement.defaultValue) {
      captcha = <Recaptcha sitekey="6LckBCMTAAAAAHLXOwfIbWzX3Gdgti8QQaygaYhr" onloadCallback= {this.recaptchaLoaded.bind(this)} verifyCallback={this.callback.bind(this)} />;
    }

    return (
      <div>
        <Col md={12}>
          <h4><i className="fa fa-unlock-alt fa-lg"></i> Authentication</h4>
        </Col>
        <form>
          <Col md={12}>
            <RFBSInput type="text" label="Email Address *" placeholder="Email" field={email} value={ email.defaultValue } disabled = {disableFields} />
            {asyncValidating === 'email' ? '<i className="fa fa-cog fa-spin fa-3x fa-fw" />' : ''}
            <RFBSInput type="text" label="Username *" placeholder="Username" field={userName} value={ userName.defaultValue } />
            {asyncValidating === 'userName' ? <i className="fa fa-cog fa-spin fa-3x fa-fw" /> : ''}
            <RFBSInput type="password" label="Password *" placeholder="Password" field={password} value={ password.defaultValue } />
            <RFBSInput type="password" label="Repeat Password *" placeholder="Re-type Password" field={passwordRepeat} value={ passwordRepeat.defaultValue } />
            <div className="clearfix"></div>
            {captcha}
            <div className="clearfix"></div>
            <RFBSInput type="checkbox" label="Terms and Agreement *" checked={ agreement.defaultValue } field={agreement} disabled={this.state.valid}/>
            <RFBSInput type="checkbox" label="Newsletter Subscription" checked={ subscription.defaultValue } field={subscription} />
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
