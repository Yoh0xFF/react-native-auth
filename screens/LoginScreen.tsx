import { useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { useAuthContext } from '../store/AuthContext';
import { login } from '../util/auth';

export default function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { authenticate } = useAuthContext();

  const loginHandler = async (email: string, password: string) => {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later.'
      );
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message='Logging you in...' />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}
