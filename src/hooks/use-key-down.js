import React from "react";

function useKeyDown(key, callback) {
  React.useEffect(() => {
    function handelKeyDown(event) {
      if (event.code === key) {
        console.log("ESC 键被按下了！");
        callback(event);
      }
    }
    window.addEventListener("keydown", handelKeyDown);
    return () => {
      window.removeEventListener("keydown", handelKeyDown);
    };
  }, [key, callback]);
}

export default useKeyDown;
