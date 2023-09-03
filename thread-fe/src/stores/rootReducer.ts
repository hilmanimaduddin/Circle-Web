import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slice/authSlice";
import { threadSlice } from "./slice/threadSlice";

export const { AUTH_CHECK, AUTH_LOGIN, AUTH_ERROR, AUTH_LOGOUT } =
  authSlice.actions;

export const { THREAD_GET } = threadSlice.actions;

export const authReducer = authSlice.reducer;
export const threadReducer = threadSlice.reducer;

const rootReducer = combineReducers({
  user: authReducer,
  thread: threadReducer,
});

export default rootReducer;
