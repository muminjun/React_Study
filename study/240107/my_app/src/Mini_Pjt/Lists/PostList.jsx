import React from "react";
import PostListItem from "./PostListItem"

function PostList (props) {
  const {posts, onClickItem} = props

  return (
    <div>
      {posts.map((post, index) => {
          return (
              <PostListItem
                  key={post.id}
                  post={post}
                  onClick={() => {
                      onClickItem(post);
                  }}
              />
          );
      })}
    </div>
  )
}

export default PostList