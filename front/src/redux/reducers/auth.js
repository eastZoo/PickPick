// store.js 에 있는 initialState 이름과 같이해줘야됨
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null, // 인증 여부
  isLoading: false,
  userId: "",
  userName: "",
  profileUrl:"",
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

export const CLEAR_ERROR_REQUEST = "CLEAR_ERROR_REQUEST";
export const CLEAR_ERROR_SUCCESS = "CLEAR_ERROR_SUCCESS";
export const CLEAR_ERROR_FAILURE = "CLEAR_ERROR_FAILURE";

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_OUT_REQUEST:
    case LOG_IN_REQUEST:
      return {
        ...state,
        errorMsg: "",
        isLoading: true,
      };
    case LOG_IN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      console.log(action.payload.token)
      return {
        ...state,
        ...action.payload, // 응답 넘어온 값들 저장
        isAuthenticated: true,
        isLoading: false,
        userId: action.payload.user.userId,
        userName: action.payload.user.userName,
        profileUrl : action.payload.user.profileUrl,
        errorMsg: "",
      };
    case LOG_OUT_FAILURE:
    case LOG_IN_FAILURE:
      localStorage.removeItem("token");
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
      return {
        token: null,
        user: null,
        userId: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: null,
        errorMsg: "",
      };
    // 에러를 한곳에서만 담아서 처리하기때문에 창을 누르고 동작할때마다 에러를 날려줘야한다.
    case CLEAR_ERROR_REQUEST:
      return {
        ...state,
      };
    case CLEAR_ERROR_SUCCESS:
      return {
        ...state,
        errorMsg: "",
        previousMatchMsg: "",
      };
    case CLEAR_ERROR_FAILURE:
      return {
        ...state,
        errorMsg: "Clear Error Fail",
        previousMatchMsg: "Clear Error Fail",
      };
    default:
      return state;
  }
};

export default authReducer;
