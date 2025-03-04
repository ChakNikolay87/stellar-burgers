import { v4 as uuidv4 } from "uuid";
import IngredientDetails from "../burger-ingredients/ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import React from "react";

const ModalContent = React.memo(({ modalType, modalData }) => {
  const uniqueKey = uuidv4();

  switch (modalType) {
    case "INGREDIENT_DETAILS":
      return <IngredientDetails key={uniqueKey} ingredient={modalData} />;
    case "ORDER_DETAILS":
      return <OrderDetails key={uniqueKey} />;
    default:
      return null;
  }
});

export default ModalContent;
