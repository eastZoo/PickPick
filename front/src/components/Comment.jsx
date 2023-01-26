import React from "react";
import { useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  REMOVE_COMMENT_REQUEST,
  UPDATE_COMMENT_REQUEST,
} from "../redux/reducers/postReducer";
import "./Comment.css";
import Button from "./UI/Button";

const Comment = ({ avatar, nickName, description, commentId, videoId }) => {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [comment, setComment] = useState(description);

  const editHandler = () => {
    setEdit((prev) => !prev);
  };

  const updateCommentHandler = (event) => {
    setComment(event.target.value);
    console.log(comment);
  };
  // -> sagas/post removePost
  const onRemoveComment = (commentId) => {
    const token = localStorage.getItem("token");
    dispatch({
      type: REMOVE_COMMENT_REQUEST,
      data: { commentId: commentId, token: token },
    });
  };

  const onUpdateComment = () => {
    const token = localStorage.getItem("token");
    dispatch({
      type: UPDATE_COMMENT_REQUEST,
      data: {
        videoId: videoId,
        commentId: commentId,
        token: token,
        comment: comment,
      },
    });
    setEdit(false);
  };

  return (
    <div className="comment__wrapper">
      <div className="avatar">
        <div className="avatar__img__wrapper">
          <img src={avatar} className="avatar__img" alt="" />
        </div>
      </div>
      <div className="comment">
        <div>{nickName}</div>
        {edit ? (
          <div className="comment-input__wrapper">
            <input
              type="text"
              className="comment__edit__input"
              value={comment}
              onChange={updateCommentHandler}
            />
            <Button onClick={onUpdateComment}>save</Button>
          </div>
        ) : (
          <div className="description">{description}</div>
        )}
      </div>
      <div className="comment__edit__btn">
        <FaTrashAlt
          style={{ marginRight: "10px", fontSize: "16px", cursor: "pointer" }}
          onClick={() => onRemoveComment(commentId)}
        />
        <FaEdit
          style={{ fontSize: "16px", cursor: "pointer" }}
          onClick={editHandler}
        />
      </div>
    </div>
  );
};

export default Comment;
