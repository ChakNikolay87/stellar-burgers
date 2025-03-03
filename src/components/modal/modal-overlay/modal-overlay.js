<<<<<<< HEAD
import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

const ModalOverlay = ({ onClick }) => {
	return <div className={styles.modalOverlay} onClick={onClick ? onClick : null}></div>;
};

ModalOverlay.propTypes = {
	onClick: PropTypes.func,
};

export default ModalOverlay;
=======
import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ onClose }) => {
	return <div className={styles.modalOverlay} onClick={onClose ? onClose : null}></div>;
};

ModalOverlay.propTypes = {
	onClose: PropTypes.func,
};

export default ModalOverlay;
>>>>>>> 453cb58 (feat: выполнил задание второго спринта)
