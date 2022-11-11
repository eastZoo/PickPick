import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import {  Avatar, List, Comment } from 'antd';
import { MessageOutlined, HeartTwoTone, HeartOutlined } from '@ant-design/icons';
import "./VideoDetail.css";
import CommentForm from "../components/CommentForm";
import { Link } from "react-router-dom";


const myId = 6
const post = {
  id: 52,
  createdAt: "2022-05-20T11:30:34.000Z",
  updatedAt: "2022-05-20T11:30:34.000Z",
  UserId: 6,
  Title: "은행에 복면을 쓰고 갔다가 벌어진 일 - 우왁굳 반응",
  User: { id: 6, nickname: "진녕이" },
  Comments: [
    {
      User: { id: 1, nickname: "녹꾸리" },
      content: "댓글입니다.!!",
    },
    {
      User: { id: 1, nickname: "동주" },
      content: "댓글입니다.!!",
    },
    {
      User: { id: 1, nickname: "진녕" },
      content: "댓글입니다.!!",
    },
    {
      User: { id: 1, nickname: "동하" },
      content: "댓글입니다.!!",
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
  const CommentToggle = () => {
    setIsOpen(prev => !prev)
  }

  const liked = post.Likers.find((v) => v.id === myId);

  console.log(post.Comments);

  return (
    <div className="video__container">
      <div className="video__card">
        <div className="video__inner">
          <div className="video__title">
            <h2>{post.Title}</h2>
          </div>
          <ReactPlayer
            className="player"
            url={"https://youtu.be/aMKr-Prt-EY"}
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

            {isOpen && (
              <div className="comment__card">
                <CommentForm post={post} />
                <List
                  header={`${post.Comments.length} 개의 댓글`}
                  itemLayout="horizontal"
                  dataSource={post.Comments}
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
