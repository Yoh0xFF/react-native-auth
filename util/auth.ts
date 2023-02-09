import axios from 'axios';

const baseUrl = 'https://identitytoolkit.googleapis.com/v1';
const apiKey = 'secret';

async function authenticate(
  mode: 'signInWithPassword' | 'signUp',
  email: string,
  password: string
): Promise<string> {
  const response = await axios.post(
    `${baseUrl}/accounts:${mode}?key=${apiKey}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );

  const token: string = response.data.idToken;
  return token;
}

export async function createUser(
  email: string,
  password: string
): Promise<string> {
  return await authenticate('signUp', email, password);
}

export async function login(email: string, password: string): Promise<string> {
  return await authenticate('signInWithPassword', email, password);
}
