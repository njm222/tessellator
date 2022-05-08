import { useEffect, useRef, memo, MutableRefObject } from "react";
import { useStore } from "@/utils/store";

const MouseActivity = () => {
  const mouseTimeout: MutableRefObject<NodeJS.Timeout> = useRef();

  const mouseMoveHandler = () => {
    clearTimeout(mouseTimeout.current);
    useStore.setState({ mouseActive: true });
    mouseTimeout.current = setTimeout(
      () => useStore.setState({ mouseActive: false }),
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
