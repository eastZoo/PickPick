import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import { Avatar, List, Comment } from "antd";
import {
  MessageOutlined,
  HeartTwoTone,
  HeartOutlined,
} from "@ant-design/icons";
import "./VideoDetail.css";
import CommentForm from "../CommentForm";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_COMMENT_REQUEST } from "../../redux/reducers/post";

const myId = 6;
const comment = {
  id: 52,
  createdAt: "2022-05-20T11:30:34.000Z",
  updatedAt: "2022-05-20T11:30:34.000Z",
  UserId: 6,
  Title: "은행에 복면을 쓰고 갔다가 벌어진 일 - 우왁굳 반응",
  User: { id: 6, nickname: "진녕이" },
  Comments: [
    {
      User: { id: 1, nickname: "녹꾸리" },
      content: "너무재밌어요.!!",
    },
    {
      User: { id: 2, nickname: "동주" },
      content: "공유좋습니다",
    },
    {
      User: { id: 3, nickname: "진녕" },
      content: "굿굿",
    },
    {
      User: { id: 4, nickname: "동하" },
      content: "👏🏻👏🏻👏🏻",
    },
  ],
  Likers: [
    {
      id: 6,
      Like: {
        createdAt: "2022-05-20T11:30:50.000Z",
        updatedAt: "2022-05-20T11:30:50.000Z",
        PostId: 49,
        UserId: 6,
      },
    },
  ],
  Retweet: null,
};

const VideoDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false);

  const {comments} = useSelector((state) => state.post);
  const CommentToggle = () => {
    setIsOpen((prev) => !prev);
  };

  console.log(comments[0])
  const { videoId, url, author, title, userId} = location.state

  const liked = comment.Likers.find((v) => v.id === myId);

  useEffect(()=> {
    const token = localStorage.getItem("token");
    dispatch({ type : LOAD_COMMENT_REQUEST, data: {videoId: videoId,token : token } })
  }, [])

  return (
    <div className="video__container">
      <div className="video__card">
        <div className="video__inner">
          <div className="video__title">
            <h2>{title}, videoId : {videoId}, userId : {userId}</h2>
            <div>{author}</div>
          </div>
          <ReactPlayer
            className="player"
            url={url}
            width="1300px" // 플레이어 크기 (가로)
            height="720px"
            playing={true}
            muted={true}
            controls={true}
          />
          <div className="comment__container">
            <div className="comment__icon">
              <MessageOutlined onClick={CommentToggle} />
              {liked ? (
                <HeartTwoTone twoToneColor="#eb2f96" key="heart" />
              ) : (
                <HeartOutlined key="heart" />
              )}
            </div>

            {/* 댓글창 부분 데이터  */}
            {isOpen && (
              <div className="comment__card">
                <CommentForm post={comment} />
                <List
                  header={`${comments[0].length} 개의 댓글`}
                  itemLayout="horizontal"
                  dataSource={comments[0]}
                  renderItem={(item) => (
                    <li>
                      <Comment
                        author={item.user.nickName}
                        avatar={
                          <Link to="/profile">
                            <a>
                              <Avatar src={item.user.imgUrl}></Avatar>
                            </a>
                          </Link>
                        }
                        content={item.comment}
                      />
                    </li>
                  )}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
