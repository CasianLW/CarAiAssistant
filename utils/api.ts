import { AiPayloadUnknown, RapportPayloadData } from "@/interfaces/api-datas";
import {
  AuthResponse,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  User,
} from "@/interfaces/auth";
import { HistoryItem } from "@/interfaces/history.interface";
import axios from "axios";

const API_BASE_URL = process.env.APP_API_URL;
// const API_BASE_URL =
// "https://a899-2a01-e0a-2e3-f7f0-700e-233f-7f6-29b0.ngrok-free.app";
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
  // console.log("url", API_BASE_URL);
  return axios.post(`${API_BASE_URL}/vehicles/process`, data);
};
export const apiRapportData = (data: RapportPayloadData) => {
  return axios.post(`${API_BASE_URL}/vehicles/rapport`, data);
};

// History part

// Fetch complete history
export const apiFetchAllHistory = async (
  userId: string,
  token: string
): Promise<HistoryItem[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/history/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Assuming the server sends back an array of history items
  } catch (error) {
    throw new Error("Unable to fetch history");
  }
};
