import { Io, IoSocket } from '../types/socket';
import { api } from '../api';
import { Judge } from '../api/types';

interface GetMeHandlerProps {
  token: string;
  io: Io;
  socket: IoSocket;
}

export const getMeHandler = async ({ token, io, socket }: GetMeHandlerProps) => {
  try {
    const user = await api.getMe(token);
    const judge: Judge = user.data.judge;
    if (judge) socket.emit('loggedIn', { judge, token });
  } catch (error) {
    socket.emit('getMeError');
  }
};
