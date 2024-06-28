import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/interfaces/auth";

interface AuthState {
  userData: User | null;
  isAuthenticated: boolean;
  isGuest: boolean;
}

const initialState: AuthState = {
  userData: null,
  isAuthenticated: false,
  isGuest: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
      state.isGuest = false;
    },
    clearUser: (state) => {
      state.userData = null;
      state.isAuthenticated = false;
      state.isGuest = false;
    },
    logAsGuest: (state) => {
      state.userData = null;
      state.isAuthenticated = false;
      state.isGuest = true;
    },
  },
});

export const { setUser, clearUser, logAsGuest } = authSlice.actions;
export default authSlice.reducer;
