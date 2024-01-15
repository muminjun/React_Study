import React, {useState} from "react";

const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>현재 값은 {count}입니다.</p>

      <button onClick={() => {setCount(count + 1)}}>+1</button>
      <button onClick={() => {setCount(count - 1)}}>-1</button>

    </div>
  )
}

export default Counter