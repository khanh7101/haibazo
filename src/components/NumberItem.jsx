import React from "react";

const NumberItem = ({
  item,
  handleClick,
  gameOver,
  clickedItems,
  maxZIndex,
}) => (
  <div
    key={item.number}
    onClick={() => handleClick(item.number)}
    className={`item position-absolute d-flex align-items-center justify-content-center rounded-circle border border-dark fw-bold ${
      item.disappearing ? "disappearing" : ""
    } ${clickedItems.includes(item.number) ? "clicked" : ""}`}
    style={{
      left: `${item.x}%`,
      top: `${item.y}%`,
      zIndex: maxZIndex - item.number,
      pointerEvents:
        gameOver || clickedItems.includes(item.number) ? "none" : "auto",
    }}
  >
    {item.number}
  </div>
);

export default NumberItem;
