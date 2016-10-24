import React, {Component, PropTypes} from 'react';
import {Modal, Button} from 'react-bootstrap';
export default class GenModal extends Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    header: PropTypes.string,
    body: PropTypes.string,
    confirmLabel: PropTypes.string,
    confirmHandler: PropTypes.func,
    cancelLabel: PropTypes.string,
    cancelHandler: PropTypes.func.isRequired
  }

  clickConfirm = () => {
    this.props.confirmHandler();
  }

  clickCancel = () => {
    this.props.cancelHandler();
  }

  render() {
    let header;
    let body;
    let confirm;
    let cancel;

    if (this.props.header) {
      header = <Modal.Header><h3>{this.props.header}</h3></Modal.Header>;
    }

    if (this.props.body) {
      body = <Modal.Body><p>{this.props.body}</p></Modal.Body>;
    }

    if (this.props.confirmHandler) {
      confirm = <Button bsStyle="primary" onClick={this.clickConfirm}>{(this.props.confirmLabel) ? this.props.confirmLabel : 'Confirm'}</Button>;
    }

    if (this.props.cancelHandler) {
      cancel = <Button bsStyle="danger" onClick={this.clickCancel}>{(this.props.cancelLabel) ? this.props.cancelLabel : 'Cancel'}</Button>;
    }

    return (
      <Modal
        show={this.props.open}
        dialogClassName="text-center"
      >
        {header}{body}
        <Modal.Footer>
          {cancel}{confirm}
        </Modal.Footer>
      </Modal>
    );
  }
}

