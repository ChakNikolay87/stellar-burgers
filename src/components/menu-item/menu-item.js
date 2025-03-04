import React from "react";
import { v4 as uuidv4 } from "uuid";
import menuItem from "./menu-item.module.css";
import PropTypes from "prop-types";

const MenuItem = ({ isActive, handleClick, iconComponent, text }) => {
  const uniqueKey = uuidv4();

  return (
    <div
      onClick={() => handleClick(text)}
      className={[
        "p-5",
        menuItem.menuItem,
        isActive && menuItem.menuItemActive,
      ].join(" ")}
      key={uniqueKey}
    >
      {iconComponent &&
        React.createElement(iconComponent, {
          type: isActive ? "primary" : "secondary",
        })}
      <span className="pl-2">{text}</span>
    </div>
  );
};

MenuItem.propTypes = {
  isActive: PropTypes.bool,
  iconComponent: PropTypes.elementType,
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default MenuItem;
