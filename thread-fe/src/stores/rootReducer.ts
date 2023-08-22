import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slice/authSlice";

export const { AUTH_CHECK, AUTH_LOGIN, AUTH_ERROR, AUTH_LOGOUT } =
  authSlice.actions;

export const authReducer = authSlice.reducer;

const rootReducer = combineReducers({
  user: authReducer,
});

export default rootReducer;
