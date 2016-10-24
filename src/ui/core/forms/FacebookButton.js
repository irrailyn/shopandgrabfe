import React, {Component, PropTypes} from 'react';

export default class FacebookButton extends Component {
  static propTypes = {
    fb: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
    console.log('PROPS:', props);
    this.FB = props.fb;
    this.state = {
      message: ''
    };
  }
  componentDidMount() {
    this.FB.Event.subscribe('auth.logout',
      this.onLogout.bind(this));
    this.FB.Event.subscribe('auth.statusChange',
      this.onStatusChange.bind(this));
  }
  onStatusChange(response) {
    console.log( response );
    if ( response.status === 'connected' ) {
      this.FB.api('/me', function feed(feedback) {
        const message = 'Welcome ' + feedback.name;
        this.setState({
          message: message
        });
      });
    }
  }

  onLogout(response) {
    console.log(response);
    this.setState({
      message: ''
    });
  }

  render() {
    return (
       <div>
          <div
            className="fb-login-button"
            data-max-rows="1"
            data-size="xlarge"
            data-show-faces="false"
            data-auto-logout-link="true"
          >
          </div>
          <div>{this.state.message}</div>
      </div>
    );
  }
}
