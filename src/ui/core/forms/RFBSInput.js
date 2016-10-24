import React, { Component, PropTypes } from 'react';
// import { Input } from 'react-bootstrap';
import FormError from './FormError';
import Input from 'react-toolbox/lib/input';

export class RFBSInput extends Component {
  static propTypes = {
    field: PropTypes.object,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    handleChange: PropTypes.func,
    checked: PropTypes.bool,
    ...Input.propTypes
  }

  changeHandler = () => {
    const { field, type, value } = this.props;
    const props = { type: type, name: field.name, value: value };
    this.props.handleChange(props);
  }

  render() {
    const { type } = this.props;
    const options = {};
    let field = {};

    if (this.props.field) {
      field = Object.assign(field, this.props.field);

      if (field.touched && type !== 'radio') {
        if (field.error) {
          options.bsStyle = 'error';
        } else {
          options.bsStyle = 'success';
        }
      }

      if (this.props.handleChange) {
        field.onChange = () => {
          this.changeHandler();
        };
      }

      options.hasFeedback = true;
    }
    // <Input {...this.props} {...field} {...options} checked={ this.props.checked } />
    // <Input type="text" label="Name" name="name" />
    return (
      <div>
        <Input {...this.props} {...field} {...options} checked={ this.props.checked } />
        <FormError field={field} />
      </div>
    );
  }
}
