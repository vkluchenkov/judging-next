export interface LoginProps {
  onLogin: (loginPayload: LoginPayload) => void;
  isError: string | null;
  setIsError: (state: string | null) => void;
}

export interface LoginPayload {
  username: string;
  password: string;
}
