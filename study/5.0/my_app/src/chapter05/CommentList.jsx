import React from "react";
import Comment from "./Comment"

const comments = [
  {
    name : "민준",
    comment : "댓글1"
  },
  {
    name : "민",
    comment : "댓글2"
  },
  {
    name : "준",
    comment : "댓글3"
  },
]

function CommentList(props){
  return(
    <div>
      {comments.map((comment)=> {
        return(
          <Comment name={comment.name} comment={comment.comment}/>
        )
      })}
    </div>
  )
}

export default CommentList