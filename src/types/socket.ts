import { Server as NetServer, Socket } from 'net';
import { NextApiResponse } from 'next';
import { Server as SocketIOServer, Socket as SocketIo } from 'socket.io';
import { DefaultEventsMap } from '@socket.io/component-emitter';

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type Io = SocketIOServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
export type IoSocket = SocketIo<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
