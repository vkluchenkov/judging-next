import { ErrorDto } from '../api/types';
import { HandleAxiosErrorArgs } from './types';

export const handleAxiosError = ({ err, socket }: HandleAxiosErrorArgs) => {
  const statusCode = err.response?.status || 500;
  const message = err.response?.status ? err.response?.statusText : 'Server error';

  const errorPayload: ErrorDto = { statusCode, message };
  socket.emit('error', errorPayload);
};
