import { useState, useEffect } from 'react';
import { LoginPayload } from '@/src/components/Login/types';
import { Main } from '@/src/components/Main';
import { Login } from '@/src/components/Login';
import io from 'socket.io-client';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let socket;

  const handleLogout = () => setIsLoggedIn(false);

  const handleLogin = (loginPayload: LoginPayload) => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch('/api/socket');

    socket = io();

    socket.on('hello', (msg) => {
      console.log(msg);
    });
  };

  return isLoggedIn ? <Main /> : <Login onLogin={handleLogin} />;
}
