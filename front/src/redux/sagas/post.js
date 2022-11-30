import axios from "axios";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";

import { LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE } from '../reducers/post';

// posts 가져오기
function loadPostsAPI() {
  return axios.get('/api/posts');
}

function* loadPosts() {
  try {
    const result = yield call(loadPostsAPI);
    console.log(result.data);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      payload: result.data,
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

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
  ]);
}
