import { LoginPayload } from '../components/Login/types';
import { LoginHandler } from './loginHandler';
import { Io, IoSocket } from '../types/socket';
import { handleSocketError } from '../errors/handleSocketError';
import { ServerError } from '../errors/ServerError';
import { AxiosError } from 'axios';

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
      const err = error as AxiosError;
      handleSocketError({ err, socket });
    }
  });
};
