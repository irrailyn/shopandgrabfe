import React, {Component} from 'react';
import { Link } from 'react-router';
import styles from './Register.less';

export default class RegistrationSuccess extends Component {
  render() {
    return (
      <div className={styles.registerContainer}>
        <div className={styles.registerModule}>
          <div className="text-center">
            <h1>Registration Success!</h1>
            <h4>We'll send you an email shortly for validation.</h4>
            <h2><Link to="/"><i className={`fa fa-home`} /></Link></h2>
          </div>
        </div>
      </div>
    );
  }
}
