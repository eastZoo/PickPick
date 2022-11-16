import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/post/postSlice";

const UserView = () => {
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();

  console.log(post)
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  return (
    <div>
      <h2>List of Users</h2>
      {post.loading && <div>Loading
        ...</div>}
      {!post.loading && post.error ? <div>Error: {post.error}</div> : null}
      {!post.loading && post.posts.length ? (
        <ul>
          {post.posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default UserView;
