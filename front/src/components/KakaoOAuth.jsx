import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Loading from "./UI/Loading";
import { kakaoLogin } from "../features/post/postSlice";
import { useNavigate } from "react-router-dom";

const KakaoOAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    dispatch(kakaoLogin(code));
    navigate("/", { replace: true });
  }, []);

  return <Loading />;
};

export default KakaoOAuth;
