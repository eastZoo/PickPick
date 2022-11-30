const initialState = {
  isAuthenticated: null,
  posts: [],
  isLoading: false,
  errorMsg: "",
};

//게시글 불러오기 LOAD POST
export const LOAD_POSTS_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POST_FAILURE";

// 게시글 작성 보내기 POST
export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
    case LOAD_POSTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_POSTS_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        loading: false,
      };
    case LOAD_POSTS_FAILURE:
      return {
        isLoading: true,
        errorMsg: action.payload.data.msg,
      };
    case ADD_POST_SUCCESS:
      console.log(action.payload)
      return {
        isLoading: false,
        posts: [...state.posts, action.payload],
      };
    default:
      return state;
  }
};

export default postReducer;
