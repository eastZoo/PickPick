import axios from "axios";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import { ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, LOAD_POSTS_FAILURE, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS } from "../reducers/post";


// GET posts 전체 불러오기 메인
function loadPostsAPI() {
  return axios.get('/video');
}

function* loadPosts() {
  try {
    const result = yield call(loadPostsAPI);
    console.log(result.data)
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}
// end

// POST 유튜브 공유
function addPostAPI(data) {
  console.log(data)
  const config = {
    headers: {
      "Content-Type": 'application/json',
    },
  };
  config.headers["X-AUTH-TOKEN"] = data.token;
  return axios.post('/video', {url: data.url, categoryId: 1}, config); 
}

function* addPost(action) {
  try {
    console.log(action.payload);
    const result = yield call(addPostAPI, action.payload);
    console.log(result)
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data.detail,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}



export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost)
  ]);
}
