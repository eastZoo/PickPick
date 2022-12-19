// store.js 에 있는 initialState 이름과 같이해줘야됨
const initialState = {
  mainPosts: [],
  comments: [],
  singlePost: null, // LOAD_POST_REQUEST 게시글 하나만 불러올때 (다이나믹 라우팅 )
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
};

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const LOAD_COMMENT_REQUEST = "LOAD_COMMENT_REQUEST";
export const LOAD_COMMENT_SUCCESS = "LOAD_COMMENT_SUCCESS";
export const LOAD_COMMENT_FAILURE = "LOAD_COMMENT_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';


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
      console.log(action.data)
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
    case LOAD_COMMENT_REQUEST:
      return {
        ...state,
        loadCommentLoading:true,
        loadCommentDone: false,
        loadCommentError: null,
      }
    case LOAD_COMMENT_SUCCESS:
      console.log(action.data.comments)
      return {
        ...state,
        loadCommentLoading: false,
        loadCommentDone: true,
        comments: action.data.comments
      };
    case LOAD_COMMENT_FAILURE:
      return {
        ...state,
        loadCommentLoading: false,
        loadCommentError: action.error,
      };
      case ADD_COMMENT_REQUEST:
        return {
          ...state,
          addCommentLoading:true,
          addCommentDone: false,
          addCommentError: null,
        }
      case ADD_COMMENT_SUCCESS:
        console.log(action.data.detail)
        return {
          ...state,
          addCommentLoading: false,
          addCommentDone: true,
          comments: [...state.comments, action.data.detail]
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
            removeCommentLoading:true,
            removeCommentDone: true,
            addCommentError: null,
          }
        case REMOVE_COMMENT_SUCCESS:
          console.log(state.comments)
          return {
            ...state,
            addCommentLoading:false,
            addCommentDone: false,
            comments: state.comments.filter((v) => v.commentId !== action.data)
          }
        case REMOVE_COMMENT_FAILURE:
          return {
            ...state,
            addCommentLoading:true,
            addCommentDone: false,
            addCommentError: null,
          }
    default:
      return state;
  }
};

export default postReducer;
