import React from "react";

function CommentListItem (props) {
  const {comment} = props

  return (
    <div>
      <p>{comment.content}</p>
    </div>
  )
}

export default CommentListItem