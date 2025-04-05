import React from "react";
import IngredientDetails from "../burger-ingredients/ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { TIngredientWithID } from "../../services/types/data";

interface ModalContentProps {
  modalType: string;
  modalData: TIngredientWithID | null;
}

const ModalContent: React.FC<ModalContentProps> = ({
  modalType,
  modalData,
}) => {
  if (!modalData && modalType === "INGREDIENT_DETAILS") {
    return null;
  }

  const modalMap: { [key: string]: JSX.Element | null } = {
    INGREDIENT_DETAILS: (
      <IngredientDetails ingredient={modalData as TIngredientWithID} />
    ),
    ORDER_DETAILS: <OrderDetails />,
  };

  return modalMap[modalType] || null;
};

export default ModalContent;
