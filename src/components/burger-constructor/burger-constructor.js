import React, { useState } from 'react';
import {
	ConstructorElement,
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { orderListShape } from '../../utils/propTypesShapes';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

const BurgerConstructor = (props) => {
	const [modalVisible, setModalVisible] = useState(false);

	const handleClick = () => {
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	const getTotalPrice = () => {
		const order = props.order;

		const total = order.reduce((totalPrice, item) => {
			if (item.type === 'bun') {
				return totalPrice + item.price * 2;
			} else {
				return totalPrice + item.price * item.count;
			}
		}, 0);
		return total;
	};

	const minus = (ingredient) => {
		props.updateOrder({
			...ingredient,
			count: ingredient.count - 1,
		});
	};

	const bun = props.order.filter((item) => item.type === 'bun')[0];

	return (
		<div className={styles.wrapper}>
			<div className={styles.constructorIngredients}>
				{bun && (
					<div className={`${styles.constructorElementWrapper} mb-4`}>
						<ConstructorElement
							type="top"
							isLocked={true}
							text={`${bun.name} (верх)`}
							price={bun.price}
							thumbnail={bun.image}
							key={bun._id + '_0'}
						/>
					</div>
				)}

				<ul className={styles.list}>
					{props.order
						.filter((item) => item.type !== 'bun')
						.map((ingredient) => {
							return Array.from({ length: ingredient.count }, (_, index) => (
								<li className={styles.listItem} key={ingredient._id + `_${index}`}>
									<span className={styles.dragBtn}></span>
									<ConstructorElement
										text={ingredient.name}
										price={ingredient.price}
										thumbnail={ingredient.image}
										handleClose={() => minus(ingredient)}
									/>
								</li>
							));
						})}
				</ul>

				{bun && (
					<div className={styles.constructorElementWrapper}>
						<ConstructorElement
							type="bottom"
							isLocked={true}
							text={`${bun.name} (низ)`}
							price={bun.price}
							thumbnail={bun.image}
							key={bun._id + '_1'}
						/>
					</div>
				)}
			</div>

			<div className={`${styles.orderSummary} mt-10`}>
				<span className={`${styles.orderTotal} digittext text_type_digits-medium`}>
					{getTotalPrice()} <CurrencyIcon />
				</span>
				<Button htmlType="button" type="primary" size="medium" onClick={handleClick}>
					Оформить заказ
				</Button>
				{modalVisible && (
					<Modal closeModal={closeModal}>
						<OrderDetails orderId="034536" />
					</Modal>
				)}
			</div>
		</div>
	);
};

BurgerConstructor.propTypes = {
	order: orderListShape.isRequired,
	updateOrder: PropTypes.func.isRequired,
};

export default BurgerConstructor;
