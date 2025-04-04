import { useMemo } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import DraggableConstructorElement from "./draggable-constructor-element/draggable-constructor-element";
import DropTarget from "../drop-target/drop-target";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "./../../services/slices/orderSlice";
import { openModal, closeModal } from "./../../services/slices/modalSlice";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { resetConstructor } from "./../../services/slices/constructorSlice";

const BurgerConstructor = (props) => {
  const dispatch = useDispatch();
  const { constructorIngredients, bun } = useSelector(
    (store) => store.constructorStore
  );
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleClick = () => {
    if (bun && constructorIngredients.length > 0) {
      if (user) {
        dispatch(getOrder([bun, ...constructorIngredients, bun]));
        dispatch(openModal({ type: "ORDER_DETAILS" }));
      } else {
        navigate("/login");
      }
    }
  };

  const handleModalClose = () => {
    dispatch(closeModal());
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

  const mainList = constructorIngredients.map((ingredient) => {
    const { id } = ingredient;
    return (
      <li className={styles.listItem} key={id}>
        <DropTarget id={id}>
          <DraggableConstructorElement {...ingredient} />
        </DropTarget>
      </li>
    );
  });

  return (
    <div className={styles.wrapper}>
      <Formik
        initialValues={{
          constructorIngredients: constructorIngredients,
          bun: bun,
        }}
        onSubmit={(values, { resetForm }) => {
          handleClick();
          resetForm({
            values: {
              constructorIngredients: [],
              bun: null,
            },
          });

          dispatch(resetConstructor());
        }}
      >
        {({ isSubmitting }) => (
          <Form>
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
                    className={
                      styles.bunPlaceholder + " " + styles.bunPlaceholderTop
                    }
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
                      <div className={styles.mainPlaceholder}>
                        Выберите начинку
                      </div>
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
                {totalPrice} <CurrencyIcon type="primary" />
              </span>
            </div>

            <Button
              type="primary"
              size="large"
              htmlType="submit"
              disabled={isSubmitting}
            >
              Оформить заказ
            </Button>
          </Form>
        )}
      </Formik>

      <Modal onClose={handleModalClose} />
    </div>
  );
};

export default BurgerConstructor;
