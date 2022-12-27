import React from "react";
import { Checkbox, InputField } from "../../components";
import { checkbox, inputData } from "./data";
import { Card } from "./Setting";

import { useSelector, useDispatch } from "react-redux";
import { toggle, setCustomText } from "../../store/signatureSlice";

const SignatureAppearance = () => {
  const signatureData = useSelector((state) => state.signature); // initial value from the store
  const dispatch = useDispatch(); // Initialize store action hook

  // Handling input fields [custom text]
  const handleInput = (e) => {
    const { value, name } = e.target;

    const payload = {
      searchKey: name,
      value,
    };
    dispatch(setCustomText(payload));
  };

  return (
    <>
      {/*Signature Appearance */}
      <Card header="Signature Appearance">
        {checkbox.map((item) => (
          <Checkbox
            key={item.name}
            label={item.label}
            name={item.name}
            isChecked={signatureData[item.name]}
            onChange={(e) => dispatch(toggle({ toggleKey: item.name }))}
            icons={{ ...item.icons }}
            tooltipInfo={item.tooltip}
          />
        ))}
      </Card>

      {/* Custom text */}
      <Card header="Custom Text" className="">
        {inputData.map((item) => (
          <InputField
            key={item.name}
            label={item.label}
            name={item.name}
            icon={item.icon}
            onChange={handleInput}
            placeholder={item.placeholder}
            value={signatureData.customText[item.name]}
            className="h-full"
          />
        ))}
        <p className="text-xs text-yellow-700/60 text-center">
          Settings auto save when anything changed.
        </p>
      </Card>
    </>
  );
};

export default SignatureAppearance;
