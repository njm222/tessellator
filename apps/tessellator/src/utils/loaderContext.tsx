import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { generateRandomInteger } from "core";
import { Loader } from "ui";

type LoaderProviderProps = {
  isLoading?: boolean;
  setIsLoading?: (flag: boolean) => void;
  children: ReactNode;
};

const LoaderContext = createContext({
  isLoading: false,
  setIsLoading: (flag: boolean, message?: string) => {
    return;
  },
});

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }: LoaderProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const value = useMemo(
    () => ({
      isLoading,
      setIsLoading: (flag: boolean, message = "") => {
        setIsLoading(flag);
        setLoadingMessage(flag ? message : "");
      },
    }),
    [isLoading, setIsLoading]
  );

  return (
    <LoaderContext.Provider value={value}>
      {isLoading ? (
        <Loader
          dotVariant={generateRandomInteger(0, 11)}
          message={loadingMessage}
        />
      ) : null}
      {children}
    </LoaderContext.Provider>
  );
};
