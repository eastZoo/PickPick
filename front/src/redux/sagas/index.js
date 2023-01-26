import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import authSaga from './authSaga';
import { backUrl } from '../../config/config';
import postSaga from './postSaga';
import wishSaga from './wishSaga';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true; // sagas에서 보내는 axios요청들에는 전부 공통적으로 적용된다!

// *표는 일반함수는 값을 하나만 반환할 수 있지만 반환을 여러개 할 수 있게 도와주는 최신문법
export default function* rootSaga() {
  yield all([ // all은 동시에 실행할 수 있게 도와줌
    fork(authSaga),
    fork(postSaga),
    fork(wishSaga),
  ]);
}
