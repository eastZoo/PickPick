import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostsData } from "../../lib/data/list_dummy";
import { backUrl } from "../../config/config";;

axios.defaults.baseURL = backUrl; // aws back서버에 ip주소로 변경

const initialState = {
  loading: false,
  posts: [],
  error: '',
  current: null,
};

// 카카오 로그인시 토큰 로직
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

export const fetchPosts = createAsyncThunk("post/fetchPosts", () => {
  return axios.get('/posts').then((res) => res.data);
});


export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    //state는 initialState 현재값에 접근하는 변수이다.
    addPost: (state, action) => {
      state.value.push(action.payload);
      console.log(state.value[-1]);
    },
    current : (state, action ) => {
      state.current = action.payload;
      console.log(state.current);
    }
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.loading = true
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.loading = false
      state.posts = action.payload
      state.error = ''
    },
    [fetchPosts.rejected]: (state, action) => {
      state.loading = false
      state.posts = []
      state.error = action.error.message
    },
  },
});

export const { addPost } = postSlice.actions;

export default postSlice.reducer;









