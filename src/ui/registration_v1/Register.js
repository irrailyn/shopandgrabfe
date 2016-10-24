import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { registerUserV1, registerRedirectLogin, registerUserV1Avatar, fileImageUpload, verifyUserMail } from 'redux/modules/auth';
import RegistrationForm from './forms/RegistrationForm';
import styles from './Register.less';

@connect(
  state => ({auth: state.auth}),
  { registerUserV1, registerRedirectLogin, registerUserV1Avatar, fileImageUpload, verifyUserMail}
)

export default class Register extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    registerUserV1: PropTypes.func.isRequired,
    registerRedirectLogin: PropTypes.func.isRequired,
    registerUserV1Avatar: PropTypes.func.isRequired,
    fileImageUpload: PropTypes.func.isRequired,
    verifyUserMail: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      fieldValues: {},
      fieldIgnore: {
        passwordRepeat: true,
        agreement: true,
      },
      file: '',
      imagePreviewUrl: ''
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const redirectLogin = nextProps.auth.get('registerRedirect');
    if (redirectLogin) {
      this.setState({ fieldValues: {}});
      this.props.registerRedirectLogin();
    }
  };

  componentDidUpdate = (props) => {
    const update = props.auth.get('registerRedirect');
    if (!update) {
      window.scrollTo(0, 0);
    }
  }

  parseFormData = (formData) => {
    let fieldsUpdate;
    let cleanedData;
    cleanedData = {};
    fieldsUpdate = JSON.parse(JSON.stringify(this.state.fieldValues));
    for ( const key in formData ) {
      if ( formData.hasOwnProperty(key) && formData[key] !== undefined) {
        fieldsUpdate[key] = formData[key];
        if (!this.state.fieldIgnore[key]) {
          cleanedData[key] = formData[key];
        }
      }
    }
    this.setState({fieldValues: fieldsUpdate});
    return cleanedData;
  }

  signUpUser = (formData) => {
    console.log('avatarImageUrl: ', formData.avatarImageUrl);
    const avatar = formData.avatarImageUrl;
    delete formData.avatarImageUrl;
    formData.status = 'ACTIVE';
    const data = this.parseFormData(formData);
    console.log('avatar', avatar);
    this.props.registerUserV1(data).then( (response) => {
      console.log('SUCCESS!! perform image upload here: ', response);
      this.props.fileImageUpload(avatar, response.token);
      this.setState({
        fieldValues: {}
      });
    }).catch( () => {
      console.log('There is something wrong with you');
    });
  }

  verifyFields = (usermail) =>{
    return this.props.verifyUserMail(usermail);
  }

  render() {
    const fieldValues = {
      initialValues: this.state.fieldValues,
    };
    const { auth } = this.props;
    const err = auth.get('err');
    const errors = [];
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

    return (
      <div className={styles.registerContainer}>
        <h1>Create your account</h1>
        <div className={styles.registerModule}>
          <div className="clearfix"></div>
          {errors}
          <RegistrationForm onUpdate={() => window.scrollTo(0, 0)} onSubmit={ this.signUpUser.bind(this) } asyncFunction={(usermail) => this.verifyFields(usermail)} {...fieldValues} />
          <hr/>
        </div>
      </div>
    );
  }
}
