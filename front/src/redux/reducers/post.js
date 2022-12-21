// store.js 에 있는 initialState 이름과 같이해줘야됨
const initialState = {
  mainPosts: [],
  singlePost: null,
  comments: [],
  myShared: {},
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  loadCommentLoading: false,
  loadCommentDone: false,
  loadCommentError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  removeCommentLoading: false,
  removeCommentDone: false,
  removeCommentError: null,
  loadMySharedLoading: false,
  loadMySharedDone: false,
  loadMySharedError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
};

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const REMOVE_COMMENT_REQUEST = "REMOVE_COMMENT_REQUEST";
export const REMOVE_COMMENT_SUCCESS = "REMOVE_COMMENT_SUCCESS";
export const REMOVE_COMMENT_FAILURE = "REMOVE_COMMENT_FAILURE";

export const LOAD_MYSHARED_REQUEST = "LOAD_MYSHARED_REQUEST";
export const LOAD_MYSHARED_SUCCESS = "LOAD_MYSHARED_SUCCESS";
export const LOAD_MYSHARED_FAILURE = "LOAD_MYSHARED_FAILURE";

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";

// 중요!! reducer란?? 이전상태를 액션을 통해 다음 상태로 만들어내는 함수!!(단 불변성을 지키면서)
const postReducer = (state = initialState, action) => {
  // draft(state가 이름이바뀐 상태)는 불변성 상관없이 막 바꿔도 immer가 알아서 state를 알아서 불변성 지켜서 다음 스테이트로 만들어줌
  switch (action.type) {
    case LOAD_POSTS_REQUEST:
      return {
        ...state,
        loadPostsLoading: true,
        loadPostsDone: false,
        loadPostsError: null,
      };
    case LOAD_POSTS_SUCCESS:
      console.log(action.data.detail);
      return {
        ...state,
        loadPostsLoading: false,
        loadPostsDone: true,
        mainPosts: action.data.detail, // 뭔가
      };
    case LOAD_POSTS_FAILURE:
      return {
        ...state,
        loadPostsLoading: false,
        loadPostsError: action.error,
      };
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      console.log(action.data);
      return {
        ...state,
        addPostLoading: false,
        addPostDone: true,
        mainPosts: [...state.mainPosts, action.data],
      };

    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS:
      console.log(action.data.detail);
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
        comments: [...state.comments, action.data.detail],
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    case REMOVE_COMMENT_REQUEST:
      return {
        ...state,
        removeCommentLoading: true,
        removeCommentDone: true,
        addCommentError: null,
      };
    case REMOVE_COMMENT_SUCCESS:
      console.log(state.comments);
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: false,
        comments: state.comments.filter((v) => v.commentId !== action.data),
      };
    case REMOVE_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case LOAD_MYSHARED_REQUEST:
      return {
        ...state,
        loadMySharedLoading: true,
        loadMySharedDone: false,
        loadMySharedError: null,
      };
    case LOAD_MYSHARED_SUCCESS:
      console.log(action.data);
      return {
        ...state,
        loadMySharedLoading: false,
        loadMySharedDone: true,
        myShared: action.data,
      };
    case LOAD_MYSHARED_FAILURE:
      return {
        ...state,
        loadCommentLoading: false,
        loadCommentError: action.error,
      };
    case LIKE_POST_REQUEST:
      return {
        ...state,
        likePostLoading: true,
        likePostDone: false,
        likePostError: null,
      };
    case LIKE_POST_SUCCESS: {
      const like = state.singlePost.videoLike;
      like.push(action.data)
      return {
        ...state,
        likePostLoading: false,
        likePostDone: true,
      };
    }
    case LIKE_POST_FAILURE:
      return {
        ...state,
        likePostLoading: true,
        likePostError: null,
      };
    case UNLIKE_POST_REQUEST:
      return {
        ...state,
        loadMySharedLoading: true,
        loadMySharedDone: false,
        loadMySharedError: null,
      };
    case UNLIKE_POST_SUCCESS:
      console.log(action.data)
      let like = state.singlePost.videoLike;
      state.singlePost.videoLike = like.filter((v) => v.id !== action.data.id);
      return {
        ...state,
        loadMySharedLoading: false,
        loadMySharedDone: true,
      };
    case UNLIKE_POST_FAILURE:
      return {
        ...state,
        loadMySharedLoading: true,
        loadMySharedDone: false,
        loadMySharedError: null,
      };
    case LOAD_POST_REQUEST:
      return {
        ...state,
        loadPostLoading: true,
        loadPostDone: false,
        loadPostError: null,
      };
    case LOAD_POST_SUCCESS:
      console.log(action.data)
      return {
        ...state,
        loadPostLoading: false,
        loadPostDone: true,
        singlePost : action.data
      };
    case LOAD_POST_FAILURE:
      return {
        ...state,
        loadPostLoading: false,
        loadMySharedDone: false,
        loadMySharedError: action.error,
      };
    default:
      return state;
  }
};

export default postReducer;
