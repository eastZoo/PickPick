import axios from "axios";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import { ADD_WISH_FAILURE, ADD_WISH_REQUEST, ADD_WISH_SUCCESS, LOAD_WISH_FAILURE, LOAD_WISH_REQUEST, LOAD_WISH_SUCCESS, REMOVE_WISH_FAILURE, REMOVE_WISH_REQUEST, REMOVE_WISH_SUCCESS } from "../reducers/wishReducer";


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

// POST 위시리스트 추가
function addWishAPI(data) {
  console.log(data);
  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };
  config.headers["X-AUTH-TOKEN"] = data.token;
  return axios.post("/wishlist", { userId: data.userId, videoId: data.videoId }, config);
}

function* addWish(action) {
  try {
    console.log(action.payload);
    const result = yield call(addWishAPI, action.payload);
    console.log(result.data);
    yield put({
      type: ADD_WISH_SUCCESS,
      data: result.data.detail,
    });
  } catch (err) {
    yield put({
      type: ADD_WISH_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddWish() {
  yield takeLatest(ADD_WISH_REQUEST, addWish);
}
//END

// DELETE 위시리시트
function deleteWishAPI(data) {
  console.log(data);
  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };
  config.headers["X-AUTH-TOKEN"] = data.token;
  return axios.delete(`/wishlist/${data.wishListId}`, config);
}

function* deleteWish(action) {
  try {
    console.log(action.payload);
    const result = yield call(deleteWishAPI, action.payload);
    console.log(result.data);
    yield put({
      type: REMOVE_WISH_SUCCESS,
      data: result.data.detail,
    });
  } catch (err) {
    yield put({
      type: REMOVE_WISH_FAILURE,
      error: err.response.data
    });
  }
}

function* watchDeleteWish() {
  yield takeLatest(REMOVE_WISH_REQUEST, deleteWish);
}


export default function* wishSaga() {
  yield all([
    fork(watchLoadWish),
    fork(watchAddWish),
    fork(watchDeleteWish),
  ]);
}
