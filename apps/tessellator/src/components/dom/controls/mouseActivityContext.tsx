import {
  createContext,
  FC,
  MutableRefObject,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type MouseActivityProviderProps = {
  mouseActive?: boolean;
  children: ReactNode;
};

const MouseActivityContext = createContext({
  mouseActive: false,
});

export const useMouseActivity = () => useContext(MouseActivityContext);

export const MouseActivityProvider: FC<MouseActivityProviderProps> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [mouseActive, setMouseActive] = useState(false);

  const mouseTimeout: MutableRefObject<NodeJS.Timeout | null> = useRef(null);

  function handleCursorStyle(visible: boolean) {
    const el = document.body;
    if (!el) {
      return;
    }
    if (
      visible &&
      (el.style.cursor === "pointer" || el.style.cursor === "auto")
    ) {
      return;
    }
    el.style.cursor = visible ? "auto" : "none";
  }

  function handleMouseActive() {
    setMouseActive(true);
    handleCursorStyle(true);
  }

  function handleMouseInactive() {
    setMouseActive(false);
    handleCursorStyle(false);
  }

  const mouseMoveHandler = () => {
    handleMouseActive();

    if (mouseTimeout.current) {
      clearTimeout(mouseTimeout.current);
    }
    mouseTimeout.current = setTimeout(() => handleMouseInactive(), 3500);
  };

  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveHandler, { passive: true });

    return () => {
      if (!mouseTimeout.current) return;
      clearTimeout(mouseTimeout.current);
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, [mouseMoveHandler]);

  return (
    <MouseActivityContext.Provider value={{ mouseActive }}>
      {children}
    </MouseActivityContext.Provider>
  );
};
