import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { redirectToSuccessPage, changePassword } from 'redux/modules/resetPassword';
import styles from '../../login/Login.less';
import ChangePasswordForm from './ChangePasswordForm';

@connect(
  state => ({ routing: state.routing, resetPassword: state.resetPassword }),
  { changePassword, redirectToSuccessPage }
)
export default class ChangePassword extends Component {
  static propTypes = {
    routing: PropTypes.object.isRequired,
    resetPassword: PropTypes.object.isRequired,
    changePassword: PropTypes.func.isRequired,
    redirectToSuccessPage: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    let token;
    const { resetPassword, routing } = this.props;
    const query = routing.location.query;

    if (query.r) {
      token = query.r;
    } else {
      const response = resetPassword.get('response');
      token = response.get('token');
    }

    this.state = {
      token
    };
  }

  componentWillReceiveProps(nextProps) {
    const redirect = nextProps.resetPassword.get('redirect');

    if (redirect) {
      this.props.redirectToSuccessPage();
    }
  }

  handleSubmit = (formData) => {
    this.props.changePassword(formData.password, this.state.token);
  }

  render() {
    const { resetPassword } = this.props;
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
          <h1 className="text-center">Change Password</h1>
          <div className={styles.loginModule}>
            { errors }
            <ChangePasswordForm onSubmit={ this.handleSubmit.bind(this) } />
            <p><a href="/resetPassword">Resend reset link to email</a></p>
          </div>
        </div>
      </div>
    );
  }
}
