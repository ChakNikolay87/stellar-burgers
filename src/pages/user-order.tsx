import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "./../services/store";
import { useParams } from "react-router-dom";
import Error404Page from "./404";
import Loader from "../components/loader";
import styles from "./ingredient.module.css";
import FeedOrderDetails from "../components/feed-order-dedails/feed-order-dedails";
import { getOrder } from "../services/slices/userOrdersSlice";

const UserOrderPage: FC = () => {
  const { id } = useParams();

  const { ingredients, isLoading, error } = useSelector(
    (store) => store.ingredients
  );
  const { orders, selectedOrder, isSelectedOrderLoading } = useSelector(
    (store) => store.userOrders
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder(Number(id)));
  }, []);

  return (
    <>
      {(isLoading || isSelectedOrderLoading) && <Loader />}
      {error && `Произошла ошибка: ${error}`}
      {!isLoading &&
        !selectedOrder &&
        !error &&
        ingredients.length > 0 &&
        orders.length > 0 && <Error404Page />}
      {!isLoading && !error && ingredients.length > 0 && selectedOrder && (
        <div className={styles.container}>
          <div className={styles.box}>
            <FeedOrderDetails order={selectedOrder} />
          </div>
        </div>
      )}
    </>
  );
};

export default UserOrderPage;
