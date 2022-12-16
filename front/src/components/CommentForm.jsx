import { Form, Input } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../redux/reducers/post';
import Button from './UI/Button';


const CommentForm = ({videoId}) => {
  const dispatch = useDispatch();
  const [commitText, setCommitText] = useState('');

  const onClick = () => {
    const token = localStorage.getItem("token");
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { videoId: videoId, commitText:commitText, token: token },
    });
    setCommitText('');
   };

  const commitHandler = (event) => {
    setCommitText(event.target.value);
  }

  const onKeyPress = (e) => {
    if(e.key === 'Enter') {
      onClick();
    }
  }

  return (
    <Form>
      <Form.Item style={{ position: "relative", margin: 0 }}>
        <Input.TextArea rows={4} onKeyPress={onKeyPress} value={commitText} onChange={commitHandler}/>
        <Button style={{float: "right", width: "100px"}} onClick={onClick}>
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};


export default CommentForm;


