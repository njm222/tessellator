import { useRouter } from "next/router";
import { loginUser, updateToken } from "core";
import { Loader } from "ui";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
  FC,
} from "react";
import Cookies from "js-cookie";
import { setAccessToken } from "../spotifyClient";
import { PlayerProvider } from "./playerContext";
import { AnalyserProvider } from "./analyserContext";

type AuthProviderProps = {
  isLoading?: boolean;
  accessToken?: string;
  refreshToken?: string;
  handleRefreshToken?: () => void;
  children: ReactNode;
};

const AuthContext = createContext({
  isLoading: false,
  accessToken: "",
  refreshToken: "",
  handleRefreshToken: () => {
    return;
  },
});

function getTokens() {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  return { accessToken, refreshToken };
}

export const AuthProvider: FC<AuthProviderProps> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [tokens, setTokens] = useState({ accessToken: "", refreshToken: "" });

  const logoutUser = useCallback(() => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setTokens({ accessToken: "", refreshToken: "" });
    router.push("/");
  }, [router]);

  const handleRefreshToken = useCallback(async () => {
    updateToken(tokens.refreshToken)
      .then((tokens: { accessToken: string; refreshToken: string }) => {
        setTokens(tokens);
        setAccessToken(tokens.accessToken);
        Cookies.set("accessToken", tokens.accessToken);
        Cookies.set("refreshToken", tokens.refreshToken);
        setIsLoading(false);
        window.location.reload();
      })
      .catch(logoutUser);
  }, [logoutUser, tokens?.refreshToken]);

  useEffect(() => {
    const { accessToken, refreshToken } = getTokens();

    if (accessToken && refreshToken) {
      setTokens({
        accessToken,
        refreshToken,
      });
      setAccessToken(accessToken);
      setIsLoading(false);
      return;
    }

    if (refreshToken) {
      handleRefreshToken();
      return;
    }

    router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      loginUser,
      isLoading,
      logoutUser,
      handleRefreshToken,
    }),
    [
      isLoading,
      logoutUser,
      handleRefreshToken,
      tokens?.accessToken,
      tokens?.refreshToken,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {isLoading && router.pathname !== "/" ? <Loader /> : null}
      {value.accessToken && router.pathname !== "/" ? ( // TODO: decouple
        <PlayerProvider>
          <AnalyserProvider>{children}</AnalyserProvider>
        </PlayerProvider>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
