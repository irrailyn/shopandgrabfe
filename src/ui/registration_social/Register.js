import React, {Component} from 'react';
import RegisterSocialForm from './forms/RegisterSocialForm';
import styles from './Register.less';

export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fieldValues: {}
    };
  }

  render() {
    const fieldValues = {
      initialValues: this.state.fieldValues,
    };
    return (
      <div className={styles.registerContainer}>
        <h1>Create your account</h1>
        <div className={styles.registerModule}>
          <RegisterSocialForm {...fieldValues} />
        </div>
      </div>
    );
  }
}
