import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./MainPage.css";
import { useState } from "react";
import { Form } from "antd";

import {
  ADD_POST_REQUEST,
  LOAD_POSTS_REQUEST,
} from "../redux/reducers/postReducer";
import DropDown from "../components/DropDown";
import Button from "../components/UI/Button";
import SearchBar from "../components/UI/SearchBar";
import Card from "../components/Card";

const MainPage = () => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState("");

  const { mainPosts, addPostError } = useSelector((state) => state.post);

  const [order, setOrder] = useState("");
  const sortedItems = mainPosts.sort((a, b) => b[order] - a[order]);

  const handleBestClick = (sortTag) => {
    console.log(sortTag);
    setOrder(sortTag);
  };

  const urlHandler = (event) => {
    setUrl(event.target.value);
  };

  const onSubmit = () => {
    if (url.length > 10) {
      const link = url.split("=");
      const token = localStorage.getItem("token");
      dispatch({
        type: ADD_POST_REQUEST,
        payload: { url: link[1], token: token },
      });
    }
    setUrl("");
  };

  useEffect(() => {
    dispatch({ type: LOAD_POSTS_REQUEST });
  }, []); // 포스트 추가시 빈카드 나타나는 문제 해결, mainPosts의 변경 감지 의존값 추가

  console.log(mainPosts);
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
            <DropDown handleBestClick={handleBestClick} />
          </div>
          <div className="main">
            <ul className="cards">
              {sortedItems.map((post) => (
                <Card
                  key={post.id}
                  url={post.url}
                  id={post.id}
                  userId={post.user.id}
                  userProfile={post.user.imgUrl}
                  userName={post.user.nickName}
                  likeCount={post.likeCount}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainPage;
