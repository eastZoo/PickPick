import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { REMOVE_WISH_REQUEST } from "../redux/reducers/wishReducer";
import "./WishList.css";
// 내가담은 비디오 공유한사람
// user = {
//   id: "2552169408",
//   nickName: "최민성",
//   imgUrl:
//     "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg",
// };

const WishList = (props) => {
  const dispatch = useDispatch();

  // 위시리스트 들어있는 video info
  const { url, user, id } = props.wish.video;
  console.log(props.wish);

  // Card 컴포넌트 유튜브 중복로직 발생 따로 모듈 만들기
  const [youtube, setYoutube] = useState({
    url: url,
    author: "",
    thumb: "",
    title: "",
  });

  const getYoutubeInfo = (url) => {
    const noEmbed = "https://noembed.com/embed?url=";
    const urlForm = "https://www.youtube.com/watch?v=";
    const full_url = noEmbed + urlForm + url;
    fetch(full_url)
      .then((res) => res.json())
      .then((data) => {
        setYoutubeInfo(data);
      });
  };
  const setYoutubeInfo = (data) => {
    const { url, author_name, thumbnail_url, title } = data;
    setYoutube({
      ...youtube,
      url: url,
      author: author_name,
      thumb: thumbnail_url,
      title: title,
    });
  };

  const deleteWish = () => {
    const token = localStorage.getItem("token");
    dispatch({
      type: REMOVE_WISH_REQUEST,
      payload: { token: token, wishListId: props.wish.id },
    });
  };

  useEffect(() => {
    getYoutubeInfo(url);
  }, [url]);

  return (
    <li className="cart__list">
      {/* 위시리스트 요소 삭제 버튼 */}
      <FaTimes
        style={{
          fontSize: "18px",
          marginRight: "5px",
        }}
        onClick={deleteWish}
        className="remove__wish"
      />
      <Link
        to={{
          pathname: `/video/${id}`,
          state: youtube,
        }}
        className="content__wrapper"
      >
        <img className="cart__img" src={youtube.thumb} alt="유튜브 썸네일" />
        <div>
          <div className="cart__title">
            <h4>{youtube.author}</h4>
            <div className="cart__shared">
              <img
                className="shared-profile"
                src={user.imgUrl}
                alt="영상 공유자 프로필이미지"
              />
              <div className="card__user">{user.nickName} 회원님이 공유</div>
            </div>
          </div>

          <div>
            {youtube.title.length > 30
              ? youtube.title.substr(0, 30) + "..."
              : youtube.title}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default WishList;
