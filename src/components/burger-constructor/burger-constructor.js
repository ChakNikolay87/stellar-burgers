import { useMemo } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import DraggableConstructorElement from "./draggable-constructor-element/draggable-constructor-element";
import DropTarget from "../drop-target/drop-target";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "./../../services/slices/orderSlice";
import { openModal } from "./../../services/slices/modalSlice";
import { v4 as uuidv4 } from "uuid";

const BurgerConstructor = (props) => {
  const dispatch = useDispatch();
  const { constructorIngredients, bun } = useSelector((store) => {
    return store.constructorStore;
  });

  const handleClick = () => {
    if (bun && constructorIngredients.length > 0) {
      dispatch(getOrder([bun, ...constructorIngredients, bun]));
      dispatch(openModal({ type: "ORDER_DETAILS" }));
    }
  };

  const totalPrice = useMemo(() => {
    let totalPrice = 0;
    totalPrice = bun ? totalPrice + bun.price * 2 : totalPrice;
    totalPrice = constructorIngredients.reduce(
      (acc, item) => acc + item.price,
      totalPrice
    );
    return totalPrice;
  }, [bun, constructorIngredients]);

  const mainList = constructorIngredients.map((ingredient, index) => {
    const { id } = ingredient;
    return (
      <li className={styles.listItem} key={uuidv4()}>
        {" "}
        {/* Используем uuid для key */}
        <DropTarget id={id}>
          <DraggableConstructorElement {...ingredient} />
        </DropTarget>
      </li>
    );
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.constructorIngredients}>
        {bun ? (
          <div className={`${styles.constructorElementWrapper}`}>
            <DropTarget type="bun">
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
                key={bun.id + "_0"}
              />
            </DropTarget>
          </div>
        ) : (
          <DropTarget type="bun">
            <div
              className={styles.bunPlaceholder + " " + styles.bunPlaceholderTop}
            >
              Выберите булки
            </div>
          </DropTarget>
        )}

        <ul className={styles.list}>
          {mainList.length ? (
            mainList
          ) : (
            <li className={styles.listItem}>
              <DropTarget id={0}>
                <div className={styles.mainPlaceholder}>Выберите начинку</div>
              </DropTarget>
            </li>
          )}
        </ul>

        {bun ? (
          <div className={styles.constructorElementWrapper}>
            <DropTarget type="bun">
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
                key={bun.id + "_1"}
              />
            </DropTarget>
          </div>
        ) : (
          <DropTarget type="bun">
            <div
              className={
                styles.bunPlaceholder + " " + styles.bunPlaceholderBottom
              }
            >
              Выберите булки
            </div>
          </DropTarget>
        )}
      </div>
      <div className={`${styles.orderSummary} mt-10`}>
        <span
          className={`${styles.orderTotal} digittext text_type_digits-medium`}
        >
          {totalPrice} <CurrencyIcon />
        </span>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleClick}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
