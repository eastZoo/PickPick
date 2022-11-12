import React, { useCallback, useEffect } from 'react'
import Grid from '../components/Grid';
import DropDown from '../components/DropDown';
import './MainPage.css'
import { useState } from 'react';
import Button from '../components/UI/Button';
import SearchBar from '../components/UI/SearchBar';
import { useDispatch, useSelector } from 'react-redux';

export default function MainPage() {
  const postList = useSelector((state) => state.posts.value);
  const [itemIndex, setItemIndex] = useState(0);
  const [items, setItems] = useState(postList.slice(0, 8));

  console.log(postList[2])

  const _infiniteScroll = useCallback(() => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;

    if(scrollTop + clientHeight === scrollHeight) {
      setItemIndex(itemIndex + 8);
      setItems(items.concat(postList.slice(itemIndex+8, itemIndex+16)));
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
          <div className="search">
            <SearchBar
              className="share__input"
              placeholder="share youtube URL!!"
            />
            <Button className="share__btn">share</Button>
          </div>
        </div>
        {/* 검색 카테고리 */}
        <div className="main__content">
          <div className="main__content__wrapper">
            <div className="search">
              <input placeholder="search YouTube here..." />
              <Button>
                <span class="material-icons">search</span>
              </Button>
            </div>
            {/* 드롭다운 1 */}
            <DropDown />
          </div>
          <div className="main">
            <ul className="cards">
              {postList.map((item) => (
                <Grid
                  key={item.id}
                  userId={item.userId}
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
