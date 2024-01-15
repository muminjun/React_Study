import TodoItemList from "./TodoItemList";
import React from "react";
import "../assets/TodoList.scss"

const TodoList = ({todos, onRemove, onToggle}) => {
  return (
    <div className="TodoList">
      {todos.map((todo) => (
        <TodoItemList todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle}/>
      ))}
    </div>
  )
}

export default TodoList