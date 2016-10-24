import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { redirectToRegistration, redirectLoggedInUser, forceLogin, fetchUser } from 'redux/modules/auth';

@connect(
  state => ({
    auth: state.auth,
    routing: state.routing
  }),
  { redirectToRegistration, redirectLoggedInUser, forceLogin, fetchUser }
)
export default class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    routing: PropTypes.object.isRequired,
    forceLogin: PropTypes.func.isRequired,
    fetchUser: PropTypes.func.isRequired,
    redirectLoggedInUser: PropTypes.func.isRequired,
    redirectToRegistration: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const currentyLoggedIn = this.props.auth.get('isLoggedIn');
    const willBeLoggedIn = nextProps.auth.get('isLoggedIn');
    const nextUser = nextProps.auth.get('user');

    const { routing: { location } } = this.props;
    const inRegistrationPage = (location.pathname === '/register_v2') ? true : false;

    if (currentyLoggedIn && !willBeLoggedIn) {
      this.props.forceLogin();
    } else if (!currentyLoggedIn && willBeLoggedIn) {
      if (nextUser.get('status') === 'ACTIVE') {
        this.props.redirectLoggedInUser();
      } else if (nextUser.get('status') !== 'ACTIVE' && !inRegistrationPage) {
        this.props.redirectToRegistration();
      }
    } else if (currentyLoggedIn && willBeLoggedIn) {
      if (nextUser.size === 0 && inRegistrationPage) {
        this.props.fetchUser();
      } else if ((nextUser.get('status') === 'ONBOARDING1' || nextUser.get('status') === 'ONBOARDING2') && !inRegistrationPage) {
        this.props.redirectToRegistration();
      } else if (nextUser.get('status') === 'ACTIVE' && inRegistrationPage) {
        this.props.redirectLoggedInUser();
      }
    }
  }

  render() {
    return (
      <div id="app_container">
        {this.props.children}
      </div>
    );
  }
}
