import React, { useState, useEffect } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import PropTypes from "prop-types";
import { Tooltip } from "../";

import "./Checkbox.scss";

const Checkbox = ({ label, onChange, name, icons, isChecked, tooltipInfo }) => {
  const [checked, setChecked] = useState(false);

  // checkbox status check on render or if isChecked props is changed
  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  // handling checkbox change event
  const handleChange = (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);

    // callback called if user is clicked on checkbox
    onChange(isChecked);
  };

  return (
    <div className="flex flex-row justify-between items-center w-full h-8">
      <span className=" select-none inline-flex items-center text-sm text-slate-400 capitalize tracking-wide ">
        {label}
        <Tooltip label={tooltipInfo}>
          <span className=" text-[10px] ml-1 cursor-help group text-slate-400/30">
            <BsFillInfoCircleFill className="group-hover:text-slate-400" />
          </span>
        </Tooltip>
      </span>

      <div className={`checkbox ${checked ? "checked" : ""}`}>
        <input
          name={name}
          id={name}
          type="checkbox"
          onChange={handleChange}
          checked={checked}
          className="z-50 absolute appearance-none w-full h-full bg-transparent cursor-pointer"
        />

        <label
          htmlFor={name}
          className={`text-lg inline-flex justify-center items-center flex-1 cursor-pointer z-50 ease-linear duration-200 ${
            checked ? "text-slate-500" : "text-white"
          } `}
        >
          {icons.leftIcon}
        </label>

        <label
          htmlFor={name}
          className={`text-lg inline-flex justify-center items-center flex-1 cursor-pointer z-50 ease-linear duration-200 ${
            checked ? "text-white" : "text-slate-500"
          }`}
        >
          {icons.rightIcon}
        </label>
      </div>
    </div>
  );
};

// Default props
Checkbox.defaultProps = {
  label: "checkbox",
  name: "checkbox",
  isChecked: false,
  tooltipInfo: "Tooltip",
  icons: {
    leftIcon: "",
    rightIcon: "",
  },
  onChange: (e) => {},
};

// Propstype checking
Checkbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  tooltipInfo: PropTypes.string,
  icons: PropTypes.shape({
    leftIcon: PropTypes.element.isRequired,
    rightIcon: PropTypes.element.isRequired,
  }),
  onChange: PropTypes.func,
};

export default Checkbox;
