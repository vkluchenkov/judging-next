import { useState } from "react";
import { LoginPayload } from "@/src/components/Login/types";
import { Main } from "@/src/components/Main";
import { Login } from "@/src/components/Login";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => setIsLoggedIn(false);

  const handleLogin = (loginPayload: LoginPayload) => {
    setIsLoggedIn(true);
  };

  return isLoggedIn ? <Main /> : <Login onLogin={handleLogin} />;
}
