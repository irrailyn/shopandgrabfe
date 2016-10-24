import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { registerCompany, registerIndividual, registerRedirectLogin, switchCompany, switchIndividual, fileImageUpload, verifyUserMail } from 'redux/modules/auth';
import CompanyForm from './forms/CompanyForm';
import IndividualForm from './forms/IndividualForm';
import styles from './Register.less';

@connect(
  state => ({auth: state.auth}),
  { registerCompany, registerIndividual, registerRedirectLogin, switchCompany, switchIndividual, fileImageUpload, verifyUserMail }
)

export default class Register extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    registerRedirectLogin: PropTypes.func,
    registerCompany: PropTypes.func,
    registerIndividual: PropTypes.func,
    switchCompany: PropTypes.func,
    switchIndividual: PropTypes.func,
    fileImageUpload: PropTypes.func,
    verifyUserMail: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      activeTabClassName: 'company',
      fieldValues: {},
      fieldIgnore: {
        passwordRepeat: true,
        agreement: true
      }
    };
  }
  componentWillReceiveProps = (nextProps) => {
    const redirectLogin = nextProps.auth.get('registerRedirect');
    if (redirectLogin) {
      this.setState({ fieldValues: {}});
      this.props.registerRedirectLogin();
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

  formCompany = () => {
    this.setState({ activeTabClassName: 'company' });
    this.props.switchCompany();
  }

  formIndividual = () => {
    this.setState({ activeTabClassName: 'individual' });
    this.props.switchIndividual();
  }

  formCompanySubmit = (formData) => {
    console.log('went in form company');
    const avatar = formData.avatarImageUrl;
    delete formData.avatarImageUrl;
    formData.userName = formData.businessName;
    formData.status = 'ACTIVE';
    const data = this.parseFormData(formData);
    console.log('Company Data: ', data);
    console.log('avatar', avatar);
    this.props.registerCompany(data).then( (response) => {
      console.log('SUCCESS!! perform image upload here: ', response);
      this.props.fileImageUpload(avatar, response.token);
    });
    this.setState({
      activeTabClassName: 'company',
      fieldValues: {}
    });
  }

  formIndividualSubmit = (formData) => {
    console.log('went in formIndividualSubmit');
    const avatar = formData.avatarImageUrl;
    delete formData.avatarImageUrl;
    formData.userName = formData.firstName;
    formData.status = 'ACTIVE';
    const data = this.parseFormData(formData);
    console.log('Individual Data: ', data);
    console.log('avatar', avatar);
    this.props.registerIndividual(data).then( (response) => {
      console.log('SUCCESS!! perform image upload here: ', response);
      this.props.fileImageUpload(avatar, response.token);
    });
    this.setState({
      activeTabClassName: 'individual',
      fieldValues: {}
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
    let form;
    // console.log('REGISTER:', auth.get('registrationv3'));
    // console.log('STATE:', this.state);
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
    switch (this.state.activeTabClassName) {
      case 'company':
        form = <CompanyForm onSubmit={this.formCompanySubmit.bind(this)} {...fieldValues} />;
        break;
      case 'individual':
        form = <IndividualForm asyncFunction={(usermail) => this.verifyFields(usermail)} onSubmit={(formData) => this.formIndividualSubmit(formData)} {...fieldValues} />;
        break;
      default:
        form = <CompanyForm />;
    }

    return (
      <div className={styles.registerContainer}>
        <h1>Create your account</h1>
        <div className="clearfix"></div>
        <div className={styles.registerModule}>
          <div className={styles.step}>
            <ul className={styles.navsty + ' nav navbar-nav col-md-12 no-pad'}>
              <li className={(this.state.activeTabClassName === 'company') ? 'active col-md-6 nav-item' : 'col-md-6 nav-item'}>
                <a className={(this.state.activeTabClassName === 'company') ? 'active nav-link text-center' : 'nav-link text-center'} onClick={this.formCompany}><h3>Company</h3></a>
              </li>
              <li className={(this.state.activeTabClassName === 'individual') ? 'active col-md-6 nav-item' : 'col-md-6 nav-item'}>
                <a className={(this.state.activeTabClassName === 'individual') ? 'active nav-link text-center' : 'nav-link text-center'} onClick={this.formIndividual}><h3>Individual</h3></a>
              </li>
            </ul>
            <br />
            <br />
            <div className="clearfix"></div>
              {errors}
              {form}
          </div>
        </div>
      </div>
    );
  }
}
