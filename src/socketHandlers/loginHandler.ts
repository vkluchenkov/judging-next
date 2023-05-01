import { LoginPayload } from '../components/Login/types';
import { Server as ServerIO } from 'socket.io';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io';

interface LoginHandlerProps {
  loginPayload: LoginPayload;
  io: ServerIO<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
}

export const LoginHandler = (args: LoginHandlerProps) => {
  const { loginPayload, io, socket } = args;
};
