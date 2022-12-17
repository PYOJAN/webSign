import React from "react";
import PropTypes from "prop-types";
import Input from "./Input";

const InputField = ({
  label,
  name,
  icon,
  type,
  placeholder,
  onChange,
  value,
  disabled,
  hidden,
  ...restProps
}) => {
  return (
    <div className={`w-full flex-col p-0 ${hidden ? "hidden" : "flex"}`}>
      {label ? (
        <label
          htmlFor={name}
          className="text-sm select-none font-semibold text-slate-400 mb-1"
        >
          {label}
        </label>
      ) : null}
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        icon={icon}
        isRounded={true}
        disabled={disabled}
        {...restProps}
      />
    </div>
  );
};

// Default Props
InputField.defaultProps = {
  label: "Input",
  name: "input",
  type: "text",
  placeholder: "input",
  onChange: (e) => {},
  value: "",
  disabled: false,
  hidden: false,
};

// PropType checking
InputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.element,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(["text", "email", "password"]),
  onChange: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
};

export default InputField;
