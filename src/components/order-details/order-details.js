import doneImagePath from "../../images/done.png";
import styles from "./order-details.module.css";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const OrderDetails = () => {
  const { orderId, isLoading, error } = useSelector((store) => {
    return store.order;
  });

  return (
    <div className={`${styles.modalContent} pt-15 pb-15`}>
      {!isLoading && !error ? (
        <>
          <span
            className={`${styles.orderId} text text_type_digits-large mb-8`}
            key={uuidv4()}
          >
            {orderId}
          </span>
          <span className="text text_type_main-medium" key={uuidv4()}>
            идентификатор заказа
          </span>
          <img
            className={`${styles.modalImage} mt-15 mb-15`}
            src={doneImagePath}
            alt="Заказ принят"
            key={uuidv4()}
          />
          <span className="text text_type_main-default mb-2" key={uuidv4()}>
            Ваш заказ начали готовить
          </span>
          <span
            className="text text_type_main-default text_color_inactive"
            key={uuidv4()}
          >
            Дождитесь готовности на орбитальной станции
          </span>
        </>
      ) : error ? (
        <span className={`text text_type_main-large mb-8`} key={uuidv4()}>
          Произошла ошибка: {error.message}
        </span>
      ) : (
        <span className={`text text_type_main-large mb-8`} key={uuidv4()}>
          Загрузка...
        </span>
      )}
    </div>
  );
};

export default OrderDetails;
