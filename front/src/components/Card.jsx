
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import  './Card.css'

//key, id, url, userProfile, thumbnail, title, subtitle, broadcaster, userId
const Card = (props) => {
  const {key , url, id, userId, userProfile } = props;
  const [youtube, setYoutube] = useState({
    id: id,
    url :url,
    author: "",
    thumb: "",
    title: "",
    userId: userId,
  });

  const getYoutubeInfo = (url) => {
    const noEmbed = 'https://noembed.com/embed?url=';
    const urlForm = "https://www.youtube.com/watch?v=";
    const full_url = noEmbed + urlForm + url;
    fetch(full_url)
    .then(res => res.json())
    .then(data=>{
        setYoutubeInfo(data);
    });
  }
  const setYoutubeInfo = (data) => {
    const {url, author_name, thumbnail_url, title} = data;
    setYoutube({
      ...youtube, 
      url: url,
      author: author_name,
      thumb: thumbnail_url,
      title: title
    })
  }

  useEffect(() => {
    getYoutubeInfo(url);
  }, [])
  
  console.log(youtube)
  return (
    <>
      <li className="cards_item" key={key}>
        <div className="card">
          <Link to="/videodetail" state={youtube} className="card_images">
            <Link to="/profile" className="card_bedge">
              <div className='image__background'>
                <img src={userProfile} alt="" />
              </div>
              <div className="card__user">
                {userId} 회원님이 공유합니다
              </div>
            </Link>
            <div class="card_image">
              <img src={youtube.thumb} alt="" />
            </div>
          </Link>
          <div className="card_content">
              <h2 className="card_title">{youtube.title}</h2>
              <p className="card_text">{youtube.author}</p>
            </div>
        </div>
      </li>
    </>
  );
}

export default Card