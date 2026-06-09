import { createContext, useState, useCallback } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const SESSION_KEY = 'auth_token';
const REFRESH_KEY = 'refresh_token';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem(SESSION_KEY));

  const login = useCallback((accessToken, refreshToken) => {
    sessionStorage.setItem(SESSION_KEY, accessToken);
    sessionStorage.setItem(REFRESH_KEY, refreshToken);
    setToken(accessToken);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(REFRESH_KEY);
    setToken(null);
  }, []);

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
