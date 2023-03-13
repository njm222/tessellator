import {
  useEffect,
  useRef,
  MutableRefObject,
  createContext,
  ReactNode,
  useContext,
  useState,
  FC,
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

  const mouseMoveHandler = () => {
    setMouseActive(true);

    if (mouseTimeout.current) {
      clearTimeout(mouseTimeout.current);
    }
    mouseTimeout.current = setTimeout(() => setMouseActive(false), 3500);
  };

  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      if (!mouseTimeout.current) return;
      clearTimeout(mouseTimeout.current);
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return (
    <MouseActivityContext.Provider value={{ mouseActive }}>
      {children}
    </MouseActivityContext.Provider>
  );
};
