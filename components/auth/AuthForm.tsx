import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../ui/Button';
import Input from './Input';

interface Props {
  isLogin: boolean;
  onSubmit: (value: {
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
  }) => void;
  credentialsInvalid: {
    email: boolean;
    confirmEmail: boolean;
    password: boolean;
    confirmPassword: boolean;
  };
}

export default function AuthForm({
  isLogin,
  onSubmit,
  credentialsInvalid,
}: Props) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  const updateInputValueHandler = (inputType: string, enteredValue: string) => {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'confirmEmail':
        setEnteredConfirmEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  };

  const submitHandler = () => {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  };

  return (
    <View style={styles.form}>
      <View>
        <Input
          label='Email Address'
          onUpdateValue={(enteredText) =>
            updateInputValueHandler('email', enteredText)
          }
          value={enteredEmail}
          keyboardType='email-address'
          isInvalid={emailIsInvalid}
        />
        {!isLogin && (
          <Input
            label='Confirm Email Address'
            onUpdateValue={(enteredText) =>
              updateInputValueHandler('confirmEmail', enteredText)
            }
            value={enteredConfirmEmail}
            keyboardType='email-address'
            isInvalid={emailsDontMatch}
          />
        )}
        <Input
          label='Password'
          onUpdateValue={(enteredText) =>
            updateInputValueHandler('password', enteredText)
          }
          secure={true}
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label='Confirm Password'
            onUpdateValue={(enteredText) =>
              updateInputValueHandler('confirmPassword', enteredText)
            }
            secure={true}
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
  form: {},
});
