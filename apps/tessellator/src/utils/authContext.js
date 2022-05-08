import { login, logout, updateToken } from "../backendClient";
import Loader from "../components/dom/Loader";
import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { getState } from "./store";
import { setAccessToken } from "../spotifyClient";

const AuthContext = createContext({
  isAuthenticated: false,
  isisLoading: false,
  accessToken: null,
  refreshToken: null,
});

export const AuthProvider = ({ router, children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tokens, setTokens] = useState(null);

  // move to get authorized / unauth app
  useEffect(() => {
    async function loadUserFromCookies() {
      const accessToken =
        router.query?.access_token || Cookies.get("access_token");
      const refreshToken =
        router.query?.refresh_token ||
        Cookies.get("refresh_token") ||
        getState().refreshToken;

      // best case
      if (accessToken && refreshToken) {
        // login?
        setAccessToken(accessToken);
        setTokens({
          accessToken,
          refreshToken,
        });
      } else if (refreshToken) {
        const tokens = await updateToken(refreshToken);
        if (tokens) {
          setAccessToken(tokens.accessToken);
          setTokens(tokens);
        }
      }

      setIsLoading(false);
    }

    loadUserFromCookies();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!tokens?.accessToken,
        accessToken: tokens?.accessToken,
        refreshToken: tokens?.refreshToken,
        login,
        isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = ({ router, children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  console.log(router.pathname, isAuthenticated, isLoading);
  if (isLoading || (!isAuthenticated && router.pathname !== "/")) {
    return <Loader />;
  }
  return children;
};
