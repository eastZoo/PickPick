// store.js 에 있는 initialState 이름과 같이해줘야됨
const initialState = {
  wishList : [],
  loadWishLoading: false,
  loadWishDone: false,
  loadWishError: null,
};

export const LOAD_WISH_REQUEST = "LOAD_WISH_REQUEST"
export const LOAD_WISH_SUCCESS = "LOAD_WISH_SUCCESS"
export const LOAD_WISH_FAILURE = "LOAD_WISH_FAILURE"

// 중요!! reducer란?? 이전상태를 액션을 통해 다음 상태로 만들어내는 함수!!(단 불변성을 지키면서)
const wishReducer = (state = initialState, action) => {
  // draft(state가 이름이바뀐 상태)는 불변성 상관없이 막 바꿔도 immer가 알아서 state를 알아서 불변성 지켜서 다음 스테이트로 만들어줌
  switch (action.type) {
    case LOAD_WISH_REQUEST:
      return {
        ...state,
        loadWishLoading: true,
        loadWishDone: true,
        loadWishError: null,
      };
    case LOAD_WISH_SUCCESS:
      console.log(action.data);
      return {
        ...state,
        loadWishLoading: false,
        loadWishDone: false,
        wishList: action.data,
      };
    case LOAD_WISH_FAILURE:
      return {
        ...state,
        loadWishLoading: true,
        loadWishDone: false,
        loadWishError: null,
      };
    default:
      return state;
  }
};

export default wishReducer;
