import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Grid from '../components/Grid';
import DropDown from '../components/DropDown';
import './MainPage.css'
import { useState } from 'react';
import Button from '../components/UI/Button';
import SearchBar from '../components/UI/SearchBar';
import { fetchPosts } from "../features/post/postSlice";

export default function MainPage() {
  const [ url ,  setUrl ] = useState('');
  const postList = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const urlHandler = (event) => {
    setUrl(event.target.value);
    console.log(url);
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  
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
              {postList.posts.map((post) => (
                <Grid
                  key={post.id}
                  url ={post.url}
                  id={post.id}
                  userId={post.userId}
                  userProfile={post.userProfile}
                  thumbnail={post.thumbnail}
                  title={post.title}
                  subtitle={post.subtitle}
                  broadcaster={post.broadcaster}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
