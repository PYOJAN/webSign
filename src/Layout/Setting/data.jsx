import React from "react";

import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FaCheck, FaTimes } from "react-icons/fa";
import { MdLocationPin, MdBookmarkAdded } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

export const checkbox = [
  {
    label: "Visibility",
    name: "visibility",
    isChecked: true,
    icons: { leftIcon: <AiFillEyeInvisible />, rightIcon: <AiFillEye /> },
    tooltip: "Control visibility of signature"
  },
  {
    label: "LTV",
    name: "ltv",
    isChecked: false,
    icons: { leftIcon: <FaTimes />, rightIcon: <FaCheck /> },
    tooltip: "Long term validation"
  },
  {
    label: "Timestamp",
    name: "timestamp",
    isChecked: false,
    icons: { leftIcon: <FaTimes />, rightIcon: <FaCheck /> },
    tooltip: "Embed signature timestamp in sign"
  },
];

export const inputData = [
  {
    label: "Location",
    name: "location",
    placeholder: "Location e.g Delhi",
    icon: <MdLocationPin />,
  },
  {
    label: "Reason",
    name: "reason",
    placeholder: "Invoice signed",
    icon: <MdBookmarkAdded />,
  },
  {
    label: "Custom Text",
    name: "custom",
    placeholder: "Custom text here....",
    icon: <BsThreeDots />,
  },
];
