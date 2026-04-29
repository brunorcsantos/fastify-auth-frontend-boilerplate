export interface User {
  id: string;
  email: string;
  name: string;
  provider: Provider;
  providerId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends User {
  token: string;
  refreshToken: string;
  message: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface ApiError {
  message: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  id: string;
}

export interface UpdateProfileRequest {
  id: string;
  name?: string;
  currentPassword: string;
  newPassword?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<LoginResponse>;
  logout: (data: LogoutRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<User>;
}



export type Provider = "local" | "google" | "github" | "facebook" | "instagram";
export type Mode = "system" | "light" | "dark"

export interface ThemeContextType {
  mode: Mode;
  toggleTheme: (mode: Mode) => void
}
