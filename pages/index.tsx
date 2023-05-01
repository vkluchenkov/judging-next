import { useState, useEffect } from 'react';
import { LoginPayload } from '@/src/components/Login/types';
import { Main } from '@/src/components/Main';
import { Login } from '@/src/components/Login';
import io from 'socket.io-client';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

  const handleLogout = () => setIsLoggedIn(false);

  const handleLogin = (loginPayload: LoginPayload) => {
    if (socket) {
      socket.emit('login', loginPayload);
    }
    setIsLoggedIn(true);
  };

  // Initialize backend service and set socket after
  useEffect(() => {
    const init = async () => {
      await fetch('/api/socket');
      setSocket(io());
    };

    init();
  }, []);

  return isLoggedIn ? <Main /> : <Login onLogin={handleLogin} />;
}
