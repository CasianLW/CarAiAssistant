import { AiPayloadUnknown } from "@/interfaces/api-datas";
import {
  AuthResponse,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  User,
} from "@/interfaces/auth";
import axios from "axios";

const API_BASE_URL =
  "https://464f-2a01-e0a-2e3-f7f0-9e96-12f2-f2c8-35bc.ngrok-free.app";
// const API_BASE_URL = "https://vehicle-buy-assistant-1.onrender.com";
// const API_BASE_URL ="https://vehicle-app-50snsep17-casianlws-projects.vercel.app";
// const API_BASE_URL = "http://localhost:3000";

export const apiLogin = (payload: LoginPayload) => {
  return axios.post(`${API_BASE_URL}/auth/login`, payload);
};

export const apiRegister = (payload: RegisterPayload) => {
  return axios.post(`${API_BASE_URL}/auth/register`, payload);
};

export const apiForgotPassword = (payload: ForgotPasswordPayload) => {
  return axios.post(`${API_BASE_URL}/auth/forgot-password`, payload);
};

export const apiResetPassword = (payload: ResetPasswordPayload) => {
  return axios.post(`${API_BASE_URL}/auth/reset-password`, payload);
};

export const apiGetUserProfile = async (userId: string): Promise<User> => {
  return axios.get(`${API_BASE_URL}/users/${userId}`);
};

//vehicle infos ai
export const apiProcessVehicleData = (data: AiPayloadUnknown) => {
  return axios.post(`${API_BASE_URL}/vehicles/process`, data);
};
