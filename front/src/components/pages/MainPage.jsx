import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Grid from '../Grid';
import DropDown from '../DropDown';
import './MainPage.css'
import { useState } from 'react';
import Button from '../UI/Button';
import SearchBar from '../UI/SearchBar';
import { addPost, fetchPosts, selectAllPosts } from "../../features/post/postSlice";
import { Form } from 'antd';

export default function MainPage() {
  const [ url ,  setUrl ] = useState('');
  const postList = useSelector((state) => state.post);
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();

  const urlHandler = (event) => {
    setUrl(event.target.value);
  };

  const onSubmit = async () => {
    dispatch(addPost(url))
  };

  // 처음 실행시 포스트 가져오기 ( 임시 주석 처리 )
  // useEffect(() => {
  //   dispatch(fetchPosts());
  // }, []);
  
  return (
    <section className="mainpage">
      <div className="mainpage__wrapper">
        <div className="subhead__wrapper">
          <div className="subheader">
            <h1>SHARED</h1>
          </div>
          <Form className="search">
            <SearchBar
              className="share__input"
              placeholder="share youtube URL!!"
              value={url}
              onChange={urlHandler}
            />
            <Button className="share__btn" onClick={onSubmit}>
              share
            </Button>
          </Form>
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
