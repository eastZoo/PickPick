import axios from "axios";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_COMMENT_REQUEST,
  LOAD_COMMENT_SUCCESS,
  LOAD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
} from "../reducers/post";

// GET posts 전체 불러오기 메인
function loadPostsAPI() {
  return axios.get("/video");
}

function* loadPosts() {
  try {
    const result = yield call(loadPostsAPI);
    console.log(result.data);
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
// END

// POST 유튜브 공유
function addPostAPI(data) {
  console.log(data);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  config.headers["X-AUTH-TOKEN"] = data.token;
  console.log(data.userId)
  return axios.post("/video", { url: data.url, categoryId: 1, userId : data.userId }, config);
}

function* addPost(action) {
  try {
    console.log(action.payload);
    const result = yield call(addPostAPI, action.payload);
    console.log(result);
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
// END


// GET 게시글 댓글
function loadCommentAPI(data) {
  console.log(data);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    params: { video_id: data.videoId },
  };
  config.headers["X-AUTH-TOKEN"] = data.token;
  return axios.get(`/video/${data.videoId}`, config);
}

function* loadComment(action) {
  try {
    console.log(action);
    const result = yield call(loadCommentAPI, action.data);
    console.log(result.data.detail);
    yield put({
      type: LOAD_COMMENT_SUCCESS,
      data: result.data.detail,
    });
  } catch (err) {
    yield put({
      type: LOAD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchloadComment() {
  yield takeLatest(LOAD_COMMENT_REQUEST, loadComment);
}
// END


// POST 게시글 댓글
function addCommentAPI(data) {
  console.log(data);
  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };
  config.headers["X-AUTH-TOKEN"] = data.token;
  return axios.post(`/video/${data.videoId}/comment`, { comment : data.commentText }, config);
}

function* addComment(action) {
  try {
    console.log(action.data);
    const result = yield call(addCommentAPI, action.data);
    console.log(result);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
//END

// DELETE 게시글 댓글
function deleteCommentAPI(data) {
  console.log(data);
  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };
  config.headers["X-AUTH-TOKEN"] = data.token;
  return axios.delete(`/video/${data.videoId}/comment/${data.commentId}`, config);
}

function* deleteComment(action) {
  try {
    console.log(action.data);
    const result = yield call(deleteCommentAPI, action.data);
    console.log(result.data);
    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      data: result.data.detail,
    });
  } catch (err) {
    yield put({
      type: REMOVE_COMMENT_FAILURE,
      error: err.response.data
    });
  }
}

function* watchDeleteComment() {
  yield takeLatest(REMOVE_COMMENT_REQUEST, deleteComment);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchloadComment),
    fork(watchAddComment),
    fork(watchDeleteComment)
  ]);
}
