import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { formUser, redirectLoggedInUser, resetRegisterSteps } from 'redux/modules/auth';
import LoginForm from './forms/LoginForm';
import styles from './Login.less';
import RBSInput from './forms/RBSInput';
import RBSTextarea from './forms/RBSTextarea';
import RBSSelect from './forms/RBSSelect';
import FacebookLogin from 'react-facebook-login';
import FacebookButton from './forms/FacebookButton';

@connect(
  state => ({auth: state.auth}),
  { loginUser, redirectLoggedInUser, resetRegisterSteps }
)

@reduxForm({
  form: 'login',
  fields: ['input', 'textarea', 'select']
})

export default class Login extends Component {

  static propTypes = {
    fields: PropTypes.object,
    auth: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    resetRegisterSteps: PropTypes.func.isRequired,
    redirectLoggedInUser: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    if (this.props.auth.get('isLoggedIn')) {
      this.props.redirectLoggedInUser();
    }
  }

  responseFacebook = (response) => {
    console.log('RESPONSE:', response);
  };

  handleSubmit(formData) {
    this.props.loginUser(formData.email, formData.password);
  }

  clickRegister = () => {
    this.props.resetRegisterSteps();
  }

  render() {
    const { auth } = this.props;
    const errors = [];
    const {
      fields: {
        input,
        textarea,
        select
      }
    } = this.props;

    if (auth.get('isError')) {
      errors.push(
        <div
          key="error"
          className="alert alert-danger"
          role="alert">
          There was a problem authenticating. Please contact admin.
        </div>
      );
    }

    if (auth.get('isUnauthorized')) {
      errors.push(
        <div
          key="auth"
          className="alert alert-danger"
          role="alert">
          There was a problem with your credentials
        </div>
      );
    }

    if (this.props.auth.get('isLoggedIn')) {
      return null;
    }

    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginModule}>
          <h1>Login TEST</h1>
          {errors}
          <LoginForm onSubmit={this.handleSubmit.bind(this)} registerHandler={this.clickRegister}/>
          <hr/>
          <RBSInput type="text" label="Text Input" field={input} />
          <RBSTextarea type="textarea" label="Text Area" field={textarea} />
          <RBSSelect type="select" label="Select" field={select} />
          <hr/>
          <FacebookLogin
          appId="1088597931155576"
          autoLoad
          fields="name,email"
          callback={this.responseFacebook()}
          cssClass="my-facebook-button-class"
          icon="fa-facebook"
          />
          <hr/>
          <FacebookButton/>
        </div>
      </div>
    );
  }
}
