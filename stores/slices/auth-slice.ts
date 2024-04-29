// stores/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CognitoUser } from "amazon-cognito-identity-js";

interface AuthState {
  userData: {
    email: string;
    emailVerified: boolean;
    userId: string;
  } | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  userData: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState["userData"]>) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.userData = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
