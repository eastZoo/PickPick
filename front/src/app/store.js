import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice";

export default configureStore({
  reducer: {
    post: postReducer,
  },
});