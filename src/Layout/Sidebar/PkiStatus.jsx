import React from "react";
import { IoMdRefreshCircle, AiOutlineLink } from "../../assets";
import { Tooltip } from "../../components";
import { useState } from "react";

const PkiStatus = () => {
  const [connected, setConnected] = useState(false);

  return (
    <div className="pki__status mt-auto flex justify-center items-center h-16 border-t border-slate-500 dark:border-slate-600 ">
      <span
        className={`block p-3 animate-ping absolute ${
          connected ? "bg-green-600/50" : "bg-rose-600/50"
        } rounded-full cursor-pointer`}
      ></span>

      <Tooltip label={connected ? "Connected" : "Connecting...."}>
        {connected ? (
          <AiOutlineLink className="text-3xl cursor-pointer z-10 text-green-800 bg-green-500 rounded-full p-1" />
        ) : (
          <IoMdRefreshCircle className="text-3xl cursor-pointer z-10 text-rose-600 animate-spin" />
        )}
      </Tooltip>
    </div>
  );
};

export default PkiStatus;
