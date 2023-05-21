import { LoginPayload } from '../components/Login/types';
import axios from 'axios';
import { Io, IoSocket } from '../types/socket';
import { api } from '../api';

interface LoginHandlerProps {
  loginPayload: LoginPayload;
  io: Io;
  socket: IoSocket;
}

export const LoginHandler = async ({ loginPayload, io, socket }: LoginHandlerProps) => {
  const res = await api.login(loginPayload);

  if (res) {
    const { judge, token } = res;
    socket.emit('loggedIn', { judge, token });
  } else {
    // Unauthorized error
  }
};
