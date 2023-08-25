import { createSlice } from "@reduxjs/toolkit";
import { ThreadCardType } from "../../types/interface/IType";

const initialThreadState: ThreadCardType = {
  id: 0,
  author_full_name: "",
  author_picture: "",
  author_username: "",
  posted_at: "",
  content: "",
  image: "",
  replies_count: 0,
  likes_count: 0,
  liked: 0,
  date: "",
};

export const threadSlice = createSlice({
  name: "thread",
  initialState: initialThreadState,
  reducers: {
    THREAD_GET: (state, action) => {},
  },
});
