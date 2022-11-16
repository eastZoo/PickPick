import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backUrl } from "../../config/config";;

axios.defaults.baseURL = backUrl; // aws back서버에 ip주소로 변경

const initialState = {
  loading: false,
  posts: [],
  error: '',
  current: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
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

export const addPost = createAsyncThunk("post/addNewPost", async (data) => {
  // post뒤에 .then 안붙혀서 데이터가 넘어오지 않았음 메모 ( 실수방지메모 )
  const response = await axios.post('/post', { post: data }).then((res) => res.data)
  return response
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    //state는 initialState 현재값에 접근하는 변수이다.
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
    // 공유 글 추가
    [addPost.pending]: (state) => {
      state.addPostLoading = true;
      state.addPostDone = false;
      state.addPostError = null;
    },
    [addPost.fulfilled]: (state, action) => {
      state.addPostLoading = false;
      state.addPostDone = true;
      state.posts.unshift(action.payload)
      console.log(action.data);
    },
    [addPost.rejected]: (state, action) => {
      state.addPostLoading = false;
      state.addPostError = action.error;
      state.error = action.error.message
    },
  },
});

export const selectAllPosts = (state) => state.post.posts
// export const { addPost } = postSlice.actions;

export default postSlice.reducer;









