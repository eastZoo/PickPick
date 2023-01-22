import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, List, Popover, Button, Skeleton } from "antd";
import "./Mypage.css";
import Card from "../components/Card";
import {
  LOAD_MYCOMMENT_REQUEST,
  LOAD_MYLIKE_REQUEST,
  LOAD_MYSHARED_REQUEST,
} from "../redux/reducers/postReducer";
import { useLocation } from "react-router-dom";

const Mypage = () => {
  const dispatch = useDispatch();

  const { myShared } = useSelector((state) => state.post);
  console.log(myShared);

  const { isAuthenticated, userId, userName, profileUrl } = useSelector(
    (state) => state.auth
  );

  const token = localStorage.getItem("token");
  const [toogleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const myLikeHandler = () => {
    dispatch({ type: LOAD_MYLIKE_REQUEST, data: { token: token } });
  };

  const mySharedHandler = () => {
    dispatch({ type: LOAD_MYSHARED_REQUEST, data: { token: token } });
  };

  const myCommentHandler = () => {
    dispatch({ type: LOAD_MYCOMMENT_REQUEST, data: { token: token } });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch({ type: LOAD_MYSHARED_REQUEST, data: { token: token } });
  }, []);

  return (
    <div className="profile__container">
      <div className="profile__inner">
        {/* 프로필 명함 */}
        <div className="profile__header">
          <div className="profile__avatar">
            <img src={profileUrl} alt="" />
          </div>
          <div className="profile__">
            <div className="profile__name">{userName}</div>
            <div className="profile__nickname">@{userName}</div>
            <div className="profile__pick">Picker</div>
          </div>
        </div>

        {/* 중간 버튼 */}
        <div className="profile__category">
          <ul className="category__selector">
            <li
              className="item"
              onClick={() => {
                toggleTab(1);
                mySharedHandler();
              }}
            >
              <span className={toogleState === 1 ? "item__name__active" : ""}>
                Shared
              </span>
            </li>
            <li
              className="item"
              onClick={() => {
                toggleTab(2);
                myLikeHandler();
              }}
            >
              <span className={toogleState === 2 ? "item__name__active" : ""}>
                Liked
              </span>
            </li>
            <li
              className="item"
              onClick={() => {
                toggleTab(3);
                myCommentHandler();
              }}
            >
              <span className={toogleState === 3 ? "item__name__active" : ""}>
                Comment
              </span>
            </li>
          </ul>
        </div>
        {/* 카드나오는 곳 */}
        <ul className="cards">
          {toogleState === 1 &&
            myShared?.map((myShare) => (
              <Card
                key={myShare.id}
                url={myShare.url}
                id={myShare.id}
                userId={userId}
                userProfile={profileUrl}
                userName={userName}
              />
            ))}
          {toogleState === 2 &&
            myShared &&
            myShared?.map((myShare) => (
              <Card
                key={myShare.id}
                url={myShare.video.url}
                id={myShare.video.id}
                userId={myShare.video.user.id}
                userProfile={myShare.video.user.imgUrl}
                userName={myShare.video.user.nickName}
              />
            ))}
          {toogleState === 3 &&
            myShared &&
            myShared?.map((myShare) => (
              <Card
                key={myShare.id}
                url={myShare.video.url}
                id={myShare.video.id}
                userId={myShare.video.user.id}
                userProfile={myShare.video.user.imgUrl}
                userName={myShare.video.user.nickName}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Mypage;
