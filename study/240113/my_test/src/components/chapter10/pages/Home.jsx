import React, {useState, useRef, useCallback} from "react";
import TodoMain from "./TodoMain";
import "../assets/Home.scss"
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";

const Home = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "chapter01",
      checked: false,
    },
    {
      id: 2,
      title: "chapter02",
      checked: true,
    },
    {
      id: 3,
      title: "chapter03",
      checked: false,
    },
  ])

  const nextId = useRef(4)

  const onInsert = useCallback(title => {
    const todo = {
      id:nextId.current,
      title,
      checked:false,
    }
    setTodos(todos.concat(todo))
    nextId.current += 1
  }, [todos])

  const onRemove = useCallback(id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }, [todos])

  const onToggle = useCallback(id => {
    setTodos(todos.map(todo => 
      todo.id === id ? {...todo, checked : !todo.checked} : todo
    ))
  })

  return (
  <TodoMain>
    <CreateTodo onInsert={onInsert}/>
    <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
  </TodoMain>
  )
}

export default Home