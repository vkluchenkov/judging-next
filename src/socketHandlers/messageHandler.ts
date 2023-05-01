import { Server as ServerIO } from 'socket.io';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io';
import { LoginPayload } from '../components/Login/types';
import { LoginHandler } from './loginHandler';

interface MessageHandlerProps {
  io: ServerIO<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
}

export const messageHandler = ({ io, socket }: MessageHandlerProps) => {
  socket.emit('hello', 'Welcome to competition socket.io server');

  socket.on('login', async (loginPayload: LoginPayload) => {
    try {
      await LoginHandler({ loginPayload, socket, io });
    } catch (error) {
      console.log(error);
    }
  });
};
