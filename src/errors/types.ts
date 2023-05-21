import { AxiosError } from 'axios';
import { IoSocket } from '../types/socket';
import { ServerError } from './ServerError';

export interface HandleSocketErrorArgs {
  // err: ServerError;
  err: AxiosError;
  socket: IoSocket;
}
