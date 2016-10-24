import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import FormError from './FormError';

export default class RFBSFile extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    data: PropTypes.string,
    handleChange: PropTypes.func,
    onChange: PropTypes.func,
    ...Input.propTypes
  }

  constructor(props) {
    super(props);
    console.log('constructor proPs:', props);
    let img = '';
    if ( props.data !== null ) {
      img = props.data;
    }
    this.state = {
      file: '',
      imagePreviewUrl: img
    };
  }

  changeHandler = (evt) => {
    const {field} = this.props;
    const files = [...evt.target.files];
    console.log('files: ', files);
    const reader = new FileReader();
    const file = evt.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });

      if (this.props.onChange) {
        this.props.onChange(field.name, this.state.file, this.state.file);
      }
    };
    reader.readAsDataURL(file);
    console.log('file path:', reader);
  }

  render() {
    const {field} = this.props;
    const options = {};
    const {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    // console.log('state:', this.state);
    // console.log('value:', this.props.value);
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} className="img-responsive"/>);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    if (field.touched) {
      if (field.error) {
        options.bsStyle = 'error';
      } else {
        options.bsStyle = 'success';
      }
      options.hasFeedback = true;
    }
    return (
      <div>
        <Input {...this.props} field={field} {...options} multiple="true" onChange={this.changeHandler.bind(this)}/>
        <div className="imgPreview">
          {$imagePreview}
        </div>
        <hr/>
        <FormError field={field} />
      </div>
    );
  }
}

