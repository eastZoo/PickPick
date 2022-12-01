import React, { useEffect, useState } from "react";
import Grid from "../Card";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";

const props = {
  name: "EastZoo",
  nickname: "eastzoo",
  pick: "woowakgood",
  profileImage: "https://gigaland.io/images/author/author-1.jpg",
};

const Profile = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userName, profileUrl } = useSelector((state) => state.auth);


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
            <div className="profile__pick">OnePick : {props.pick}</div>
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
        {/* 더미 임시 props */}
        <Grid
          id="1"
          userId="1"
          title="이게 충신이 맞아?"
          subtitle="이게 충신이 맞아?"
          broadcaster="우왁굳의 게임방송"
          thumbnail="https://img.youtube.com/vi/1exrXkxFrao/hqdefault.jpg"
          userProfile="https://gigaland.io/images/author/author-1.jpg"
        />
      </div>
    </div>
  );
};

export default Profile;
