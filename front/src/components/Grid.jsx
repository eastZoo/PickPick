import { current } from '@reduxjs/toolkit';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import  './Grid.css'

//key, id, url, userProfile, thumbnail, title, subtitle, broadcaster, userId
const Grid = (props) => {
  const dispatch = useDispatch()
  const [currentId, setCurrentId] = useState(props.url);
  
  return (
    <>
      <li className="cards_item" key={props.key}>
        <div className="card">
          <Link to="/videodetail" state={props} className="card_images">
            <Link to="/profile" className="card_bedge">
              <div className='image__background'>
                <img src={props.userProfile} alt="" />
              </div>
              <div className="card__user">
                {props.userId} 회원님이 공유합니다
              </div>
            </Link>
            <div class="card_image">
              <img src={props.thumbnail} alt="" />
            </div>
          </Link>
          <div className="card_content">
              <h2 className="card_title">{props.title}</h2>
              <p className="card_text">{props.subtitle ?  props.subtitle.slice(0, 50) + "..." : ''}</p>
            </div>
        </div>
      </li>
    </>
  );
}

export default Grid