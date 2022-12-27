import "./settings.scss";

import PkiSetting from "./PkiSetting";
import { Tooltip, Button } from "../../components";
import SignatureAppearance from "./SignatureAppearance";
import SignaturePreview from "./SignaturePreview";

import { useSelector, useDispatch } from "react-redux";
import { reset as pkiReset } from "../../store/pki.apiSlice";
import { reset } from "../../store/signatureSlice";

const Settings = () => {
  const { isSettingActive } = useSelector((preState) => preState.uiControl);
  const dispatch = useDispatch();

  // Resetting application setting as default
  const handleReset = () => {
    dispatch(pkiReset());
    dispatch(reset());
  };

  return (
    <div
      className={`setting overflow-hidden ${
        isSettingActive ? "w-setting" : "w-0"
      } lg:w-setting `}
    >
      <section className="setting-header ">
        <strong className="text-xl text-slate-300">Settings</strong>
        <Tooltip label="Apply Default setting">
          <Button
            size="SMALL"
            variant="LINK"
            className="p-0"
            onClick={handleReset}
          >
            Reset
          </Button>
        </Tooltip>
      </section>

      <div className="setting-forms">
        <div className=" w-full h-full z-10 flex flex-col">
          {/* PKI settings */}
          <Card className="mb-1">
            <PkiSetting label="PKI Setting" />
          </Card>

          {/*Signature Appearance */}
          <SignatureAppearance />

          {/* Signature Preview */}
          <SignaturePreview />
        </div>
      </div>
    </div>
  );
};

export const Card = ({ children, header, className }) => {
  return (
    <div className="w-full border-b border-slate-600 px-3 py-2 flex flex-col">
      {header && (
        <strong
          className={`text-base text-slate-200 select-none font-medium mb-2 ${className}`}
        >
          {header}
        </strong>
      )}
      <div className=" w-full flex flex-col gap-2">{children}</div>
    </div>
  );
};

export default Settings;
