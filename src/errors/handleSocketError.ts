import { ErrorDto } from '../api/types';
import { HandleSocketErrorArgs } from './types';

export const handleSocketError = ({ err, socket }: HandleSocketErrorArgs) => {
  const statusCode = err.response?.status || 500;
  const message = err.response?.status ? err.response?.statusText : 'Server error';

  const errorPayload: ErrorDto = { statusCode, message };
  socket.emit('error', errorPayload);
};
