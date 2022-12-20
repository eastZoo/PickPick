import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Mypage.css";
import Card from "../Card";
import { LOAD_MYSHARED_REQUEST } from "../../redux/reducers/post";

const Mypage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userName, profileUrl } = useSelector((state) => state.auth);
  const { myShared } = useSelector((state) => state.post);

  const {id, imgUrl, nickName } = myShared


  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch({ type: LOAD_MYSHARED_REQUEST, data: token });
  }, []);

  console.log(myShared)

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
            <li className="item">
              <span>Shared</span>
            </li>
            <li className="item">
              <span>Liked</span>
            </li>
            <li className="item">
              <span>Comment</span>
            </li>
          </ul>
        </div>
        <ul className="cards">
          {myShared.videos &&
            myShared.videos.map((myShare) => (
              <Card
                key={myShare.id}
                url={myShare.url}
                id={myShare.id}
                userId={id}
                userProfile={imgUrl}
                userName={nickName}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Mypage;
