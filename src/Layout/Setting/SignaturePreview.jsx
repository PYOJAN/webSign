import { Tooltip } from "../../components";
import { useSelector } from "react-redux";

import { greenTick } from "../../assets/";

const SignaturePreview = () => {
  const { visibility, customText } = useSelector((state) => state.signature);
  return (
    <>
      <div
        className={`w-full text-slate-700 relative mt-auto p-2 py-1 border-[4px] h-40 select-none whitespace-nowrap ${
          visibility ? "border-teal-900 bg-white" : "border-slate-700"
        }`}
      >
        {visibility ? (
          <>
            <div className=" w-full h-full pt-5 flex justify-center items-center">
              <img
                src={greenTick}
                alt="img"
                className="ml-[20%] h-full bg-cover"
              />
            </div>
            <div
              className={`flex flex-col w-full h-full z-50 absolute top-0 left-0 px-2`}
            >
              <h1 className="text-2xl font-bold tracking-wider">
                Signature Valid
              </h1>
              <div className="w-full flex flex-col text-sm leading-5 tracking-wide">
                <span>Digitally signed By:</span>
                <h2 className=" font-medium">Certificate CN name</h2>
                <h2 className="leading-4 mb-1">Development</h2>
                <div className=" text-sm flex flex-col leading-4">
                  <span>Location: {customText.location}</span>
                  <span>Reason:{customText.reason}</span>
                  <span>Custom Text: {customText.custom}</span>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default SignaturePreview;
