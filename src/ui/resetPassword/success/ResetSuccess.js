import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './resetPasswordSuccess.less';

@connect(
  state => ({ routing: state.routing })
)
export default class ResetSuccess extends Component {
  static propTypes = {
    routing: PropTypes.object.isRequired
  }

  render() {
    const { routing } = this.props;
    const query = routing.location.query;
    let message = 'Password changed successfully!';

    if (query && query.option) {
      switch (query.option) {
        case 'email':
          message = 'Link sent to email successfully!';
          break;

        // case 'otp':
        //   message = 'Link sent to email successfully!';
        //   break;

        default:
          break;
      }
    }

    return (
      <div className={ styles.successContainer }>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-12 col-xs-offset-0">
              <div className="alert alert-success">
                { message }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
