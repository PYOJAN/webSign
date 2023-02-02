import { useState, useEffect } from "react";
import { IoIcon } from "../../assets";
import { AiIcon } from "../../assets";
import { Tooltip } from "../../components";
import axios from "axios";

const URL = "http://127.0.0.1:1620";
const PkiStatus = ({ onConnect, isConnected }) => {
  // useEffect(() => {
  //   function getPkiStatus() {
  //     axios
  //       .post(URL, {}, { timeout: 5000 })
  //       .then((result) => {
  //         if (result.status === 200) onConnect(true);
  //       })
  //       .catch((err) => {
  //         onConnect(false);
  //       });
  //   }
  //   getPkiStatus();
  //   const interval = setInterval(() => getPkiStatus(), 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <div className="pki__status mt-auto flex justify-center items-center h-16 border-t border-slate-500 dark:border-slate-600 ">
      <Tooltip label={isConnected ? "Connected" : "Connecting...."}>
        {isConnected ? (
          <AiIcon.AiOutlineLink className="text-3xl cursor-pointer z-10 text-green-800 bg-green-500 rounded-full p-1" />
        ) : (
          <IoIcon.IoMdRefreshCircle className="text-3xl cursor-pointer z-10 text-rose-600 animate-spin" />
        )}
      </Tooltip>
    </div>
  );
};

export default PkiStatus;
