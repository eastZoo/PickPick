const initialState = {
  isAuthenticated: null,
  posts: [],
  isLoading: false,
  errorMsg: "",
};

export const LOAD_POSTS_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POST_FAILURE";

const postReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default postReducer;
