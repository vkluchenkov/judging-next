import { LoginPayload } from '../components/Login/types';
import { LoginHandler } from './loginHandler';
import { Io, IoSocket } from '../types/socket';
import { handleAxiosError } from '../errors/handleAxiosError';
import axios, { AxiosError } from 'axios';

interface MessageHandlerProps {
  io: Io;
  socket: IoSocket;
}

export const messageHandler = ({ io, socket }: MessageHandlerProps) => {
  socket.emit('hello', 'Welcome to competition socket.io server');

  socket.on('login', async (loginPayload: LoginPayload) => {
    try {
      await LoginHandler({ loginPayload, socket, io });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError;
        handleAxiosError({ err, socket });
      } else console.log(error);
    }
  });
};
