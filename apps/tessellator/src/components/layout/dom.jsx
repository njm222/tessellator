import { useStore } from "@/utils/store";
import { useRef, useEffect } from "react";

const Dom = ({ children }) => {
  const ref = useRef(null);
  useEffect(() => {
    useStore.setState({ dom: ref });
  }, []);

  return (
    <div className={"domContainer"} ref={ref}>
      {children}
    </div>
  );
};

export default Dom;
