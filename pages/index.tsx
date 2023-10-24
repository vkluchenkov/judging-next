import { useState, useEffect, useCallback } from 'react';
import { LoginPayload } from '@/src/components/Login/types';
import { Main } from '@/src/components/Main';
import { Login } from '@/src/components/Login';
import io from 'socket.io-client';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { ErrorDto, LoginDto } from '@/src/api/types';
import { ContestInfo } from '@/src/types/main';
import { Loader } from '@/src/components/Loader';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
  const [contestInfo, setContestInfo] = useState<ContestInfo>({
    contestName: 'Dance Weekend in Warsaw',
    judge: undefined,
    currentCategory: 'Adults Professionals semi-final',
  });
  const [loginError, setloginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(false);

  // Handle succesfull login
  const onLogin = useCallback((data: LoginDto) => {
    setIsLoggedIn(true);
    localStorage.setItem('token', data.token);

    setContestInfo((prev) => {
      return { ...prev, judge: data.judge };
    });

    setloginError(null);
    setIsLoading(false);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsLoading(false);
  }, []);

  // Initialize backend service and set socket after
  useEffect(() => {
    const init = async () => {
      await fetch('/api/socket');
      setSocket(io());
    };

    init();
  }, []);

  // Returning user auth
  useEffect(() => {
    setIsLoading(true);
    if (socket) {
      const token = localStorage.getItem('token');
      if (token && !isTokenChecked) {
        socket.emit('getMe', token);
        setIsTokenChecked(true);
      } else handleLogout();
    }
  }, [socket, isTokenChecked, handleLogout]);

  // Returning user auth error handling
  useEffect(() => {
    socket?.on('getMeError', handleLogout);
  }, [socket, handleLogout]);

  // Handle login data
  useEffect(() => {
    socket?.on('loggedIn', (data: LoginDto) => onLogin(data));
  }, [socket, onLogin]);

  // Generic socket error handling
  useEffect(() => {
    socket?.on('error', (data: ErrorDto) => {
      console.log(data);
    });
  }, [socket]);

  // Login error handling
  useEffect(() => {
    socket?.on('loginError', () => setloginError('Incorrect username or password'));
  }, [socket]);

  const handleLogin = (loginPayload: LoginPayload) => {
    if (socket) socket.emit('login', loginPayload);
    else setloginError('Connection error. Please try again later');
  };

  if (isLoading) return <Loader />;

  return isLoggedIn ? (
    <Main contestInfo={contestInfo} />
  ) : (
    <Login onLogin={handleLogin} isError={loginError} setIsError={setloginError} />
  );
}
