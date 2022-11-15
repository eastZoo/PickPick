import React, { useEffect, useState } from "react";
import Grid from "../components/Grid";
import "./Profile.css";
const props = {
  name: "EastZoo",
  nickname: "eastzoo",
  pick: "woowakgood",
  profileImage: "https://gigaland.io/images/author/author-1.jpg",
};

const Profile = () => {
  const [user_id, setUserId] = useState();
  const [nickName, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();
  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });
      // 사용자 정보 변수에 저장
      console.log(data);
      setUserId(data.id);
      setNickName(data.properties.nickname);
      setProfileImage(data.properties.profile_image);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="profile__container">
      <div className="profile__inner">
        {/* 프로필 명함 */}
        <div className="profile__header">
          <div className="profile__avatar">
            <img src={profileImage} alt="" />
          </div>
          <div className="profile__">
            <div className="profile__name">{nickName}</div>
            <div className="profile__nickname">@{nickName}</div>
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
        <Grid />
      </div>
    </div>
  );
};

export default Profile;
