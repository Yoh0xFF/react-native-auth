import { useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { useAuthContext } from '../store/AuthContext';
import { createUser } from '../util/auth';

export default function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { authenticate } = useAuthContext();

  const signupHandler = async (email: string, password: string) => {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not create user. Please check your input or try again later.'
      );
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message='Creating user...' />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}
