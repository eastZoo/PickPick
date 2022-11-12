import React from 'react'
import { Link } from 'react-router-dom';
import  './Grid.css'

const Grid = ({key, userProfile, thumbnail, title, subtitle, broadcaster, userId}) => {
  return (
    <>
      <li className="cards_item" key={key}>
        <div className="card">
          <Link to="/videodetail" className="card_images">
            <Link to="/profile" className="card_bedge">
              <img src={userProfile} alt="" />
            </Link>
            <div class="card_image">
              <img src={thumbnail} alt="" />
            </div>
          </Link>
          <div className="card_content">
            <h2 className="card_title">{title}</h2>
            <p className="card_text">{subtitle}</p>
            <button className="btn card_btn">Read More</button>
          </div>
        </div>
      </li>
    </>
  );
}

export default Grid