import { instance } from "../api/axios";
import type { UpdateProfileRequest, User } from "../types";

export const getMe = () => {
  return instance
    .get<User>("/users/me")
    .then((response) => response.data);
};

export const updateProfile = (data: UpdateProfileRequest) => {
  return instance
    .patch<void>("/users/profile", data)
    .then((response) => response.data);
};