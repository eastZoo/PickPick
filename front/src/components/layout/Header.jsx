import React from "react";
import logo from "../../images/main.png";
import InputForm from "../InputForm";
import "./Header.css";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import { KAKAO_AUTH_URL } from "../../config/OAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_MY_INFO_REQUEST,
  LOG_OUT_REQUEST,
} from "../../redux/reducers/authReducer";
import { useEffect } from "react";
import { LOAD_POSTS_REQUEST } from "../../redux/reducers/postReducer";

const Header = () => {
  const { isAuthenticated, userName, profileUrl } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    console.log(userInfo);
    if (userInfo) {
      dispatch({ type: LOAD_MY_INFO_REQUEST, payload: JSON.parse(userInfo) });
    }
  }, []);

  return (
    <header>
      <nav>
        <div className="container">
          <div className="left">
            <Link to="/" class="main__logo">
              <img src={logo} alt="PICKPICK" width="220px" />
            </Link>
            <InputForm />
          </div>
          <div className="right">
            <ul className="right__menu">
              <li className="item">
                <Link to="/" className="item__name">
                  Home
                </Link>
              </li>
              {/* <li className="item">
                <Link to="/favorite" className="item__name">
                  Favorite
                </Link>
              </li> */}
              {isAuthenticated ? (
                <li className="item">
                  <Link to="/mypage" className="item__name">
                    mypage
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {isAuthenticated ? (
              <div className="login__auth">
                <div class="medal">
                  <div class="front">
                    <img src={profileUrl} alt="profileUrl" />
                  </div>
                  <div class="back">
                    <Button className="back__medal" onClick={onLogout}>
                      LOGOUT
                    </Button>
                  </div>
                </div>

                <div>{userName} PICKER!!</div>
              </div>
            ) : (
              <a className="login__btn" href={KAKAO_AUTH_URL}>
                <Button className="header__btn">Login</Button>
              </a>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
