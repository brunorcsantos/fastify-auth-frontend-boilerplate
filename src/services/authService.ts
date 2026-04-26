import { instance } from "../api/axios";
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RegisterRequest,
  LogoutRequest
} from "../types";

//login
export const loginService = (data: LoginRequest) => {
  return instance
    .post<LoginResponse>("/auth/login", data)
    .then((response) => response.data);
};

// register
export const registerService = (data: RegisterRequest) => {
  return instance
    .post<LoginResponse>("/auth/register", data)
    .then((response) => response.data);
};

// refresh
export const refresh = (data: RefreshTokenRequest) => {
  return instance
    .post<LoginResponse>("/auth/refresh", data)
    .then((response) => response.data);
};

// logout
export const logoutService = (data: LogoutRequest) => {
  return instance
    .post<void>("/auth/logout", data)
    .then((response) => response.data)
}
// loginWithGoogle
export const loginWithGoogle = () => {
  window.location.href = "http://localhost:3000/auth/google"
}
// loginWithGithub
export const loginWithGithub = () => {
  window.location.href = "http://localhost:3000/auth/github"
}
// loginWithFacebook
export const loginWithFacebook = () => {
  window.location.href = "http://localhost:3000/auth/facebook"
}
// loginWithInstagram
export const loginWithInstagram = () => {
  window.location.href = "http://localhost:3000/auth/instagram"
}
