<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { getRandomInt } from '../../utils/utils';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
	const [loadingState, setLoadingState] = useState({
		isLoading: false,
		hasError: false,
	});
	const [ingredients, setIngredients] = useState([]);
	const [order, setOrder] = useState([]);
	const [page, setPage] = useState('Конструктор');

	useEffect(() => {
		setLoadingState({ ...loadingState, hasError: false, isLoading: true });

		fetch(API_URL)
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					return Promise.reject(res);
				}
			})
			.then((data) => {
				setLoadingState({ ...loadingState, isLoading: false });
				setIngredients(data.data);
			})
			.catch((e) => {
				console.log(e.message);
				setLoadingState({ ...loadingState, hasError: true, isLoading: false });
			});
	}, []);

	useEffect(() => {
		generateRandomOrder({});
	}, [ingredients]);

	const generateRandomOrder = ({ maxIngredients = 10, chance = 0.2, maxSameIngredient = 2 }) => {
		if (ingredients.length && !order.length) {
			const ingredientsCopy = [...ingredients];

			const bunList = ingredientsCopy.filter((ingredient) => ingredient.type === 'bun');

			const bun = bunList[getRandomInt(0, bunList.length - 1)];
			const order = [{ ...bun, count: 1 }];
			let totalIngredients = 1;

			ingredientsCopy
				.filter((ingredient) => ingredient.type !== 'bun')
				.forEach((item, i) => {
					if (getRandomInt(0, 100) <= chance * 100 && totalIngredients < maxIngredients) {
						let count = getRandomInt(1, maxSameIngredient);
						if (totalIngredients + count > maxIngredients) {
							count = maxIngredients - totalIngredients;
						}
						totalIngredients += count;
						order.push({ ...item, count });
					}
				});

			setOrder(order);
		}
	};

	const updateOrder = (ingredient) => {
		const index = order.findIndex((item) => item._id === ingredient._id);

		let newOrder = [...order];

		if (index !== -1) {
			if (ingredient.count <= 0) {
				newOrder.splice(index, 1);
			} else {
				newOrder[index] = {
					...ingredient,
					count: ingredient.type === 'bun' ? 1 : ingredient.count,
				};
			}
		} else {
			if (ingredient.type === 'bun') {
				newOrder = newOrder.filter((item) => item.type !== 'bun');
			}
			newOrder.push({ ...ingredient, count: 1 });
		}

		setOrder(newOrder);
	};

	return (
		<>
			<AppHeader onMenuClick={setPage} activeMenuItem={page} />
			{page === 'Конструктор' && loadingState.isLoading && 'Загрузка...'}
			{page === 'Конструктор' && loadingState.hasError && 'Произошла ошибка'}
			{page === 'Конструктор' &&
				!loadingState.isLoading &&
				!loadingState.hasError &&
				ingredients.length && (
					<main className={styles.mainContainer}>
						<BurgerIngredients
							ingredients={ingredients}
							order={order}
							updateOrder={updateOrder}
						/>
						<BurgerConstructor order={order} updateOrder={updateOrder} />
					</main>
				)}
			{page === 'Личный кабинет' && <span>Пока такой страницы нет :(</span>}
			{page === 'Лента заказов' && <span>Пока такой страницы нет :(</span>}
		</>
	);
};

export default App;
=======
import React, { useState, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Modal from '../modal/modal';
import { closeModal } from '../../services/slices/modalSlice';

const App = () => {
	const dispatch = useDispatch();
	const { ingredients, isLoading, error } = useSelector((store) => store.ingredients);

	useEffect(() => {
		dispatch(getIngredients());
	}, []);

	const [page, setPage] = useState('Конструктор');

	const handleModalClose = () => {
		dispatch(closeModal());
	};

	return (
		<>
			<Modal onClose={handleModalClose} />
			<AppHeader onMenuClick={setPage} activeMenuItem={page} />
			{page === 'Конструктор' && isLoading && 'Загрузка...'}
			{page === 'Конструктор' && error && `Произошла ошибка: ${error.message}`}
			{page === 'Конструктор' && !isLoading && !error && ingredients.length && (
				<main className={styles.mainContainer}>
					<DndProvider backend={HTML5Backend}>
						<BurgerIngredients />
						<BurgerConstructor />
					</DndProvider>
				</main>
			)}
			{page === 'Личный кабинет' && <span>Пока такой страницы нет :(</span>}
			{page === 'Лента заказов' && <span>Пока такой страницы нет :(</span>}
		</>
	);
};

export default App;
>>>>>>> 453cb58 (feat: выполнил задание второго спринта)
