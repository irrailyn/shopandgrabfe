import React, { Component, PropTypes } from 'react';
import validate from 'validate.js';
import { reduxForm, SubmissionError } from 'redux-form';
import { ButtonInput } from 'react-bootstrap';
import { RFBSInput as Input } from '../core/forms/RFBSInput';

const form = 'resetPasswordForm';

@reduxForm({
  form,
  validate: (data, props) => validate(data, props.constraints) || {},
  // asyncValidate: (values, dispatch, props) => {
  //   console.log(props);
  //   return new Promise(() => {
  //     console.log(props);
  //     if (props.activeAction === '2') {
  //       validate({ email: { presence: true } });
  //     }
  //   }).then(() => {
  //     throw new SubmissionError({ phoneNumber: 'Phone Number is required', _error: 'At least one field is required.' });
  //   });
  // },
  // returnRejectedSubmitPromise: true
},
// undefined,
// dispatch => {
//   return {
//     changeFieldValue(field, value) {
//       dispatch(change(form, field, value));
//     }
//   };
// }
)

export default class ResetPasswordForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    // changeFieldValue: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    config: PropTypes.object.isRequired,
    constraints: PropTypes.object.isRequired,
    activeAction: PropTypes.string.isRequired
  }

  // validateField = (eventTarget) => {
  //   const { constraints } = this.props;
  //   const field = {};
  //   field[eventTarget.name] = eventTarget.value;
  //   validate(field, constraints[eventTarget.name]);
  // }
  //
  // handleChange = (event) => {
  //   this.props.changeFieldValue(event.target.name, event.target.value);
  //   this.validateField(event.target);
  // }

  render() {
    const { fields, config, invalid, handleSubmit } = this.props;
    return (
      <form>
        { Object.keys(fields).map(name => {
          const field = fields[name];
          return (<div key={name}>
            <Input field={ field } { ...field } type={ config[name].type } label={ config[name].label } />
          </div>);
        })}
        <ButtonInput type="submit" bsStyle="primary" onClick={ handleSubmit } disabled={ invalid } />
      </form>
    );
  }
}
