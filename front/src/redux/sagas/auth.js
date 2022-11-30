import axios from "axios";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";

import {LOG_IN_SUCCESS, LOG_IN_FAILURE,LOG_IN_REQUEST,LOG_OUT_REQUEST,LOG_OUT_SUCCESS, LOG_OUT_FAILURE} from '../reducers/auth'

//Login 로그인
const loginUserAPI = (code) => {
  console.log(code, "code");
  const config = {
    headers: {
      "Content-Type": 'application/json',
    },
  };
  return axios.post("api/auth", {code: code}, config);
};

function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);
    console.log(result);
    yield put({
      type: LOG_IN_SUCCESS,
      payload: result.data,
    });
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


export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogout)
  ]);
}
