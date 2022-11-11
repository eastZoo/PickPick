import { Button, Form, Input } from 'antd';
import React from 'react';


const CommentForm = () => {

  return (
    <Form >
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea rows={4} />
        <Button
          style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }}
          type="primary"
          htmlType="submit"
        />
      </Form.Item>
    </Form>
  );
};


export default CommentForm;
