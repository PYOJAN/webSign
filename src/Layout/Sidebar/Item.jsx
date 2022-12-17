const NAME = {
  ADD: "add",
  PEN: "pen",
  GEAR: "gear",
};
export const MenuItems = [
  {
    Icon: Add,
    id: Math.ceil(Math.random() * 999),
    name: NAME.ADD,
    tooltip: "Choose File",
    className: "w-14",
  },
  {
    Icon: Pen,
    id: Math.ceil(Math.random() * 999),
    name: NAME.PEN,
    tooltip: "Apply Sign",
    className: "w-6",
  },
  {
    Icon: Gear,
    id: Math.ceil(Math.random() * 999),
    name: NAME.GEAR,
    tooltip: "Toggle setting panel",
    className: "w-6",
  },
];

// Assets
import { useRef, useMemo } from "react";
import { Pen, Add, Gear } from "../../assets";
import { fileHandle } from "../../utils";
import { errorNotify, warningNotify, PdfViewer } from "../../components";

import { useDispatch, useSelector } from "react-redux";
// import { setFileData } from "../../store/fileSlice";
import { setFileDataArray } from "../../store/fileSliceArray";
import { toggle } from "../../store/uiControl.slice";

const Item = ({ item, activeBtn, setActiveBtn, ...restProps }) => {
  const dispatch = useDispatch();
  const inputElement = useRef();
  // const fileData = useSelector((state) => state.fileSlice);
  const fileData = useSelector((state) => state.fileArray);

  // If signature applying btn is active
  const signatureActive = useMemo(
    () => (activeBtn === NAME.PEN ? true : false),
    [activeBtn]
  );

  // Handle menu item click
  const handleMenuClick = (menuName) => {
    switch (menuName) {
      case NAME.ADD:
        if (signatureActive) return warningNotify("Action not allowed");
        inputElement.current.click();
        break;
      case NAME.PEN:
        if (!fileData?.base64) return warningNotify("First select file.");
        setActiveBtn(menuName);
        break;
      case NAME.GEAR:
        dispatch(toggle({ toggleKey: "isSettingActive" }));
      default:
        break;
    }
  };

  // On file changed
  const handleOnChange = async (e) => {
    fileProcess(e, dispatch);
  };

  const isFilePicker = item?.name === NAME.ADD;
  const isActive = item?.name === activeBtn;
  const isGearBtn = item?.name === NAME.GEAR;
  return (
    <li
      role="button"
      disabled={true}
      className={`item group ${isGearBtn ? `hide` : ""} ${
        isFilePicker ? "filePicker" : isActive ? "active" : ""
      }`}
      onClick={() => handleMenuClick(item?.name)}
      {...restProps}
    >
      <input
        ref={inputElement}
        type="file"
        className="hidden"
        name={item?.name}
        onChange={handleOnChange}
        accept="application/pdf"
        disabled={signatureActive}
      />
      {
        <item.Icon
          className={`pointer-events-none ease-in duration-150 ${
            isActive ? "" : "group-hover:fill-sky-500"
          } ${item.className}`}
        />
      }
    </li>
  );
};

export const fileProcess = async (e, dispatch) => {
  try {
    const file = e.target.files[0];
    if (!file) return; // If file is not selected

    // Processing selected file and get file info and base64 data
    const processedFile = await fileHandle(e);
    // if any error during file process
    if (processedFile?.status === "ERROR")
      return errorNotify(processedFile?.message);

    dispatch(setFileDataArray({ ...processedFile }));
    // dispatch(setFileData({ ...processedFile }));
  } catch (err) {
    console.log(err);
    errorNotify("Unable to process file, please try again.");
  }
};

export default Item;
