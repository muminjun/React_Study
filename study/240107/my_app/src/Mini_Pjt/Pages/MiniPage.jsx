import React from "react";
import {useNavigate} from "react-router-dom"
import PostList from "../Lists/PostList";
import Button from "../UI/Button"
import data from "../../data.json"

function MainPage (props) {
  const nav = useNavigate()

  return (
    <div>
      <div>
        <Button 
          title="글 작성하기"
          onClick={() => {
            nav("/post-create")
          }}
        />

        <PostList 
          posts={data}
          onClickItem={(item) => {
            nav(`/post/${item.id}`)
          }}
        />
      </div>
    </div>
  )
}

export default MainPage