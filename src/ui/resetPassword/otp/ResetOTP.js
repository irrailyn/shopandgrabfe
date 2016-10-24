import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { redirectToSuccessPage, redirectToChangePasswordPage, verifyOTP } from 'redux/modules/resetPassword';
import VerifyOTPForm from './ResetOTPForm';
import styles from '../../login/Login.less';

@connect(
  state => ({ routing: state.routing, resetPassword: state.resetPassword }),
  { redirectToSuccessPage, redirectToChangePasswordPage, verifyOTP }
)
export default class ResetOTP extends Component {
  static propTypes = {
    routing: PropTypes.object.isRequired,
    resetPassword: PropTypes.object.isRequired,
    redirectToSuccessPage: PropTypes.func.isRequired,
    redirectToChangePasswordPage: PropTypes.func.isRequired,
    verifyOTP: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    const redirect = nextProps.resetPassword.get('redirect');
    const response = nextProps.resetPassword.get('response');

    if (redirect) {
      const responseToJS = response.toJS();

      if (responseToJS.result.token) {
        this.props.redirectToChangePasswordPage(responseToJS.result.token);
      } else {
        this.props.redirectToSuccessPage();
      }
    }
  }

  handleSubmit = (formData) => {
    this.props.verifyOTP(formData);
  }

  render() {
    const { resetPassword } = this.props;
    // const result = resetPassword.get('response');
    // const email = result.get('email');
    // const phoneNumber = result.get('phoneNumber');
    const errors = [];

    if (resetPassword.get('isUnauthorized')) {
      const err = resetPassword.get('err');

      errors.push(
        <div
          key="passwordChange"
          className="alert alert-danger"
          role="alert">
          { err.get('message') }
        </div>
      );
    }

    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginWrap}>
          <h1 className="text-center">Verify OTP Code</h1>
          <div className={styles.loginModule}>
            { errors }
            <VerifyOTPForm onSubmit={ this.handleSubmit.bind(this) } />
          </div>
        </div>
      </div>
    );
  }
}
