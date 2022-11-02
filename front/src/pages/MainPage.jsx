import React, { useCallback, useEffect } from 'react'
import Grid from '../components/Grid';
import DropDown from '../components/UI/DropDown';
import './MainPage.css'
import video_list from '../lib/data/list_dummy.json';
import { useState } from 'react';

export default function MainPage() {
  const [itemIndex, setItemIndex] = useState(0);
  const [items, setItems] = useState(video_list.slice(0, 8));

  const _infiniteScroll = useCallback(() => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;

    if(scrollTop + clientHeight === scrollHeight) {
      setItemIndex(itemIndex + 8);
      setItems(items.concat(video_list.slice(itemIndex+8, itemIndex+16)));
    }
  }, [itemIndex, items]);

  useEffect(() => {
    window.addEventListener('scroll', _infiniteScroll, true);
    return () => window.removeEventListener('scroll', _infiniteScroll, true);
  }, [_infiniteScroll]);

  return (
    <section className="mainpage">
      <div className="mainpage__wrapper">
        <div className="subhead__wrapper">
          <div className="subheader">
            <h1>SHARED</h1>
          </div>
        </div>
        {/* 검색 카테고리 */}
        <div className="main__content">
          <div className="main__content__wrapper">
            <div className="search">
              <input placeholder="search YouTube here..." />
              <button>
                <span class="material-icons">search</span>
              </button>
            </div>
            {/* 드롭다운 1 */}
            <DropDown />
          </div>
          <div className='main'>
            <ul className="cards">
              {items.map((item) => (
                <Grid
                  key={item.id}
                  userProfile={item.userProfile}
                  thumbnail={item.thumbnail}
                  title={item.title}
                  subtitle={item.subtitle}
                  broadcaster={item.broadcaster}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
