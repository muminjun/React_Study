import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../UI/TextInput"
import Button from "../UI/Button"

function PostCreate (props) {
  const nav = useNavigate()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  return (
    <div>
      <div>
        <TextInput 
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
          }}
        />

        <TextInput 
          value={content}
          onChange={(event) => {
            setContent(event.target.value)
          }}
        />

        <Button 
          title="글 작성하기"
          onClick={() => {
            nav("/")
          }}
        />
      </div>
    </div>
  )
}

export default PostCreate