<<<<<<< HEAD
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';

const modalRoot = document.getElementById('react-modals');

const Modal = ({ modalTitle, children, closeModal }) => {
  useEffect(() => {
    const KEYCODE_ESC = 'Escape';

    const handleKeyPress = (e) => {
      if (e.key === KEYCODE_ESC) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [closeModal]);

  const modal = (
    <>
      <div className={styles.modalContainer}>
        <ModalOverlay onClick={closeModal} />
        <div className={`${styles.modal} p-10 pb-15`}>
          <span className={styles.modalClose} onClick={closeModal}></span>
          <span className={`${styles.modalTitle} text text_type_main-large`}>
            {modalTitle}
          </span>
          <div className={styles.modalContent}>{children}</div>
        </div>
      </div>
    </>
  );

  return ReactDOM.createPortal(modal, modalRoot);
};

Modal.propTypes = {
  modalTitle: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;
=======
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { useSelector } from 'react-redux';
import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

const modalRoot = document.getElementById('react-modals');

const KEYCODE_ESC = 'Escape';

const Modal = ({ onClose }) => {
	const { isOpen, modalType, modalData, modalTitle } = useSelector((store) => {
		return store.modal;
	});

	const handleKeyPress = (e) => {
		if (e.key === KEYCODE_ESC) {
			onClose();
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyPress);

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [onClose]);

	const modalContent = () => {
		switch (modalType) {
			case 'INGREDIENT_DETAILS':
				return <IngredientDetails ingredient={modalData} />;
			case 'ORDER_DETAILS':
				return <OrderDetails />;
			default:
				return null;
		}
	};

	const modal = isOpen ? (
		<div className={styles.modalContainer}>
			<ModalOverlay onClose={onClose} />

			<div className={`${styles.modal} p-10 pb-15`}>
				<span className={styles.modalClose} onClick={onClose}></span>
				<span className={`${styles.modalTitle} text text_type_main-large`}>
					{modalTitle}
				</span>
				<div className={styles.modalContent}>{modalContent()}</div>
			</div>
		</div>
	) : null;

	return ReactDOM.createPortal(modal, modalRoot);
};

Modal.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export default Modal;
>>>>>>> 453cb58 (feat: выполнил задание второго спринта)
