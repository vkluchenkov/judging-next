import { LoginPayload } from '../components/Login/types';
import { Io, IoSocket } from '../types/socket';
import { api } from '../api';

interface LoginHandlerProps {
  loginPayload: LoginPayload;
  io: Io;
  socket: IoSocket;
}

export const loginHandler = async ({ loginPayload, io, socket }: LoginHandlerProps) => {
  try {
    const res = await api.login(loginPayload);
    if (res) {
      const { judge, token } = res;
      socket.emit('loggedIn', { judge, token });
    }
  } catch (error) {
    socket.emit('loginError');
  }
};
