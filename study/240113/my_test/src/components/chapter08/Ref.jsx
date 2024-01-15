import React, {useState, useMemo, useCallback, useRef} from "react";

const getAverage = (numbers) => {
  console.log('계산중', numbers)
  if (numbers.length === 0) {
    return 0
  }
  const sum = numbers.reduce((a, b) => a + b)
  return (
    sum / numbers.length
  )
}

const Average_3 = () => {
  const [list, setList] = useState([])
  const [number, setNumber] = useState('')
  const inputFocus = useRef(null)

  const onChange = useCallback(event => {
    setNumber(event.target.value)
  }, [])

  const addList = useCallback(() => {
    const newList = list.concat(parseInt(number))
    setList(newList)
    setNumber('')
    inputFocus.current.focus()  // 인풋창으로 포커스 이동
  }, [number, list])

  const avg = useMemo(() => getAverage(list), [list])

  return (
    <div>
      <input value={number} onChange={onChange} ref={inputFocus}/>
      <button onClick={addList}>등록</button>
      <ul>
        {list.map((number, idx) => (
          <li key={idx}>{number}</li>
        ))}
      </ul>
      <div>
        <p>평균값 : {avg}</p>
      </div>
    </div>
  )
}

export default Average_3