import { useState } from "react";
import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface NotificationConfig extends ToastOptions {
  theme: string;
}

const useNotification = () => {
  const [notificationConfig, setNotificationConfig] =
    useState<NotificationConfig>({
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notify = (message: string, options?: ToastOptions) => {
    const mergedOptions = { ...notificationConfig, ...options };
    toast(message, mergedOptions);
  };

  return { notify };
};

export default useNotification;
