import { NextApiResponseServerIO } from '@/src/types/socket';
import { NextApiRequest } from 'next';
import { Server as ServerIO } from 'socket.io';
import { Server as NetServer } from 'http';
import { LoginPayload } from '@/src/components/Login/types';
import { messageHandler } from '@/src/socketHandlers/messageHandler';

export const config = {
  api: {
    bodyParser: false,
  },
};

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer);
    res.socket.server.io = io;

    io.on('connection', (socket) => messageHandler({ io, socket }));
  }
  res.end();
};

export default SocketHandler;
