// store.js 에 있는 initialState 이름과 같이해줘야됨
const initialState = {
  wishList: [],
  loadWishLoading: false,
  loadWishDone: false,
  loadWishError: null,
  addWishLoading: false,
  addWishDone: false,
  addWishError: null,
  removeWishLoading: false,
  removeWishDone: false,
  removeWishError: null,
};

export const LOAD_WISH_REQUEST = "LOAD_WISH_REQUEST"
export const LOAD_WISH_SUCCESS = "LOAD_WISH_SUCCESS"
export const LOAD_WISH_FAILURE = "LOAD_WISH_FAILURE"

export const ADD_WISH_REQUEST = "ADD_WISH_REQUEST"
export const ADD_WISH_SUCCESS = "ADD_WISH_SUCCESS"
export const ADD_WISH_FAILURE = "ADD_WISH_FAILURE"

export const REMOVE_WISH_REQUEST = 'REMOVE_WISH_REQUEST';
export const REMOVE_WISH_SUCCESS = 'REMOVE_WISH_SUCCESS';
export const REMOVE_WISH_FAILURE = 'REMOVE_WISH_FAILURE';

// 중요!! reducer란?? 이전상태를 액션을 통해 다음 상태로 만들어내는 함수!!(단 불변성을 지키면서)
const wishReducer = (state = initialState, action) => {
  // draft(state가 이름이바뀐 상태)는 불변성 상관없이 막 바꿔도 immer가 알아서 state를 알아서 불변성 지켜서 다음 스테이트로 만들어줌
  switch (action.type) {
    case LOAD_WISH_REQUEST:
      return {
        ...state,
        loadWishLoading: true,
        loadWishDone: false,
        loadWishError: null,
      };
    case LOAD_WISH_SUCCESS:
      console.log(action.data);
      return {
        ...state,
        loadWishLoading: false,
        loadWishDone: true,
        wishList: action.data,
      };
    case LOAD_WISH_FAILURE:
      return {
        ...state,
        loadWishLoading: true,
        loadWishDone: false,
        loadWishError: action.msg,
      };
    case ADD_WISH_REQUEST:
      return {
        ...state,
        addWishLoading: true,
        addWishDone: false,
        addWishError: null,
      };
    case ADD_WISH_SUCCESS:
      console.log(action.data);
      return {
        ...state,
        addWishLoading: false,
        addWishDone: true,
        wishList: [...state.wishList, action.data],
      };
    case ADD_WISH_FAILURE:
      return {
        ...state,
        addWishLoading: true,
        addWishDone: false,
        addWishError: action.msg,
      };
    case REMOVE_WISH_REQUEST:
      return {
        ...state,
        removeWishLoading: true,
        removeWishDone: false,
        removeWishError: null,
      };
    case REMOVE_WISH_SUCCESS:
      console.log(action.data)
      return {
        ...state,
        removeWishLoading: false,
        removeWishDone: true,
        wishList: state.wishList.filter((v) => v.id !== action.data.id)
      }
    case REMOVE_WISH_FAILURE:
      return {
        ...state,
        removeWishLoading: true,
        removeWishDone: false,
        removeWishError: action.error,
      };
    default:
      return state;
  }
};

export default wishReducer;
