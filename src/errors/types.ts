import { AxiosError } from 'axios';
import { IoSocket } from '../types/socket';

export interface HandleAxiosErrorArgs {
  err: AxiosError;
  socket: IoSocket;
}
