// store.js 에 있는 initialState 이름과 같이해줘야됨
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null, // 인증 여부
  isLoading: false,
  userId: "",
  userName: "",
  profileUrl: "",
  errorMsg: "",
  successMsg: "",
  previousMatchMsg: "",
};

/*  순수한 문자열로 되어있는 액션은 오타에 취야하다 변수로 빼자!!  */
// 액션 호출할때나 Saga에서 사용하니까 export 붙이자
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MY_INFO_REQUEST:
    case LOG_OUT_REQUEST:
    case LOG_IN_REQUEST:
      return {
        ...state,
        errorMsg: "",
        isLoading: true,
      };
    case LOG_IN_SUCCESS:
      localStorage.setItem("token", action.payload.result.data.detail); // detail : token
      localStorage.setItem("userInfo", JSON.stringify(action.payload.userInfo));
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        userId: action.payload.userInfo.sub,
        userName: action.payload.userInfo.nickname,
        profileUrl: action.payload.userInfo.img,
        errorMsg: "",
      };
    case LOAD_MY_INFO_FAILURE:
    case LOG_OUT_FAILURE:
    case LOG_IN_FAILURE:
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      console.log(action)
      return {
        ...state,
        ...action.payload,
        token: null,
        user: null,
        userId: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: null,
        errorMsg: action.payload.data.msg, // 로그인실패시 백에서 날라오는 메세지 받는 곳
      };
    case LOG_OUT_SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      return {
        token: null,
        user: null,
        userId: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: null,
        errorMsg: "",
      };
    case LOAD_MY_INFO_SUCCESS:
      console.log(action)
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        userId: action.payload.sub,
        userName: action.payload.nickname,
        profileUrl: action.payload.img,
        errorMsg: "",
      }
    default:
      return state;
  }
};

export default authReducer;
