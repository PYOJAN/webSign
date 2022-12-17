import PropTypes from "prop-types";

const InputField = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  disabled,
  icon,
  isRounded,
  ...restProps
}) => {
  const { className } = restProps;
  return (
    <div
      className={`flex w-full relative h-8 overflow-hidden ${
        isRounded ? "rounded-[4px]" : ""
      }`}
    >
      <input
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        {...restProps}
        className={` inline-flex text-sm leading-[14px] focus:text-sky-500/80 text-sky-500/40 w-full outline-none bg-slate-800 peer border-2 border-sky-500/40 ${
          icon ? "pl-8" : "px-1"
        } ${
          isRounded ? "rounded-[4px]" : ""
        } focus:border-sky-500/80 disabled:border-sky-500/40 disabled:text-gray-500 disabled:cursor-not-allowed placeholder:text-sky-900/60 font-medium ease-in duration-150 ${className}`}
      />
      {icon ? (
        <span
          className={`absolute top-1/2 text-xl left-2 -translate-y-1/2 ${
            value ? "text-sky-600/80" : "text-sky-600/50"
          } peer-focus:text-sky-500/80 ease-in duration-150 pointer-events-none`}
        >
          {icon}
        </span>
      ) : null}
    </div>
  );
};

// Default Props
InputField.defaultProps = {
  name: "input",
  type: "text",
  placeholder: "input",
  onChange: (e) => {},
  value: "",
  disabled: false,
  isRounded: false,
};

// PropType checking
InputField.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  icon: PropTypes.element,
  isRounded: PropTypes.bool,
  type: PropTypes.oneOf(["text", "email", "password", "number"]),
};

export default InputField;
