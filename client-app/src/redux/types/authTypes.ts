export interface AuthState {
  token: string | null;
  user: {
    id: string;
    username: string;
    role: string;
  } | null;
  isLoading: boolean;
  error: string | null;
}
