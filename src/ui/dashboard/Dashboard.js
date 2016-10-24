import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


@connect(
  state => ({auth: state.auth})
)

export default class Dashboard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  render() {
    const { auth } = this.props;
    const userObj = auth.toJS();
    return (
      <div>
        <h1>Dashboard</h1>
        <div className="row">
          <div className="image col-md-2">
              <img src={userObj.user.avatarImageUrl.raw} alt="" className="img-responsive center-block" />
          </div>
          <div className="col-md-10">
            <div className="col-md-8">
              <h3>{userObj.user.firstName} {userObj.user.lastName}</h3>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}
