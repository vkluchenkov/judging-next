import { Server as ServerIO } from 'socket.io';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io';
import { LoginPayload } from '../components/Login/types';
import axios from 'axios';

interface MessageHandlerProps {
  io: ServerIO<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
}

export const messageHandler = ({ io, socket }: MessageHandlerProps) => {
  socket.emit('hello', 'Welcome to competition socket.io server');

  socket.on('login', async (loginPayload: LoginPayload) => {
    console.log(loginPayload);
    await axios
      .post('http://192.168.1.45:1337/api/auth/local/', {
        identifier: loginPayload.username,
        password: loginPayload.password,
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  });
};
