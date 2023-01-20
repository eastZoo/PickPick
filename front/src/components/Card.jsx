import React, { useEffect } from "react";
import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ADD_WISH_REQUEST } from "../redux/reducers/wishReducer";
import "./Card.css";

//key, id, url, userProfile, thumbnail, title, subtitle, broadcaster, userId
const Card = (props) => {
  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.auth);

  // post owner data , id = videoId
  const { key, url, id, userProfile, userName } = props;

  const [youtube, setYoutube] = useState({
    videoId: id,
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

  const addWishHandler = () => {
    const token = localStorage.getItem("token");
    dispatch({
      type: ADD_WISH_REQUEST,
      payload: { token: token, videoId: id, userId: userId },
    });
    alert("나중에 볼 영상에 추가되었습니다!!");
  };

  useEffect(() => {
    getYoutubeInfo(url);
  }, []);

  return (
    <>
      <li className="cards_item" key={key}>
        <div className="card">
          <Link
            to={{
              pathname: `/video/${id}`,
              state: youtube,
            }}
            className="card_images"
          >
            <Link to="/profile" className="card_bedge">
              <div className="image__background">
                <img src={userProfile} alt="" />
              </div>
              <div className="card__user">{userName} 회원님이 공유합니다</div>
            </Link>
            <div class="card_image">
              <img src={youtube.thumb} alt="" />
            </div>
          </Link>
          <div className="card_content">
            <Link
              to={{
                pathname: `/video/${id}`,
                state: youtube,
              }}
              className="card_images"
            >
              <h2 className="card_title">
                {youtube.title.length > 30
                  ? youtube.title.substr(0, 30) + "..."
                  : youtube.title}
              </h2>
            </Link>
            <p className="card_text">
              <span className="card__author">{youtube.author}</span>
              <span className="card__like">좋아요 : {props.likeCount}</span>
              <span className="card__icon" onClick={addWishHandler}>
                <FaCartPlus
                  style={{
                    fontSize: "30px",
                    color: "#0d0c22c1",
                    marginTop: "5px",
                    position: "relative",
                    right: 0,
                  }}
                  className="add__wish"
                />
              </span>
            </p>
          </div>
        </div>
      </li>
    </>
  );
};

export default Card;
