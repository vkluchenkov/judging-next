import { Server as ServerIO } from 'socket.io';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io';
import { LoginPayload } from '../components/Login/types';

interface MessageHandlerProps {
  io: ServerIO<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
}

export const messageHandler = ({ io, socket }: MessageHandlerProps) => {
  socket.emit('hello', 'Welcome to competition socket.io server');

  socket.on('login', (loginPayload: LoginPayload) => {
    console.log(loginPayload);
  });
};
