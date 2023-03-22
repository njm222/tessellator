import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

type PortalProviderProps = {
  inPortal?: boolean;
  setInPortal?: (flag: boolean) => void;
  children: ReactNode;
};

const PortalContext = createContext({
  inPortal: false,
  setInPortal: (flag: boolean) => {
    return;
  },
});

export const usePortal = () => useContext(PortalContext);

export const PortalProvider: FC<PortalProviderProps> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [inPortal, setInPortal] = useState(false);

  const value = useMemo(
    () => ({
      inPortal,
      setInPortal: (flag: boolean) => setInPortal(flag),
    }),
    [inPortal, setInPortal]
  );

  return (
    <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
  );
};
