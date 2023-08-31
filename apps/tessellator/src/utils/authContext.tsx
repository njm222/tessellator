import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { deleteCookie,getCookie, setCookie } from "cookies-next";
import { loginUser, updateToken } from "core";
import { useRouter } from "next/navigation";

type AuthProviderProps = {
  isLoading?: boolean;
  accessToken?: string;
  refreshToken?: string;
  handleRefreshToken?: (
    refreshToken: string,
    refreshPage?: boolean
  ) => Promise<void>;
  children: ReactNode;
};

const AuthContext = createContext({
  accessToken: "",
  refreshToken: "",
  handleRefreshToken: async (refreshToken: string, refreshPage?: boolean) => {
    return;
  },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [tokens, setTokens] = useState({ accessToken: "", refreshToken: "" });

  const logoutUser = useCallback(() => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    setTokens({ accessToken: "", refreshToken: "" });
    router.push("/");
  }, [router]);

  const handleRefreshToken = useCallback(
    async (refreshToken: string, refreshPage = false) => {
      try {
        const { accessToken } = await updateToken(refreshToken);
        setTokens((prev) => ({ ...prev, accessToken }));
        setCookie("accessToken", accessToken);
        if (refreshPage) {
          window.location.reload(); // might make sense here
        }
      } catch (e) {
        logoutUser();
      }
    },
    [logoutUser]
  );

  useEffect(() => {
    const { accessToken, refreshToken } = getTokens();

    if (accessToken && refreshToken) {
      setTokens({
        accessToken,
        refreshToken,
      });
      return;
    }

    if (refreshToken) {
      handleRefreshToken(refreshToken);
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
      logoutUser,
      handleRefreshToken,
    }),
    [logoutUser, handleRefreshToken, tokens?.accessToken, tokens?.refreshToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

function getTokens() {
  function getTokenFromCookies(key: string) {
    const token = getCookie(key);

    return !!token && token !== "undefined" ? token : null;
  }
  const accessToken = getTokenFromCookies("accessToken");
  const refreshToken = getTokenFromCookies("refreshToken");

  return {
    accessToken,
    refreshToken,
  };
}
