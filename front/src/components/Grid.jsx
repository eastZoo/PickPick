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
              <img src={props.userProfile} alt="" />
            </Link>
            <div class="card_image">
              <img src={props.thumbnail} alt="" />
            </div>
          </Link>
          <div className="card_content">
            <h2 className="card_title">{props.title}</h2>
            <p className="card_text">{props.subtitle}</p>
            <button className="btn card_btn">Read More</button>
          </div>
        </div>
      </li>
    </>
  );
}

export default Grid