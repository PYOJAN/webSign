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
import { errorNotify, warningNotify } from "../../components";

import { useDispatch } from "react-redux";
import { toggle } from "../../store/uiControl.slice";
import { pdfActions, usePdfViewerAction } from "../../components/PdfViewer";

const Item = ({ item, activeBtn, setActiveBtn, ...restProps }) => {
  const dispatch = useDispatch();
  const inputElement = useRef();

  const [selectedFiles, actionDispatch] = usePdfViewerAction();
  const filesData = selectedFiles;

  // If signature applying btn is active
  const signatureActive = useMemo(
    () => (activeBtn === NAME.PEN ? true : false),
    [activeBtn]
  );

  // is file selected and it have base64 encoded data
  const isBase64 = useMemo(
    () => (filesData.length ? true : false),
    [filesData]
  );

  // Handle menu item click
  const handleMenuClick = (menuName) => {
    switch (menuName) {
      case NAME.ADD:
        if (signatureActive) return warningNotify("Action not allowed");
        inputElement.current.click();
        break;
      case NAME.PEN:
        if (!isBase64) return warningNotify("First select file.");
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
    // fileProcess(e, dispatch);
    fileProcess(e, actionDispatch);
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

    dispatch({ action: pdfActions.NEW_FILE_ADD, data: processedFile });
  } catch (err) {
    console.log(err);
    errorNotify("Unable to process file, please try again.");
  }
};

export default Item;
