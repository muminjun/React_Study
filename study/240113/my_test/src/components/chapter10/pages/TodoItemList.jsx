import { MdCheckBox, MdCheckBoxOutlineBlank, MdDeleteForever } from "react-icons/md";
import "../assets/TodoItemList.scss"
import cn from 'classnames'

const TodoItemList = ({todo, onRemove, onToggle}) => {
  const {id, title, checked} = todo

  return (
    <div className="TodoItemList">
      <div className={cn('checkBox', { checked })} onClick={() => onToggle(id)}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="todoItem">{title}</div>
      </div>
      <div className="delete" onClick={() => onRemove(id)}>
        <MdDeleteForever />
      </div>
    </div>
  )
}

export default TodoItemList