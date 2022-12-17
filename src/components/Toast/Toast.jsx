import toast from "react-hot-toast";
import { IoIosWarning } from "react-icons/io";

const DURATION = 2500;

export const successNotify = (message, duration = DURATION) => {
  return toast.success(message, {
    position: "bottom-center",
    className:
      "px-4 py-2 flex justify-center align-middle items-center leading-4 bg-emerald-100 border-2 rounded-lg border-emerald-600 text-emerald-600",
    duration,
  });
};
export const errorNotify = (message, duration = DURATION) => {
  return toast.error(message, {
    position: "bottom-center",
    className:
      "px-4 py-2 flex justify-center align-middle items-center leading-4 bg-rose-100 border-2 rounded-lg border-rose-600/80 text-rose-600",
    duration,
  });
};
export const warningNotify = (message, duration = DURATION) => {
  return toast.error(message, {
    icon: <IoIosWarning className="animate-pulse text-xl" />,
    position: "bottom-center",
    className:
      "px-4 py-2 flex justify-center align-middle items-center leading-4 bg-amber-100 border-2 rounded-lg border-amber-600/80 text-amber-600",
    duration,
  });
};

export const promiseNotify = (promise, successMessage) => {
  return toast.promise(
    promise,
    {
      loading: "Please wait task is in process...",
      success: successMessage,
      error: `Unable to process, please try again.`,
    },
    {
      position: "bottom-center",
      duration: DURATION,
      loading: {
        className: "bg-rose-900",
      },
      success: {
        className:
          "px-4 py-2 flex justify-center align-middle items-center leading-4 bg-emerald-100 border-2 rounded-lg border-emerald-600 text-emerald-600",
      },
    }
  );
};
