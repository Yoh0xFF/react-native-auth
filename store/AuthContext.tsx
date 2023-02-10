import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

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
    AsyncStorage.setItem('token', token);
  };
  const logout = () => {
    setToken('');
    AsyncStorage.removeItem('token');
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
