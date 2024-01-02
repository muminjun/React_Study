import React, {useState, useEffect} from "react";
import useCounter from "./useCounter";

const MAX_CNT = 10

function InCounter(props) {
  const [isFull, setIsFull] = useState(false)
  const [count, plusCount, minusCount] = useCounter(0)

  useEffect(()=> {
    setIsFull(count >= MAX_CNT)
  })

  return (
    <div>
      <p>{`총 ${count}명이 있습니다.`}</p>
      <button onClick={plusCount} disabled={isFull}>입장</button>
      <button onClick={minusCount}>퇴장</button>

      {isFull && <p>정원이 가득 찼습니다.</p>}
    </div>
  )
}

export default InCounter