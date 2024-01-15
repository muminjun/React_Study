import React from "react";

function PostListItem (props) {
  const {post, onClick} = props

  return (
    <div onClick={onClick}>
      <p>{post.title}</p>
    </div>
  )
}

export default PostListItem