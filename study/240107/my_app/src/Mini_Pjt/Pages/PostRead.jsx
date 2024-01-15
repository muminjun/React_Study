import React, {useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../UI/Button"
import TextInput from "../UI/TextInput"
import CommentList from "../Lists/CommentList"
import data from "../../data.json"

function PostRead (props) {
  const nav = useNavigate()
  const { postId } = useParams();

  const post = data.find((item) => {
      return item.id == postId
  });

  const [comment, setComment] = useState("")

  return (
    <div>
      <div>
        <Button 
          title="뒤로가기"
          onClick={()=>{
            nav("/")
          }}
        />
        
        <div>
          <p>{post.title}</p>
          <p>{post.content}</p>
        </div>

        <p>댓글</p>
        <CommentList comments={post.comments}/>

        <TextInput 
          value={comment}
          onChange={(event)=> {
            setComment(event.target.value)
          }}
        />

        <Button 
          title="댓글작성"
          onClick={()=> {
            nav("/")
          }}
        />
      </div>
    </div>
  )
}

export default PostRead