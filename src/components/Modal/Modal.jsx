import { Component } from 'react';
import { createPortal } from 'react-dom';

import PropTyps from 'prop-types';
import styles from './modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', ({ code }) => {
      if (code === 'Escape') {
        this.props.close();
      }
    });
  }

  closeModal = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      this.props.close();
    }
  };

  render() {
    const { children, close } = this.props;
    const { closeModal } = this;
    return createPortal(
      <div className={styles.overlay} onClick={closeModal}>
        <div className={styles.modal}>
          <button type="button" className={styles.close} onClick={close}>
            X
          </button>
          {children}
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propeTypes = {
  children: PropTyps.node,
  close: PropTyps.func,
};
