import { createSlice } from "@reduxjs/toolkit";
import { ThreadCardType } from "../../types/interface/IType";

const initialThreadState: { threads: ThreadCardType[] } = { threads: [] };

export const threadSlice = createSlice({
  name: "thread",
  initialState: initialThreadState,
  reducers: {
    THREAD_GET: (state, action) => {
      state.threads = action.payload;
    },
    SET_THREAD_LIKE: (
      state,
      action: { payload: { id: number; isLiked: boolean } }
    ) => {
      const { id, isLiked } = action.payload;

      state.threads = state.threads.map((thread) => {
        if (thread.id === id) {
          return {
            ...thread,
            likes_count: isLiked
              ? (thread.likes_count as number) - 1
              : (thread.likes_count as number) + 1,
            is_liked: !isLiked,
          };
        }
        return thread;
      });
    },
  },
});
