import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import validate from 'validate.js';
import {ButtonInput} from 'react-bootstrap';
import { RFBSInput as Input } from '../core/forms/RFBSInput';

const constraints = {
  userName: {
    presence: true,
  },
  email: {
    presence: true,
    email: {
      message: 'must be a valid email address'
    }
  }
};

validate.validators.presence.options = {message: 'is required'};

const form = 'test';

const asyncValidate = (values, dispatch, props) => {
  console.log('went in');
  const activeField = props.form._active;
  const forms = props.form;
  const error = {};
  const data = {};

  for ( const key in forms ) {
    if (forms.hasOwnProperty(key) && forms[key] !== undefined) {
      error[key] = forms[key].asyncError;
    }
  }

  data[activeField] = values[activeField];
  return new Promise((resolve, reject) => {
    props.checkInput(data)
    .then((value) => {
      if (!value.isAvailable) {
        error[activeField] = ['This ' + activeField.toLowerCase() + ' is already used'];
      }
      if (Object.keys(error).length !== 0 && error.constructor === Object) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

@reduxForm({
  form,
  fields: ['userName', 'email', 'sampinput'],
  asyncValidate,
  asyncBlurFields: ['userName', 'email'],
  validate: data => validate(data, constraints) || {},
})
export default class test extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    asyncValidating: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  render() {
    const {
      asyncValidating,
      fields: {
        userName,
        email,
        sampinput
      },
      handleSubmit,
    } = this.props;

    return (
      <div>
        <form>
          <Input type="text" label="Username" field={userName} />
          {asyncValidating === 'userName' ? <i className="fa fa-cog fa-spin fa-3x fa-fw" /> : ''}
          <Input type="email" label="Email" field={email} />
          {asyncValidating === 'email' ? '<i className="fa fa-cog fa-spin fa-3x fa-fw" />' : ''}
          <Input type="sampinput" label="Samp Input" field={sampinput} />
          {asyncValidating === 'sampinput' ? '<i className="fa fa-cog fa-spin fa-3x fa-fw" />' : ''}
          <ButtonInput type="submit" bsStyle="primary" onClick={handleSubmit}/>
        </form>
      </div>
    );
  }
}
