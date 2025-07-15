import { createContext, useState, useContext } from "react";
import Toast from "../components/Toast";

const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showToast(message) {
    setMessage(message);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }

  return (
    <>
      <ToastContext.Provider value={{ showToast }}>
        <Toast open={open} message={message} />
        {children}
      </ToastContext.Provider>
    </>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
