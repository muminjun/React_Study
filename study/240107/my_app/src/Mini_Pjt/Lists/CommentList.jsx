import React from "react";
import CommentListItem from "./CommentListItem";

function CommentList (props) {
  const {comments} = props

  return (
    <div>
      {comments.map((comment, index) => {
        return (
          <CommentListItem
            key = {comment.id}
            comment={comment}
          />
        )
      })}
    </div>
  )
}

export default CommentList