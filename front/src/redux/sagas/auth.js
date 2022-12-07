import axios from "axios";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import {
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
} from "../reducers/auth";
import jwt_decode from "jwt-decode";
import { customHistory } from "../../store";

//Login 로그인
const loginUserAPI = (code) => {
  console.log("SAGAS code :", code);
  const config = {
    headers: {
      "Content-Type": 'application/json',
    },
  };
  return axios.post("/oauth", code, config); // code로 안넘어가면  { code }
};

function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);
    const userInfo = jwt_decode(result.data.detail); // 토큰 decode
    yield put({
      type: LOG_IN_SUCCESS,
      payload: { result, userInfo },
    });
    customHistory.replace("/");
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
function* logout() {
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
    fork(watchLogout),
  ]);
}
