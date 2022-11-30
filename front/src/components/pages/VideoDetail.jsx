import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import {  Avatar, List, Comment } from 'antd';
import { MessageOutlined, HeartTwoTone, HeartOutlined } from '@ant-design/icons';
import "./VideoDetail.css";
import CommentForm from "../CommentForm";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";


const myId = 6
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

const VideoDetail = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const postList = useSelector((state) => state.post);
  const CommentToggle = () => {
    setIsOpen(prev => !prev)
  }
  const location = useLocation();

  // Grid Link로부터 넘어온 state
  const currentProps = location.state; 
  const {id, url, author, thumb, title, userId} = currentProps;

  const liked = comment.Likers.find((v) => v.id === myId);
  console.log(url);

  return (
    <div className="video__container">
      <div className="video__card">
        <div className="video__inner">
          <div className="video__title">
            <h2>{title}</h2>
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
            <div className="comment__icon" >
              <MessageOutlined onClick={CommentToggle}/>
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
                  header={`${comment.Comments.length} 개의 댓글`}
                  itemLayout="horizontal"
                  dataSource={comment.Comments}
                  renderItem={(item) => (
                    <li>
                      <Comment
                        author={item.User.nickname}
                        avatar={
                          <Link>
                            <a>
                              <Avatar>{item.User.nickname[0]}</Avatar>
                            </a>
                          </Link>
                        }
                        content={item.content}
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
