import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { registerCompany, registerIndividual } from 'redux/modules/auth';
import CompanyForm from './forms/CompanyForm';
import IndividualForm from './forms/IndividualForm';
import styles from './Registerv3.less';

@connect(
  state => ({auth: state.auth}),
  {registerCompany, registerIndividual}
)

export default class Register extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    registerCompany: PropTypes.func,
    registerIndividual: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      activeTabClassName: 'company'
    };
  }
  formCompany = () => {
    this.setState({ activeTabClassName: 'company' });
  }

  formIndividual = () => {
    this.setState({ activeTabClassName: 'individual' });
  }

  formCompanySubmit = (formData) => {
    console.log('went in form company');
    this.props.registerCompany(formData);
    this.setState({ activeTabClassName: 'company' });
  }

  formIndividualSubmit = (formData) => {
    console.log('went in formIndividualSubmit');
    this.props.registerCompany(formData);
    this.setState({ activeTabClassName: 'individual' });
  }

  render() {
    let form;
    // console.log('REGISTER:', auth.get('registrationv3'));
    // console.log('STATE:', this.state);
    switch (this.state.activeTabClassName) {
      case 'company':
        form = <CompanyForm onSubmit={(formData) => this.formCompanySubmit(formData)} />;
        break;
      case 'individual':
        form = <IndividualForm onSubmit={(formData) => this.formIndividualSubmit(formData)} />;
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
            {form}
          </div>
        </div>
      </div>
    );
  }
}
