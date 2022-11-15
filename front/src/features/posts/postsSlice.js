import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostsData } from "../../lib/data/list_dummy";
import { backUrl } from "../../config/config";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = backUrl; // aws back서버에 ip주소로 변경


export const kakaoLogin = createAsyncThunk("GET/LOGIN", async (code) => {
  await axios
    .get(`/login/${code}`)
    .then((res) => {
      console.log(res); // 토큰이 넘어올 것임
      const ACCESS_TOKEN = res.data;
      localStorage.setItem("token", ACCESS_TOKEN); //예시로 로컬에 저장함
    })
    .catch((error) => error);
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    value: PostsData,
  },
  reducers: {
    //state는 initialState 현재값에 접근하는 변수이다.
    addPost: (state, action) => {
      state.value.push(action.payload);
      console.log(state.value[-1]);
    },
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: {
    [kakaoLogin.fulfilled]: (state, { payload }) => [...payload],
  },
});

export const { addPost } = postsSlice.actions;

export default postsSlice.reducer;
