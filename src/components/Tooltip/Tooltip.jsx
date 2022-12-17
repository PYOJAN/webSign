import { cloneElement, useRef, useState } from "react";
import PropTypes from "prop-types";
import Portal from "../Portal/Portal";
import "./tooltip.scss";

const setTooltipPos = (tooltip, placement, target, space) => {
  let X,
    Y,
    tooltipPos = placement;
  const boundary = document.querySelector(".main-body");
  const NA_TO_POS = (negativeNumber) => negativeNumber * -1; // Inverting number into negative to positive
  const { offsetHeight, offsetWidth } = tooltip;
  const { width, height, x, y, bottom } = target.getBoundingClientRect();

  // Collision
  const collision = () => ({
    bWith: boundary.clientWidth,
    bHeight: boundary.clientHeight,
    bottomCollision: () => bottom + space + offsetHeight > collision().bHeight,
    topCollision: () => height + space > y,
  });

  if (collision().bottomCollision()) tooltipPos = "top";
  if (collision().topCollision()) tooltipPos = "bottom";

  switch (tooltipPos) {
    case "left":
      Y = (height - offsetHeight) / 2 + y;
      X = x - offsetWidth - space;
      break;
    case "right":
      Y = (height - offsetHeight) / 2 + y;
      X = x + width + space;
      break;
    case "top":
      Y = y - offsetHeight - space;
      X = (width - offsetWidth) / 2 + x;
      break;
    default:
      Y = y + height + space;
      X = (width - offsetWidth) / 2 + x;
  }

  //
  const BOUNDARY = boundary.getBoundingClientRect();
  if (X < BOUNDARY.left) X = BOUNDARY.left + space; // if tooltip hide on left side
  if (X + offsetWidth > BOUNDARY.right)
    X = BOUNDARY.right - offsetWidth - space; // if tooltip hide on right side
  if (Y < 0) Y = NA_TO_POS(Y) + space; // if tooltip hide on top

  tooltip.style.top = `${Y}px`;
  tooltip.style.left = `${X}px`;

  return tooltipPos;
};


// Tooltip variants
const variants = {
  INFO: "INFO",
  DEFAULT: "DEFAULT"
}


const Tooltip = ({ children, label, placement, space }) => {
  const [show, setShow] = useState(false);
  const posRef = useRef();

  // Mouse over event handle
  const handleMouseOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShow(true);
  };
  // Mouse Enter even handle
  const handleMouseEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setTooltipPos(posRef.current, placement, e.target, space);
  };

  // Mouse out event handle
  const handleMouseOut = () => {
    setShow(false);
  };

  // const elements = Children.toArray(children);
  return (
    <>
      {cloneElement(children, {
        onMouseEnter: handleMouseEnter,
        onMouseOver: handleMouseOver,
        onMouseOut: handleMouseOut,
      })}

      <Portal>
        <span
          ref={posRef}
          className={`tooltip ${
            show ? `opacity-100 scale-100 ` : `opacity-0 scale-0`
          }`}
        >
          {label}
        </span>
      </Portal>
    </>
  );
};

Tooltip.defaultProps = {
  label: "Tooltip",
  placement: "bottom",
  space: 6,
}

// Type checking
Tooltip.propTypes = {
  placement: PropTypes.oneOf(["left", "right", "top", "bottom"]),
  space: PropTypes.number,
  label: PropTypes.string,
  root: PropTypes.string,
};

export default Tooltip;
