import { LoginPayload } from '../components/Login/types';
import { LoginHandler } from './loginHandler';
import { Io, IoSocket } from '../types/socket';
import { handleAxiosError } from '../errors/handleAxiosError';
import axios, { AxiosError } from 'axios';
import { api } from '../api';
import { Judge } from '../api/types';

interface MessageHandlerProps {
  io: Io;
  socket: IoSocket;
}

export const messageHandler = ({ io, socket }: MessageHandlerProps) => {
  socket.emit('hello', 'Welcome to competition socket.io server');

  socket.on('login', async (loginPayload: LoginPayload) => {
    try {
      await LoginHandler({ loginPayload, socket, io });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError;
        handleAxiosError({ err, socket });
      } else console.log(error);
    }
  });

  socket.on('getMe', async (token: string) => {
    try {
      const user = await api.getMe(token);
      const judge: Judge = user.data.judge;
      if (judge) socket.emit('loggedIn', { judge, token });
    } catch (error) {
      console.log(111);
      socket.emit('getMeError');
    }
  });
};
