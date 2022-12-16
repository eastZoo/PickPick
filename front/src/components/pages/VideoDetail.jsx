import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import { Avatar, List, Popover, Button, Skeleton  } from "antd";
import {
  HeartTwoTone,
  HeartOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import "./VideoDetail.css";
import CommentForm from "../CommentForm";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_COMMENT_REQUEST, REMOVE_COMMENT_REQUEST } from "../../redux/reducers/post";


const VideoDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [liked, setLiked] = useState(false);
  const { comments, removePostLoading } = useSelector((state) => state.post);
  // current login user ID
  const { userId } = useSelector((state) => state.auth);


  console.log(comments)
  // Card 컴포넌트 Link로부터 받아온 상태값
  const { videoId, url, author, title } = location.state;


  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch({
      type: LOAD_COMMENT_REQUEST,
      data: { videoId: videoId, token: token },
    });
    console.log(comments)
  }, []);

  const changeLike = () => {
    setLiked((prev) => !prev)
  }

  // -> sagas/post removePost
  const onRemovePost = (commentId) => {
    const token = localStorage.getItem("token");
    dispatch({
      type: REMOVE_COMMENT_REQUEST,
      data: { videoId: videoId, commentId:commentId, token: token },
    });
  };


  return (
    <div className="video__container">
      <div className="video__card">
        <div className="video__inner">
          <div className="video__title">
            <h2>
              {title}, videoId : {videoId}
            </h2>
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
              {liked ? (
                <HeartTwoTone
                  twoToneColor="#eb2f96"
                  key="heart"
                  onClick={changeLike}
                />
              ) : (
                <HeartOutlined key="heart" onClick={changeLike} />
              )}
            </div>

            {/* 댓글창 부분 데이터  */}

            <div className="comment__card">
              <CommentForm videoId={videoId} />
              <List
                header={`${comments.length}개의 댓글`}
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Popover
                        key="more"
                        content={[
                          <Button.Group>
                            {userId && item.user.id === userId ? ( // 로그인 했고 내아이디가 게시글 작성자와 같다면
                              // 수정 , 삭제 가능
                              <div >
                                <Button>수정</Button>
                                <Button
                                  type="danger"
                                  loading={removePostLoading}
                                  onClick={() => onRemovePost(item.commentId)}
                                >
                                  삭제
                                </Button>
                              </div>
                            ) : (
                              // 다르면 신고 가능
                              <Button>신고</Button>
                            )}
                          </Button.Group>
                    ]}
                      >
                        <EllipsisOutlined style={{ fontSize: '20px', cursor: 'pointer'}}/>
                      </Popover>,
                    ]}
                  >
                    <Skeleton
                      avatar
                      title={false}
                      loading={item.loading}
                      active
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.user.imgUrl} />}
                        title={item.user.nickName} //  user nickname
                        description={item.comment} //  user comment
                      />
                    </Skeleton>
                  </List.Item>
                )}
              />

              {/* <List
                header={`${comments.length}개의 댓글`}
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={(item) => (
                  <List.Item
                    style={{ padding: 0 }}
                    actions={
                      <Button.Group>
                        {userId && item.user.id === userId ? ( // 로그인 했고 내아이디가 게시글 작성자와 같다면
                          // 수정 , 삭제 가능
                          <>
                            <Button>수정</Button>
                            <Button
                              type="danger"
                              loading={removePostLoading}
                              onClick={onRemovePost}
                            >
                              삭제
                            </Button>
                          </>
                        ) : (
                          // 다르면 신고 가능
                          <Button>신고</Button>
                        )}
                      </Button.Group>
                    }
                  >
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
                  </List.Item>
                )}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
