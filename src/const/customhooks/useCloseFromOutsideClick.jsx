import { useEffect, useRef } from "react";

function useCloseFromOutSideClick(callback) {
  const ref = useRef(null);

  const handleEvent = (e) => {
    if (ref && !ref.current?.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleEvent);
    return () => document.removeEventListener("mousedown", handleEvent);
  }, []);

  return ref;
}

export default useCloseFromOutSideClick;
