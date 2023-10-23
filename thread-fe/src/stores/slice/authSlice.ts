import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/interface/IType";

const initialAuthState: UserType = {
  id: 0,
  username: "",
  full_name: "",
  email: "",
  profile_picture: "",
  profile_background: "",
  profile_description: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    AUTH_LOGIN: (_, action) => {
      const payload = action.payload;
      console.log("redux auth login :", payload);
      localStorage.setItem("token", payload.token);
      const user: UserType = {
        id: payload.user.id,
        username: payload.user.username,
        full_name: payload.user.full_name,
        email: payload.user.email,
        profile_picture: payload.user.profile_picture,
        profile_background: payload.user.profile_background,
        profile_description: payload.user.profile_description,
      };
      return user;
    },
    AUTH_CHECK: (_, action) => {
      const payload = action.payload;
      console.log("redux auth check :", payload);
      const user: UserType = {
        id: payload.id,
        username: payload.username,
        full_name: payload.full_name,
        email: payload.email,
        profile_picture: payload.profile_picture,
        profile_background: payload.profile_background,
        profile_description: payload.profile_description,
      };
      console.log("redux auth check :", user);

      return user;
    },
    AUTH_ERROR: () => {
      localStorage.removeItem("token");
    },
    AUTH_LOGOUT: () => {
      localStorage.removeItem("token");
      console.log("keluar");
    },
  },
});
