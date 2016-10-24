import React, {Component, PropTypes} from 'react';
import { Row, Col } from 'react-bootstrap';
import LogoutButton from './LogoutButton';
import styles from './Toolbar.less';

export default class Toolbar extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    handleLogout: PropTypes.func
  };

  handleLogout() {
    window.FB.logout(function mess(response) {
      console.log('response:', response);
    });
  }

  render() {
    return (
      <Row>
        <Col xs={12} className={styles.container}>
          <div className={styles.leftContainer}>
            <button onClick={this.props.onToggle}><i className="fa fa-bars" /></button>
          </div>

          <div className={styles.rightContainer}>
            <div className={styles.item}>
              <p>Hello, {this.props.auth.get('user').get('firstName')} {this.props.auth.get('user').get('lastName')}</p>
            </div>
            <div className={styles.item}>
              {(this.props.auth.get('isLoggedIn')) ? <LogoutButton onLogout={this.props.onLogout} /> : null }
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}
