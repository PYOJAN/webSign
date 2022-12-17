import React from "react";
import PropTypes from "prop-types";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Tooltip } from "../";

const InputGroup = ({ label, className, children }) => {
  return (
    <div className={`w-full flex flex-col`}>
      {label ? (
        <label className="text-sm select-none font-semibold text-slate-400 mb-2">
          {label}
          <Tooltip lable="Here provide PKI API end-point URL." placment="top">
            <span className=" inline-block text-[10px] ml-1 cursor-help">
              <BsFillInfoCircleFill />
            </span>
          </Tooltip>
        </label>
      ) : null}
      <div
        className={`flex flex-row rounded-[4px] overflow-hidden ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

// Default Props
InputGroup.defaultProps = {
  label: "Input Group",
  className: "",
};

// Type checking
InputGroup.propTypes = {
  label: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
  className: PropTypes.string,
};

export default InputGroup;
