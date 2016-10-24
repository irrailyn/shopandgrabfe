import React, {Component, PropTypes} from 'react';

export default class FormError extends Component {

  static propTypes = {
    field: PropTypes.object.isRequired
  };

  render() {
    const {field} = this.props;
    let component = null;
    console.log('field error:', field.error);

    if (field.error && field.touched) {
      component = (
        <div className="errorMessages">
          { field.error.map( (err, index) => <small className="errorLabel" key={index}>{err}</small> ) }
        </div>
      );
    }

    return component;
  }
}
