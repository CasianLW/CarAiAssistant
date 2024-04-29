import { configureStore } from "@reduxjs/toolkit";
// import reservationReducer from "./slices/reservationSlice";
// import carReducer from "./slices/carSlice";
import authReducer from "./slices/auth-slice";

const store = configureStore({
  reducer: {
    // reservation: reservationReducer,
    // car: carReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
