import { useEffect, useRef, memo } from "react";
import { setState } from "@/utils/store";

const MouseActivity = () => {
  const mouseTimeout = useRef();

  const mouseMoveHandler = () => {
    clearTimeout(mouseTimeout.current);
    setState({ mouseActive: true });
    mouseTimeout.current = setTimeout(
      () => setState({ mouseActive: false }),
      3500
    );
  };

  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      clearTimeout(mouseTimeout.current);
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return null;
};

export default memo(MouseActivity);
