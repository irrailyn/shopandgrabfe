import React, {Component, PropTypes} from 'react';
import {Input} from 'react-bootstrap';
import FormError from './FormError';
// import Input from 'react-toolbox/lib/input';

export default class RFBSInput extends Component {

  static propTypes = {
    field: PropTypes.object.isRequired,
    ...Input.propTypes
  }

  render() {
    const {field} = this.props;
    const options = {};

    if (field.touched) {
      if (field.error) {
        options.bsStyle = 'error';
      } else {
        options.bsStyle = 'success';
      }
      options.hasFeedback = true;
    }
    // <Input {...this.props} {...field} {...options} />
    // <Input type="text" label="Name" name="name" maxLength={16 } />
    return (
      <div>
        <Input {...this.props} {...field} {...options} />
        <FormError field={field} />
      </div>
    );
  }
}
