import React from "react";
import { ToastContext } from "../ToastProvider";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

function ToastShelf() {
  const { infoQueue } = React.useContext(ToastContext);
  return (
    <ol className={styles.wrapper}>
      {infoQueue.map((items) => (
        <li className={styles.toastWrapper} key={items.id}>
          <Toast variant={items.option} id={items.id}>
            {items.text}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
