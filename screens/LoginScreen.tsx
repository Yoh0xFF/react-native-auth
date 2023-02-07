import AuthContent from '../components/auth/AuthContent';

export default function LoginScreen() {
  return (
    <AuthContent
      isLogin
      onAuthenticate={(value: { email: string; password: string }) => {}}
    />
  );
}
