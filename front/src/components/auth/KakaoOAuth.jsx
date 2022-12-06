import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CLEAR_ERROR_REQUEST, LOG_IN_REQUEST } from "../../redux/reducers/auth";

const KakaoOAuth = () => {
  const dispatch = useDispatch();
  let code = new URL(window.location.href).searchParams.get("code");

  console.log(code);

  useEffect(() => {
    console.log(code);
    dispatch({
      type: LOG_IN_REQUEST,
      // 여기 payload로 넘겨주는 값이 sagas loginUser의 action.payload이다
      payload: code,
    });
  }, []);

  return <div>Loading..</div>;
};

export default KakaoOAuth;
