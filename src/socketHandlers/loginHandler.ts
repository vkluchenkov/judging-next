import { LoginPayload } from '../components/Login/types';
import { Server as ServerIO } from 'socket.io';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io';
import axios from 'axios';

interface LoginHandlerProps {
  loginPayload: LoginPayload;
  io: ServerIO<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
}

export const LoginHandler = async (args: LoginHandlerProps) => {
  const { loginPayload, io, socket } = args;
  const apiUrl = process.env.API_URL!;

  const response = await axios.post(`${apiUrl}/auth/local/`, {
    identifier: loginPayload.username,
    password: loginPayload.password,
  });

  if (response) {
    const token = response.data.jwt;
    const user = await axios.get(`${apiUrl}/users/me?populate=*`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(user.data);
  }
};
