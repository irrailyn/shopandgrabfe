import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { stepBack, registerUserStep1, registerUserStepOthers, fileImageUploadV2, verifyUserMail } from 'redux/modules/auth';
import PersonalInfoForm from './forms/PersonalInfoForm';
import AddressInfoForm from './forms/AddressInfoForm';
import AuthForm from './forms/AuthForm';
import styles from './Register.less';

@connect(
  state => ({auth: state.auth}),
  { stepBack, registerUserStep1, registerUserStepOthers, fileImageUploadV2, verifyUserMail }
)

export default class Register extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    stepBack: PropTypes.func,
    registerUserStep1: PropTypes.func,
    registerUserStepOthers: PropTypes.func,
    fileImageUploadV2: PropTypes.func,
    verifyUserMail: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    const isLoggedIn = (this.props.auth.get('token')) ? true : false;
    this.state = {
      fieldValues: {
        email: '',
        userName: '',
        password: '',
        passwordRepeat: '',
        agreement: isLoggedIn
      },
      fieldIgnore: {
        passwordRepeat: true,
        agreement: true,
        email: isLoggedIn
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.get('user') && nextProps.auth.get('user').size !== 0) {
      this.parseFormData(nextProps.auth.get('user').toObject());
    }
  }

  parseFormData = (formData) => {
    let fieldsUpdate;
    let cleanedData;
    cleanedData = {};
    fieldsUpdate = JSON.parse(JSON.stringify(this.state.fieldValues));
    for ( const key in formData ) {
      if ( formData.hasOwnProperty(key) && formData[key] !== undefined && formData[key] !== null) {
        fieldsUpdate[key] = formData[key];
        if (!this.state.fieldIgnore[key]) {
          cleanedData[key] = formData[key];
        }
      }
    }
    this.setState({fieldValues: fieldsUpdate});
    return cleanedData;
  }

  goBack = () => {
    this.props.stepBack();
  }

  saveStep1 = (formData) => {
    let updateIgnore;
    formData.status = 'ONBOARDING1';
    const data = this.parseFormData(formData);
    this.props.registerUserStep1(data).then(() => {
      updateIgnore = JSON.parse(JSON.stringify(this.state.fieldIgnore));
      updateIgnore.email = true;
      this.setState({fieldIgnore: updateIgnore});
    });
  }

  saveStepOthers = (formData) => {
    console.log('Response', formData);
    const avatar = formData.avatarImageUrl;
    delete formData.avatarImageUrl;
    const data = this.parseFormData(formData);
    this.props.fileImageUploadV2(avatar);
    this.props.registerUserStepOthers(data).then((response) => {
      console.log('saveStepOthers success', response);
    });
  }

  saveStepOthersLast = (formData) => {
    console.log('Response', formData);
    formData.status = 'ONBOARDING1';
    delete formData.avatarImageUrl;
    const data = this.parseFormData(formData);
    this.props.registerUserStepOthers(data).then((response) => {
      console.log('saveStepOthers success', response);
    });
  }

  verifyFields = (usermail) =>{
    return this.props.verifyUserMail(usermail);
  }

  render() {
    let step;
    const { auth } = this.props;
    const err = auth.get('err');
    const errors = [];
    const fieldValues = {
      initialValues: this.state.fieldValues,
    };

    if (auth.get('isError') && err.get('errors')) {
      err.get('errors').map(item =>
        errors.push(
          <div
            key="error"
            className="alert alert-danger"
            role="alert">
            <div className="clearfix"></div>
            { item.get('message') }
          </div>
        )
      );
    }

    switch (auth.get('registrationStep')) {
      case 1:
        if (auth.get('token')) {
          step = <AuthForm disableFields onSubmit={(formData) => this.saveStepOthers(formData)} asyncFunction={(usermail) => this.verifyFields(usermail)} {...fieldValues}/>;
        } else {
          step = <AuthForm disableFields={false} onSubmit={(formData) => this.saveStep1(formData)} asyncFunction={(usermail) => this.verifyFields(usermail)} {...fieldValues} />;
        }
        break;
      case 2:
        step = <PersonalInfoForm backHandler={this.goBack} onSubmit={(formData) => this.saveStepOthers(formData)} {...fieldValues} />;
        break;
      case 3:
        step = <AddressInfoForm backHandler={this.goBack} onSubmit={(formData) => this.saveStepOthersLast(formData)} {...fieldValues} />;
        break;
      default:
        step = <AddressInfoForm backHandler={this.goBack} onSubmit={(formData) => this.saveStepOthers(formData)} {...fieldValues} />;
        break;
    }
    return (
      <div className={styles.registerContainer}>
        <h1>Create your account</h1>
        <div className={styles.registerModule}>
          <div className={styles.step}>
            <h4>Step {auth.get('registrationStep')} of 3</h4>
            {errors}
          </div>
          {step}
        </div>
      </div>
    );
  }
}
