<<<<<<< HEAD
import React from 'react';
import PropTypes from 'prop-types';
import doneImagePath from '../../images/done.png';
import styles from './order-details.module.css';

const OrderDetails = ({ orderId }) => {
	return (
		<div className={`${styles.modalContent} pt-15 pb-15`}>
			<span className={`${styles.orderId} text text_type_digits-large mb-8`}>{orderId}</span>
			<span className="text text_type_main-medium">идентификатор заказа</span>
			<img
				className={`${styles.modalImage} mt-15 mb-15`}
				src={doneImagePath}
				alt="Заказ принят"
			/>
			<span className="text text_type_main-default mb-2">Ваш заказ начали готовить</span>
			<span className="text text_type_main-default text_color_inactive">
				Дождитесь готовности на орбитальной станции
			</span>
		</div>
	);
};

OrderDetails.propTypes = {
	orderId: PropTypes.string.isRequired,
};

export default OrderDetails;
=======
import React from 'react';
import PropTypes from 'prop-types';
import doneImagePath from '../../images/done.png';
import styles from './order-details.module.css';
import { useSelector } from 'react-redux';

const OrderDetails = () => {
	const { orderId, isLoading, error } = useSelector((store) => {
		return store.order;
	});

	return (
		<div className={`${styles.modalContent} pt-15 pb-15`}>
			{!isLoading && !error ? (
				<>
					<span className={`${styles.orderId} text text_type_digits-large mb-8`}>
						{orderId}
					</span>
					<span className="text text_type_main-medium">идентификатор заказа</span>
					<img
						className={`${styles.modalImage} mt-15 mb-15`}
						src={doneImagePath}
						alt="Заказ принят"
					/>
					<span className="text text_type_main-default mb-2">
						Ваш заказ начали готовить
					</span>
					<span className="text text_type_main-default text_color_inactive">
						Дождитесь готовности на орбитальной станции
					</span>
				</>
			) : error ? (
				<span className={`text text_type_main-large mb-8`}>
					Произошла ошибка: {error.message}
				</span>
			) : (
				<span className={`text text_type_main-large mb-8`}>Загрузка...</span>
			)}
		</div>
	);
};

export default OrderDetails;
>>>>>>> 453cb58 (feat: выполнил задание второго спринта)
