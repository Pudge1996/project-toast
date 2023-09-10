import React from "react";
import useKeyDown from '../../hooks/use-key-down';
export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [infoQueue, setInfoQueue] = React.useState([]);
  function createToast(message, variant) {
    if (message.trim() !== "") {
      const info = {
        text: message,
        option: variant,
        id: crypto.randomUUID(),
      };
      const nextInfoQueue = [...infoQueue, info];
      setInfoQueue(nextInfoQueue);

      console.log(nextInfoQueue);
    }
  }
  function dismissToast(id) {
    const nextInfoQueue = infoQueue.filter((toast) => {
      return toast.id !== id;
    });

    setInfoQueue(nextInfoQueue);
  }
  const handelEscape = React.useCallback(() => {
    setInfoQueue([]);
  },[])
  useKeyDown('Escape', handelEscape)

  return (
    <ToastContext.Provider value={{ infoQueue, setInfoQueue, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
