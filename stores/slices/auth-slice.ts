import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/interfaces/auth";

interface AuthState {
  userData: User | null;
  // isAuthenticated: boolean;
  isGuest: boolean;
  token: string | null;
}

const initialState: AuthState = {
  userData: null,
  // isAuthenticated: false,
  isGuest: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
      // state.isAuthenticated = true;
      state.isGuest = false;
    },
    clearUser: (state) => {
      state.userData = null;
      // state.isAuthenticated = false;
      state.isGuest = false;
    },
    logAsGuest: (state) => {
      state.userData = null;
      // state.isAuthenticated = false;
      state.isGuest = true;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
});

export const { setUser, clearUser, logAsGuest, setToken } = authSlice.actions;
export default authSlice.reducer;
