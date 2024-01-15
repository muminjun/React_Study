import "../assets/CreateTodo.scss"
import React, {useState, useCallback} from "react"

const CreateTodo = ({onInsert}) => {
  const [title, setTitle] = useState('')

  const onChange = useCallback(event => {
    setTitle(event.target.value)
  }, [])

  const onClick = useCallback(event => {
    onInsert(title)
    setTitle('')
    event.preventDefault()
  },[onInsert, title])

  return (
    <form className="CreateTodo">
      <input
        type="text"
        placeholder="할 일을 입력하세요."
        value={title}
        onChange={onChange}
      />
      <button onClick={onClick}>+</button>
    </form>
  )
}

export default CreateTodo