import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  // we want to refer to the same div element each time, we do not want to do a document.getElementById() each time -- It is slow
  const elRef = useRef(null); // a ref is a frozen object -- freeze library (example mentioned)

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    // return "TODO"; return a function here, to resolve our memory leak

    // concept of mounting, first We append and then We remove
    /** let's speak js, line 11 and 12 will be run, while line 13 is not invoked, it will be regiven to react and it is going to rerun it only when it removes it (run it when it gets unmounted
     * 
    ) */
    // https://react.dev/reference/react/useLayoutEffect for things where you are measuring the DOM,
    // https://react.dev/reference/react/useInsertionEffect for emotion.js for css libraries
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
