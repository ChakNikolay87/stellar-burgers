import React from "react";
import PropTypes from "prop-types";
import { ingredientListShape } from "../../../utils/propTypesShapes";
import IngredientItem from "../ingredient-item/ingredient-item";
import styles from "./ingredients-group.module.css";
import { v4 as uuidv4 } from "uuid";

const IngredientsGroup = React.forwardRef((props, ref) => {
  const ingredientsWithUUID = props.ingredients.map((ingredient) => ({
    ...ingredient,
    uuid: ingredient._id || uuidv4(),
  }));

  return (
    <>
      <span
        className={`${styles.tabName} text text_type_main-medium mb-6`}
        ref={ref}
      >
        {props.title}
      </span>

      <ul className={styles.list}>
        {ingredientsWithUUID.map((ingredient) => (
          <li className={styles.listItem} key={ingredient.uuid}>
            <IngredientItem ingredient={ingredient} />
          </li>
        ))}
      </ul>
    </>
  );
});

IngredientsGroup.propTypes = {
  ingredients: ingredientListShape.isRequired,
  title: PropTypes.string,
};

export default IngredientsGroup;
