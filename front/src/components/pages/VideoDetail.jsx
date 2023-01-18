import React, { useCallback } from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import { Avatar, List, Popover, Button, Skeleton, Input, Form } from "antd";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import "./VideoDetail.css";
import CommentForm from "../CommentForm";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LIKE_POST_REQUEST,
  LOAD_COMMENT_REQUEST,
  LOAD_POST_REQUEST,
  REMOVE_COMMENT_REQUEST,
  UNLIKE_POST_REQUEST,
} from "../../redux/reducers/post";
import Comment from "../Comment";

const VideoDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [edit, setEdit] = useState(false);
  const { singlePost } = useSelector((state) => state.post);
  // current login user ID
  const { userId } = useSelector((state) => state.auth);

  // Card 컴포넌트 Link로부터 받아온 상태값
  // const { videoId, url, author, title } = location.state;

  const { videoId, author, title, likers, url } = location.state;

  const onLike = () => {
    if (!userId) {
      return alert("로그인이 필요합니다.");
    }
    const token = localStorage.getItem("token");
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: { videoId: videoId, token: token },
    });
  };

  const onUnlike = () => {
    if (!userId) {
      return alert("로그인이 필요합니다.");
    }
    const token = localStorage.getItem("token");
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: { videoId: videoId, token: token },
    });
  };

  // -> sagas/post removePost
  const onRemovePost = (commentId) => {
    const token = localStorage.getItem("token");
    dispatch({
      type: REMOVE_COMMENT_REQUEST,
      data: { videoId: videoId, commentId: commentId, token: token },
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch({
      type: LOAD_POST_REQUEST,
      data: { videoId: videoId, token: token },
    });
  }, []);

  console.log(singlePost);
  // const { url ,videoLike, comments} = singlePost;
  const liked = singlePost?.videoLike.find((v) => v.user.id === userId);

  return (
    <section className="videodetail">
      <div className="videodetail__wrapper">
        <div className="video__inner">
          <ReactPlayer
            className="player"
            url={url}
            width="100%" // 플레이어 크기 (가로)
            height="720px"
            playing={true}
            muted={true}
            controls={true}
          />
          <div className="video__title">
            <h2>{title}</h2>
            <div className="author-like">
              <div className="video__sub">{author}</div>
              <div className="comment__icon">
                {liked ? (
                  <FcLike
                    twoToneColor="#eb2f96"
                    key="heart"
                    onClick={onUnlike}
                    style={{ fontSize: "25px" }}
                  />
                ) : (
                  <FcLikePlaceholder
                    key="heart"
                    style={{ fontSize: "25px" }}
                    onClick={onLike}
                  />
                )}
                <span style={{ fontSize: "20px", marginLeft: "5px" }}>
                  {singlePost?.videoLike.length}
                </span>
              </div>
            </div>
          </div>
          <div className="comment__container">
            {/* 댓글창 부분 데이터  */}

            <div className="comment__card">
              <CommentForm videoId={videoId} />
              <div>{singlePost?.comments.length}개의 댓글</div>
              <br />
              {singlePost?.comments.map((comment, idx) => (
                <Comment
                  commentId={comment.commentId}
                  avatar={comment.user.imgUrl}
                  nickName={comment.user.nickName}
                  description={comment.comment}
                  videoId={videoId}
                />
              ))}

              {/* <List
                header={`${singlePost?.comments.length}개의 댓글`}
                itemLayout="horizontal"
                dataSource={singlePost?.comments}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Popover
                        key="more"
                        content={[
                          <Button.Group>
                            {userId && item.user.id === userId ? ( // 로그인 했고 내아이디가 게시글 작성자와 같다면
                              // 수정 , 삭제 가능
                              <div>
                                <Button
                                  onClick={() => setEdit((prev) => !prev)}
                                >
                                  수정
                                </Button>
                                <Button
                                  type="danger"
                                  onClick={() => onRemovePost(item.commentId)}
                                >
                                  삭제
                                </Button>
                              </div>
                            ) : (
                              // 다르면 신고 가능
                              <Button>신고</Button>
                            )}
                          </Button.Group>,
                        ]}
                      >
                        <EllipsisOutlined
                          style={{ fontSize: "20px", cursor: "pointer" }}
                        />
                      </Popover>,
                    ]}
                  >
                    {edit ? (
                      // 수정버튼 눌렀을 때
                      <Skeleton
                        avatar
                        title={false}
                        loading={item.loading}
                        active
                      >
                        <List.Item.Meta
                          avatar={<Avatar src={item.user.imgUrl} />}
                          title={item.user.nickName} //  user nickname
                        />
                        <Form title={item.comment} />
                      </Skeleton>
                    ) : (
                      // 수정버튼 안눌렀을때 기본
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
                    )}
                  </List.Item>
                )}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoDetail;
