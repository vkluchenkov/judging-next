import axios from 'axios';
import { LoginPayload } from '../components/Login/types';
import { ApiOptions, Judge } from './types';

class StrapiApi {
  _url: string;

  constructor({ url }: ApiOptions) {
    this._url = url;
  }

  getMe = async (token: string) => {
    return await axios.get(`${this._url}/users/me?populate=*`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  // Returns judge and token or null
  login = async ({ username, password }: LoginPayload) => {
    const response = await axios.post(`${this._url}/auth/local/`, {
      identifier: username,
      password: password,
    });

    if (response) {
      const token: string = response.data.jwt;
      const user = await this.getMe(token);
      const judge: Judge = user.data.judge;
      if (judge) return { judge, token };
      return null;
    }
    return null;
  };
}

export const api = new StrapiApi({
  url: process.env.API_URL!,
});
