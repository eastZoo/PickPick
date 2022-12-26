import axios from "axios";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
  LOAD_MYSHARED_SUCCESS,
  LOAD_MYSHARED_FAILURE,
  LOAD_MYSHARED_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
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
  return axios.post("/video", { url: data.url, categoryId: 1, userId: data.userId }, config);
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

// POST 게시글 댓글
function addCommentAPI(data) {
  console.log(data);
  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };
  config.headers["X-AUTH-TOKEN"] = data.token;
  return axios.post(`/video/${data.videoId}/comment`, { comment: data.commentText }, config);
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
//END

// GET 마이페이지 내가 공유한 글
function loadMySharedAPI(data) {
  console.log(data);
  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };
  config.headers["X-AUTH-TOKEN"] = data.token;
  return axios.get("/user/mypage", config);
}

function* loadMyShared(action) {
  try {
    console.log(action.data);
    const result = yield call(loadMySharedAPI, action.data);
    console.log(result)
    yield put({
      type: LOAD_MYSHARED_SUCCESS,
      data: result.data.detail,
    });
  } catch (err) {
    yield put({
      type: LOAD_MYSHARED_FAILURE,
      error: err.response.data
    });
  }
}

function* watchLoadMyShared() {
  yield takeLatest(LOAD_MYSHARED_REQUEST, loadMyShared);
}
//END

// GET 마이페이지 내가 공유한 글
// 게시글 하나만 불러오는 경우
function loadPostAPI(data) {
  console.log(data);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  config.headers["X-AUTH-TOKEN"] = data.token;
  return axios.get(`/video/${data.videoId}`, config);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    console.log(result)
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data.detail,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}
//END


// POST 좋아요 추가
function likePostAPI(data) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  config.headers["X-AUTH-TOKEN"] = data.token;
  return axios.post(`/video/${data.videoId}/like`, {}, config); // 좋아요개수 하나 올려주는 거니까 patch
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    console.log("result:", result);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data.detail,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}
//END

// DELETE 좋아요 삭제
function unlikePostAPI(data) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  config.headers["X-AUTH-TOKEN"] = data.token;
  return axios.delete(`/video/${data.videoId}/like`, config);
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    console.log(result.data.detail)
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data.detail,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchDeleteComment),
    fork(watchLoadMyShared),
    fork(watchLoadPost),
    fork(watchLikePost),
    fork(watchUnlikePost),
  ]);
}
