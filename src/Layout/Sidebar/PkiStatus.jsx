import { useState, useEffect } from "react";
import { IoIcon } from "../../assets";
import { AiIcon } from "../../assets";
import { Tooltip } from "../../components";
import axios from "axios";

const PkiStatus = () => {
  const [isPkiOnline, setIsPkiOnline] = useState(false);


  return (
    <div className="pki__status mt-auto flex justify-center items-center h-16 border-t border-slate-500 dark:border-slate-600 ">
      <Tooltip label={isPkiOnline ? "Connected" : "Connecting...."}>
        {isPkiOnline ? (
          <AiIcon.AiOutlineLink className="text-3xl cursor-pointer z-10 text-green-800 bg-green-500 rounded-full p-1" />
        ) : (
          <IoIcon.IoMdRefreshCircle className="text-3xl cursor-pointer z-10 text-rose-600 animate-spin" />
        )}
      </Tooltip>
    </div>
  );
};

export default PkiStatus;
