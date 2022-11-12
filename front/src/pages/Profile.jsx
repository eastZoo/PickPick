import React from "react";
import Grid from "../components/Grid";
import "./Profile.css";
const props = {
  name: "EastZoo",
  nickname: "eastzoo",
  pick: "woowakgood",
  profileImage: "https://gigaland.io/images/author/author-1.jpg",
};

const Profile = () => {
  return (
    <div className="profile__container">
      <div className="profile__inner">
        {/* 프로필 명함 */}
        <div className="profile__header">
          <div className="profile__avatar">
            <img src={props.profileImage} alt="" />
          </div>
          <div className="profile__">
            <div className="profile__name">{props.name}</div>
            <div className="profile__nickname">@{props.nickname}</div>
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
        <Grid/>
      </div>
    </div>
  );
};

export default Profile;
