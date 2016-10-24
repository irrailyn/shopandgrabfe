import React, {Component, PropTypes} from 'react';
import {Input} from 'react-bootstrap';

export default class RBSInput extends Component {

  static propTypes = {
    field: PropTypes.object,
    ...Input.propTypes
  }
  render() {
    const {field} = this.props;
    const options = {};

    return (
      <div>
        <Input {...this.props} {...field} {...options} />
      </div>
    );
  }
}


