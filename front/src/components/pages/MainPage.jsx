import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "../Card";
import DropDown from "../DropDown";
import "./MainPage.css";
import { useState } from "react";
import Button from "../UI/Button";
import SearchBar from "../UI/SearchBar";
import { Form } from "antd";
import Card from "../Card";
import { ADD_POST_REQUEST } from "../../redux/reducers/post";

const MainPage = () => {
  const [url, setUrl] = useState("");
  // const postList = useSelector((state) => state.post);
  const posts = [
    {
      id: "1",
      userId: 1,
      title: "이게 충신이 맞아?",
      subtitle: "이게 충신이 맞아?",
      broadcaster: "우왁굳의 게임방송",
      thumbnail: "https://img.youtube.com/vi/1exrXkxFrao/hqdefault.jpg",
      userProfile: "https://gigaland.io/images/author/author-1.jpg",
    },
    {
      id: "2",
      userId: 1,
      title: "개 뜬끔없이 듀얼하는 상황극(VR챗 상황극 콘테스트)",
      subtitle: "매일 저녁 9시 업로드 (올릴거 있을 때만)",
      broadcaster: "우왁굳의 게임방송",
      thumbnail: "https://img.youtube.com/vi/_zG3kpAn_MM/hqdefault.jpg",
      userProfile: "https://gigaland.io/images/author/author-2.jpg",
    },
    {
      id: "3",
      userId: 2,
      title: "이세돌 숙소 살림 다 갖다파는 주르르",
      subtitle: "#이세돌 #주르르 #VRC",
      broadcaster: "주르르 JURURU",
      thumbnail: "https://img.youtube.com/vi/oZPaBHyUhY0/hqdefault.jpg",
      userProfile: "https://gigaland.io/images/author/author-3.jpg",
    },
    {
      id: "4",
      userId: 3,
      title: "이네야~ ^a^",
      subtitle: "ㅡ3ㅡ 이상적인~~~ 오네쨩다몽!",
      broadcaster: "고세구 GOSEGU",
      thumbnail: "https://img.youtube.com/vi/Luff9esx0TM/hqdefault.jpg",
      userProfile: "https://gigaland.io/images/author/author-4.jpg",
    },
  ];
  console.log(posts);
  const dispatch = useDispatch();

  const urlHandler = (event) => {
    setUrl(event.target.value);
  };
  console.log(url.length);

  const onSubmit = () => {
    if (url.length > 10) {
      const link = url.split("=");
      const token = localStorage.getItem("token");
      console.log(token, link);
      dispatch({
        type: ADD_POST_REQUEST,
        payload: { url: link[1], token: token },
      });
    }
    setUrl("");
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
              {posts.map((post) => (
                <Card
                  key={post.id}
                  url={post.url}
                  id={post.id}
                  userId={post.userId}
                  userProfile={post.userProfile}
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
