import axios from "axios";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import { LOAD_WISH_FAILURE, LOAD_WISH_REQUEST, LOAD_WISH_SUCCESS } from "../reducers/wishList";


// GET wish 전체 불러오기 
function loadWishAPI(data) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };
  config.headers["X-AUTH-TOKEN"] = data.token;
  return axios.get("/wishlist", config);
}

function* loadWish(action) {
  try {
    const result = yield call(loadWishAPI, action.payload);
    console.log(result.data.detail);
    yield put({
      type: LOAD_WISH_SUCCESS,
      data: result.data.detail,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_WISH_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadWish() {
  yield takeLatest(LOAD_WISH_REQUEST, loadWish);
}
// END

export default function* wishSaga() {
  yield all([
    fork(watchLoadWish),
  ]);
}
