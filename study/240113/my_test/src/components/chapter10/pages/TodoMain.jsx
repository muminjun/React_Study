import React from "react";
import "../assets/TodoMain.scss"

const TodoMain = ({children}) => {
  return (
    <div className="TodoMain">
      <div className="app-title">일정 관리</div>
      <div className="sub-title">{children}</div>
    </div>
  )
}

export default TodoMain