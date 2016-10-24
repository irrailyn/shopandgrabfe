import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { redirectLoggedInUser, createUser } from 'redux/modules/auth';
import RegisterForm from './forms/RegisterForm';

@connect(
  state => ({auth: state.auth}),
  { redirectLoggedInUser, createUser }
)
export default class Register extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    createUser: PropTypes.func.isRequired,
    redirectLoggedInUser: PropTypes.func.isRequired,
  }

  componentWillMount() {
    if (this.props.auth.get('isLoggedIn')) {
      this.props.redirectLoggedInUser();
    }
  }

  handleSubmit(formData) {
    this.props.createUser(formData);
  }

  render() {
    const { auth } = this.props;
    const oAuth = auth.toJS();
    const alerts = [];
    const { err, isError } = oAuth;
    const { errors } = err;

    if (isError) {
      if (!errors) {
        alerts.push(
          <div
            key="error"
            className="alert alert-danger"
            role="alert">
            There was a problem authenticating. Please contact admin.
          </div>
        );
      } else {
        alerts.push(...(errors.map(item =>
          <div
            key="error-{item.pathname}"
            className="alert alert-danger"
            role="alert">
            {item.message}
          </div>
        )));
      }
    }
    /* const { auth } = this.props;
    const alerts = [];
    const err = auth.get('err').toJS();
    const { errors } = err;

    if (auth.get('isError')) {
      if (!errors) {
        alerts.push(
          <div
            key="error"
            className="alert alert-danger"
            role="alert">
            There was a problem authenticating. Please contact admin.
          </div>
        );
      } else {
        alerts.push(...(errors.map(item =>
          <div
            key="error-{item.pathname}"
            className="alert alert-danger"
            role="alert">
            {item.message}
          </div>
        )));
      }
    } */

    return (
      <div>
        <h1>Register</h1>
        {alerts}
        <RegisterForm onSubmit={this.handleSubmit.bind(this)} />
      </div>
    );
  }
}
