import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Loading from "./UI/Loading";
import { kakaoLogin } from "../features/posts/postsSlice";
import { useNavigate } from "react-router-dom";

const KakaoOAuth = () => {
  const dispatch = useDispatch();
  let code = new URL(window.location.href).searchParams.get('code')

  useEffect(() => {
    dispatch(kakaoLogin(code));
  }, []);

  return <Loading/>
};

export default KakaoOAuth;
