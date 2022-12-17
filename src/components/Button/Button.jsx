import PropTypes from "prop-types";

import "./button.scss";

const btnAs = {
  BUTTON: "button",
  ANCHOR: "a",
  DIV: "div",
};
const VARIANT = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  ROUNDED_FULL: "Rounded-full",
  ROUNDED_FULL_SECONDARY: "rounded-full-secondary",
  OUTLINE: "outline",
  LINK: "link",
};

const SIZE = {
  SMALL: "small",
  DEFAULT: "default",
  BIG: "big",
};

const Button = ({
  btnEl,
  variant,
  size,
  children,
  onClick,
  className,
  ...restProps
}) => {
  const Element = btnEl;
  const btnClass = VARIANT[variant];

  return (
    <Element
      className={`${btnClass} ${SIZE[size]} ${className}`}
      {...restProps}
      onClick={onClick}
    >
      {children}
    </Element>
  );
};

// Default props
Button.defaultProps = {
  btnEl: btnAs.BUTTON,
  variant: VARIANT.PRIMARY,
  size: SIZE.DEFAULT,
  className: "",
  onClick: (e) => {},
};

// Props type checking
Button.propTypes = {
  btnEl: PropTypes.oneOf([btnAs.ANCHOR, btnAs.BUTTON, btnAs.DIV]),
  VARIANT: PropTypes.oneOf([
    "PRIMARY",
    "OUTLINE",
    "ROUNDED_FULL",
    "ROUNDED_FULL_SECONDARY",
    "SECONDARY",
    "LINK",
  ]),
  SIZE: PropTypes.oneOf(["SMALL"]),
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
