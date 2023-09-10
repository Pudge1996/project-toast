import React from "react";

import Button from "../Button";
import ToastShelf from "../ToastShelf";
import ToastProvider from "../ToastProvider";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

export const ToastContext = React.createContext();

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [infoQueue, setInfoQueue] = React.useState([]);
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
  function handelSubmit(event) {
    event.preventDefault();

    if (message.trim() !== "") {
      const info = {
        text: message,
        option: variant,
        id: crypto.randomUUID(),
      };
      const nextInfoQueue = [...infoQueue, info];
      setInfoQueue(nextInfoQueue);
      setMessage("");
      console.log(nextInfoQueue);
    }
  }

  function handelDismiss(id) {
    const nextInfoQueue = infoQueue.filter((toast) => {
      return toast.id !== id;
      
    });

    setInfoQueue(nextInfoQueue);
  }

  return (
    <ToastContext.Provider value={infoQueue}>
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf handelDismiss={handelDismiss} />
      <ToastProvider />

      <form className={styles.controlsWrapper} onSubmit={handelSubmit}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              required
              value={message}
              className={styles.messageInput}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => {
              const id = `variant-${option}`;
              return (
                <label htmlFor={id} key={id}>
                  <input
                    id={id}
                    type="radio"
                    name="variant"
                    value={option}
                    checked={option === variant}
                    onChange={(event) => {
                      setVariant(event.target.value);
                    }}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>
        <p>message: {message}</p>
        <p>variant: {variant}</p>
        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
    </ToastContext.Provider>
  );
}

export default ToastPlayground;
