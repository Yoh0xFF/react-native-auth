import AuthContent from '../components/auth/AuthContent';

export default function SignupScreen() {
  return (
    <AuthContent
      onAuthenticate={(value: { email: string; password: string }) => {}}
    />
  );
}
