import React, { useCallback, useEffect } from 'react'
import Grid from '../components/Grid';
import DropDown from '../components/DropDown';
import './MainPage.css'
import { useState } from 'react';
import Button from '../components/UI/Button';
import SearchBar from '../components/UI/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../features/posts/postsSlice';

export default function MainPage() {
  const [ url ,  setUrl ] = useState('');

  const urlHandler = (event) => {
    setUrl(event.target.value);
    console.log(url);
  };

  const postList = useSelector((state) => state.posts.value);
  const dispatch = useDispatch();

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
              value={url}
              onChange={urlHandler}
            />
            <Button
              className="share__btn"
              onClick={() =>
                dispatch(addPost({ id: postList[postList.length - 1].id + 1, url }))
              }
            >
              share
            </Button>
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
