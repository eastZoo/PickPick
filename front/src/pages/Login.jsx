import React from "react";
import { KAKAO_AUTH_URL } from "../config/OAuth"

const Login = () => {
  return (
    <div style={{ marginTop: "100px" }}>
      <a id="kakao-login-btn" href={KAKAO_AUTH_URL}>
        <img
          src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
          width="200"
          alt="카카오 로그인 버튼"
        />
      </a>
    </div>
  );
};

export default Login;
