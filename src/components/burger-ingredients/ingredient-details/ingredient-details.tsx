import { v4 as uuidv4 } from "uuid";
import { FC } from "react";
import styles from "./ingredients-details.module.css";
import { TIngredientWithID } from "../../../services/types/data";

interface IIngredientDetailsProps {
  ingredient: TIngredientWithID;
}

const IngredientDetails: FC<IIngredientDetailsProps> = ({ ingredient }) => {
  const { name, calories, proteins, fat, carbohydrates } = ingredient;

  return (
    <>
      <img
        className={styles.modalImage}
        src={ingredient.image_large}
        alt={name}
        key={uuidv4()}
      />
      <span
        className={`${styles.modalName} text text_type_main-medium mb-8 mt-4`}
      >
        {name}
      </span>
      <ul
        className={`${styles.list} text text_type_main-default text_color_inactive`}
      >
        <li key={uuidv4()}>
          Калории,ккал
          <span className="text text_type_digits-default mt-1">{calories}</span>
        </li>
        <li key={uuidv4()}>
          Белки,&nbsp;г
          <span className="text text_type_digits-default mt-1">{proteins}</span>
        </li>
        <li key={uuidv4()}>
          Жиры,&nbsp;г
          <span className="text text_type_digits-default mt-1">{fat}</span>
        </li>
        <li key={uuidv4()}>
          Углеводы,&nbsp;г
          <span className="text text_type_digits-default mt-1">
            {carbohydrates}
          </span>
        </li>
      </ul>
    </>
  );
};

export default IngredientDetails;
