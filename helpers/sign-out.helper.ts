import { clearUser, setToken } from "@/stores/slices/auth-slice";
import { Dispatch } from "@reduxjs/toolkit";

export const signOut = async (dispatch: Dispatch) => {
  try {
    // await Auth.signOut();
    dispatch(clearUser());
    dispatch(setToken(null));
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};
