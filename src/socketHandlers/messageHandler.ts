import { LoginPayload } from '../components/Login/types';
import { loginHandler } from './loginHandler';
import { Io, IoSocket } from '../types/socket';
import { getMeHandler } from './getMeHandler';

interface MessageHandlerProps {
  io: Io;
  socket: IoSocket;
}

export const messageHandler = ({ io, socket }: MessageHandlerProps) => {
  socket.emit('hello', 'Welcome to competition socket.io server');

  // Auth
  socket.on('login', async (loginPayload: LoginPayload) => {
    // Errors handled inside
    await loginHandler({ loginPayload, socket, io });
  });

  socket.on('getMe', async (token: string) => {
    // Errors handled inside
    await getMeHandler({ token, io, socket });
  });
};
