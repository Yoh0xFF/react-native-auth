import axios from 'axios';

const baseUrl = 'https://identitytoolkit.googleapis.com/v1';
const apiKey = 'secret';

async function authenticate(
  mode: 'signInWithPassword' | 'signUp',
  email: string,
  password: string
) {
  const response = await axios.post(
    `${baseUrl}/accounts:${mode}?key=${apiKey}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );

  console.log(response.data);
}

export async function createUser(email: string, password: string) {
  await authenticate('signUp', email, password);
}

export async function login(email: string, password: string) {
  await authenticate('signInWithPassword', email, password);
}
