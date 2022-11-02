import React from 'react'
import  './Grid.css'

const Grid = ({key, userProfile, thumbnail, title, subtitle, broadcaster}) => {
  return (
    <>
      <li className="cards_item" key={key}>
        <div className="card">
          <div className="card_images">
            <div className="card_bedge">
              <img src={userProfile} alt="" />
            </div>
            <div class="card_image">
              <img src={thumbnail} alt="" />
            </div>
          </div>
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