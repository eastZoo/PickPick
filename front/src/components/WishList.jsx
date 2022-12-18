import React, { useEffect, useState } from 'react'
import "./WishList.css";
// 내가담은 비디오 공유한사람
// user = {
//   id: "2552169408",
//   nickName: "최민성",
//   imgUrl:
//     "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg",
// };

const WishList = (props) => {
  const { url, user, id } = props.wish;
  console.log(url, user, id)

  // Card 컴포넌트 유튜브 중복로직 발생 따로 모듈 만들기
  const [youtube, setYoutube] = useState({
    wishId: id,
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


  useEffect(() => {
    getYoutubeInfo(url);
  }, []);

  return (
    <li className="cart__list">
      <img className="cart__img" src={youtube.thumb} alt="유튜브 썸네일" />
      <div>
        <div className='cart__title'>
          <h4>{youtube.author}</h4>
          <div className='cart__shared'>
            <img className='shared-profile' src={user.imgUrl} alt="영상 공유자 프로필이미지" />
            <div className="card__user">{user.nickName} 회원님이 공유</div>
          </div>
        </div>

        <a>{youtube.title}</a>
      </div>
    </li>
  );
}

export default WishList