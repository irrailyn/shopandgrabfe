import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setAction, sendResetLink, sendOTP, redirectToOTPVerification, redirectToSuccessPage } from 'redux/modules/resetPassword';
import ResetPasswordForm from './ResetPasswordForm';
import ResetPasswordFormOptions from './ResetPasswordFormOptions';
import styles from '../login/Login.less';

@connect(
  state => ({resetPassword: state.resetPassword }),
  { setAction, sendResetLink, sendOTP, redirectToOTPVerification, redirectToSuccessPage }
)
export default class ResetPassword extends Component {
  static propTypes = {
    resetPassword: PropTypes.object.isRequired,
    setAction: PropTypes.func.isRequired,
    sendResetLink: PropTypes.func.isRequired,
    sendOTP: PropTypes.func.isRequired,
    // answerSecurityQuestions: PropTypes.func.isRequired,
    redirectToOTPVerification: PropTypes.func.isRequired,
    redirectToSuccessPage: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      initialMode: true,
      action: '1',
      activeIndex: 0,
      actions: [
        {
          value: '1',
          label: 'Send link to Email Address',
          fields: ['email'],
          fieldsConfig: {
            email: {
              type: 'text',
              label: 'Email Address'
            }
          },
          constraints: {
            email: {
              presence: true
            }
          }
        },
        {
          value: '2',
          label: 'Send OTP to my Mobile Number',
          fields: ['email', 'phoneNumber'],
          fieldsConfig: {
            email: {
              type: 'text',
              label: 'Email Address'
            },
            phoneNumber: {
              type: 'text',
              label: 'Phone Number'
            }
          },
          constraints: {
            // email: {
            //   presence: true
            // },
            phoneNumber: {
              // presence: true,
              length: {
                minimum: 7,
                maximum: 15,
              },
              numericality: true
            }
          }
        },
        // {
        //   value: '3',
        //   label: 'Answer Security Questions',
        //   fields: [],
        //   fieldsConfig: {},
        //   constraints: {}
        // }
      ]
    };
  }

  componentWillMount() {
    this.props.setAction('1');
  }

  componentWillReceiveProps(nextProps) {
    const resetPassword = nextProps.resetPassword;
    const action = resetPassword.get('action');

    if (action) {
      switch (action) {
        case 'otp':
          console.log('Redirect to page to input OTP code');
          this.props.redirectToOTPVerification(resetPassword.get('response'));
          break;

        default:
          console.log('Redirect to a page saying email sent successfully');
          this.props.redirectToSuccessPage();
          break;
      }
    }
  }

  handleChange = (value) => {
    if (this.state.initialMode) {
      this.setState({ initialMode: !this.state.initialMode });
    }

    this.props.setAction(value);
    this.setState({ action: value });
    this.setState({ activeIndex: parseInt(value, 10) - 1 });
  }

  handleSubmit(formData) {
    switch (this.state.action) {
      case '2':
        this.props.sendOTP(formData);
        break;

      // case '3':
      //   this.props.answerSecurityQuestions(formData.email, formData.phone);
      //   break;

      default:
        this.props.sendResetLink(formData.email);
        break;
    }
  }

  render() {
    const actions = this.state.actions;
    const config = actions[this.state.activeIndex].fieldsConfig;
    const fields = Object.keys(config);
    const constraints = actions[this.state.activeIndex].constraints;

    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginWrap}>
          <h1 className="text-center">Reset Password</h1>
          <div className={styles.loginModule}>
            <ResetPasswordFormOptions actions= { actions } setAction={ this.handleChange } activeAction= { this.state.action } />
            <ResetPasswordForm config={ config } constraints={ constraints } fields={ fields } activeAction= { this.state.action } onSubmit={ this.handleSubmit.bind(this) } />
          </div>
        </div>
      </div>
    );
  }
}
