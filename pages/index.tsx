import { useState, useEffect } from 'react';
import { LoginPayload } from '@/src/components/Login/types';
import { Main } from '@/src/components/Main';
import { Login } from '@/src/components/Login';
import io from 'socket.io-client';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { ErrorDto, LoginDto } from '@/src/api/types';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
  const [judgeName, setJudgeName] = useState('');

  useEffect(() => {
    if (socket)
      socket.on('loggedIn', (data: LoginDto) => {
        setJudgeName(data.judge.name);
        setIsLoggedIn(true);
      });
  }, [socket]);

  // Error handling
  useEffect(() => {
    if (socket)
      socket.on('error', (data: ErrorDto) => {
        console.log(data);
      });
  }, [socket]);

  const handleLogout = () => setIsLoggedIn(false);

  const handleLogin = (loginPayload: LoginPayload) => {
    if (socket) socket.emit('login', loginPayload);
    else {
      // Here goes connection error
    }
  };

  // Initialize backend service and set socket after
  useEffect(() => {
    const init = async () => {
      await fetch('/api/socket');
      setSocket(io());
    };

    init();
  }, []);

  return isLoggedIn ? <Main judgeName={judgeName} /> : <Login onLogin={handleLogin} />;
}
