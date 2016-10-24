import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { loginUser, redirectLoggedInUser, fbLoginUser } from 'redux/modules/auth';
import LoginForm from './LoginForm';
import styles from './Login.less';
import FacebookLogin from 'react-facebook-login';
// import Input from 'react-toolbox/lib/input';

// import GoogleLogin from 'react-google-login';

@connect(
  state => ({auth: state.auth}),
  { loginUser, redirectLoggedInUser, fbLoginUser }
)

@reduxForm({
  form: 'login',
  fields: ['input', 'textarea', 'select']
})

export default class Login extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    redirectLoggedInUser: PropTypes.func.isRequired,
    fbLoginUser: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.auth.get('isLoggedIn')) {
      this.props.redirectLoggedInUser();
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const redirectLogin = nextProps.auth.get('registerRedirect');
    if (redirectLogin) {
      this.props.redirectLoggedInUser();
    }
  }

  responseFacebook = (response) => {
    this.props.fbLoginUser(response);
  }

  handleSubmit(formData) {
    this.props.loginUser(formData.userName, formData.password);
  }

  render() {
    const { auth } = this.props;
    const errors = [];

    if (auth.get('isError')) {
      errors.push(
        <div
          key="error"
          className="alert alert-danger"
          role="alert">
          { (auth.get('err').size !== 0) ? auth.get('err').get('message') : null }
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
    // scope="public_profile, email, user_birthday, last_name, user_about_me"
    // fields="id,name,first_name,last_name,picture,middle_name,gender,name_format,email"
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginWrap}>
          <h1 className="text-center">Welcome to Genesis</h1>
          <div className={styles.loginModule}>
            {errors}
            <LoginForm onSubmit={this.handleSubmit.bind(this)} />
          </div>
          <p className="text-center">or</p>
          <FacebookLogin
          appId="919914488119141"
          fields="id,name,first_name,last_name,picture,middle_name,gender,name_format,email"
          callback={this.responseFacebook.bind(this)}
          cssClass={styles.fbConnect + ' btn btn-primary col-md-12 text-center'}
          icon="fa fa-facebook"
          />
        </div>
      </div>
    );
  }
}
