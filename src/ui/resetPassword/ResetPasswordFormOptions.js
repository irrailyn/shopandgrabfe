import React, { Component, PropTypes } from 'react';
import { reduxForm, change } from 'redux-form';
import { RFBSInput as Input } from '../core/forms/RFBSInput';

const form = 'resetPasswordOptionsForm';

@reduxForm({
  form,
  fields: ['action']
},
undefined,
dispatch => {
  return {
    changeFieldValue(field, value) {
      dispatch(change(form, field, value));
    }
  };
})
export default class ResetPasswordFormOptions extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    actions: PropTypes.array.isRequired,
    activeAction: PropTypes.string.isRequired,
    setAction: PropTypes.func.isRequired,
    changeFieldValue: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.changeFieldValue('action', '1');
  }

  handleChange = (event) => {
    const id = event.target.id;
    this.setState({ activeAction: id });
    this.props.changeFieldValue(event.target.name, id);
    this.props.setAction(id);
  }

  render() {
    const { fields: { action }, actions, activeAction } = this.props;

    return (
      <div>
        { actions.map((field, index) =>
          <Input key={ index } field={ action } id={ field.value } type="radio" label={ field.label } value={ field.value } checked={ activeAction === field.value } onClick={ this.handleChange } />
        )
        }
      </div>
    );
  }
}
