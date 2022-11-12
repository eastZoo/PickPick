import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostsData } from '../../lib/data/list_dummy'

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    value: PostsData,
  },
  reducers: {
    //state는 initialState 현재값에 접근하는 변수이다.
    addPost: (state, action ) => {
      
    }
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  }
});

export const { increment, decrement, incrementByAmount } = postsSlice.actions;

export default postsSlice.reducer;