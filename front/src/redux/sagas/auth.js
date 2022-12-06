import axios from "axios";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import { history } from "../../store";

import {
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  USER_LOADING_SUCCESS,
  USER_LOADING_FAILURE,
  USER_LOADING_REQUEST,
} from "../reducers/auth";

//Login 로그인
const loginUserAPI = (code) => {
  console.log(code, "code");
  const config = {
    headers: {
      "Content-Type": 'application/json',
    },
  };
  return axios.post("/oauth", { code: code }, config);
};

function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);
    console.log(result.data.detail);
    yield put({
      type: LOG_IN_SUCCESS,
      payload: result.data.detail, // detail : "token"
    });
    history.replace("/");
  } catch (e) {
    yield put({
      type: LOG_IN_FAILURE,
      payload: e.response,
    });
  }
}

//LOG_IN_REQUEST가 들어오면 loginUser함수를 실행시켜라라는 뜻 순서 1번
function* watchLoginUser() {
  yield takeLatest(LOG_IN_REQUEST, loginUser);
}

//LogOut 로그아웃
function* logout(action) {
  try {
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: LOG_OUT_FAILURE,
    });
    console.log(e);
  }
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

// User Loading 로그인유지
// 로그인과 다른점 토큰 값만 넘겨주면 된다.
const userLoadingAPI = (token) => {
  console.log(token)
  const config = {
    headers: {
      "Content-Type": 'application/json',
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token
  }
  // 토큰을 가지고 유저를 확인하는 것 post가아니라 get
  return axios.get("api/auth/user", config);
};

function* userLoading(action) {
  try {
    console.log(action, "userLoading");
    const result = yield call(userLoadingAPI, action.payload);
    console.log(result);
    yield put({
      type: USER_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: USER_LOADING_FAILURE,
      payload: e.response,
    });
  }
}

//LOG_IN_REQUEST가 들어오면 loginUser함수를 실행시켜라라는 뜻 순서 1번
function* watchLoginLoading() {
  yield takeLatest(USER_LOADING_REQUEST, userLoading);
}


export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogout),
    fork(watchLoginLoading)
  ]);
}
