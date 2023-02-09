import { ReactNode, createContext, useContext, useState } from 'react';

export interface AuthContextType {
  token: string;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: '',
  isAuthenticated: false,
  authenticate: (token: string) => {},
  logout: () => {},
});

export function useAuthContext(): AuthContextType {
  const authContext = useContext(AuthContext);

  if (authContext == null) {
    throw new Error("Auth context isn't available!");
  }

  return authContext;
}

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState('');

  const authenticate = (token: string) => {
    setToken(token);
  };
  const logout = () => {
    setToken('');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        authenticate,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
