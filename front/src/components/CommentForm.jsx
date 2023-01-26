import { Form, Input } from "antd";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../redux/reducers/postReducer";
import Button from "./UI/Button";

const CommentForm = ({ videoId }) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");

  const onClick = () => {
    const token = localStorage.getItem("token");
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { videoId: videoId, commentText: commentText, token: token },
    });
    setCommentText("");
  };

  const commentHandler = (event) => {
    setCommentText(event.target.value);
    console.log(commentText);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  return (
    <Form>
      <Form.Item style={{ position: "relative", margin: 0 }}>
        <Input.TextArea
          rows={4}
          onKeyPress={onKeyPress}
          value={commentText}
          onChange={commentHandler}
        />
        <Button style={{ float: "right", width: "100px" }} onClick={onClick}>
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
