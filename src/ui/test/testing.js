import React, { Component, PropTypes } from 'react';
import TestForm from './testForm';
import styles from './test.less';
import { connect } from 'react-redux';
import { verifyUserMail } from 'redux/modules/auth';

@connect(
  state => ({auth: state.auth}),
  { verifyUserMail }
)

export default class testing extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    verifyUserMail: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  testSubmit = (formData) => {
    console.log('verifyUserMail:', formData);
    this.props.verifyUserMail(formData);
  }

  testAsync = (usermail) =>{
    return this.props.verifyUserMail(usermail);
  }

  render() {
    return (
      <div className={styles.registerContainer}>
        <h1>test async</h1>
        <div className={styles.registerModule}>
          <TestForm onSubmit={ this.testSubmit.bind(this) } checkInput={(usermail) => this.testAsync(usermail)}/>
        </div>
      </div>
    );
  }
}
