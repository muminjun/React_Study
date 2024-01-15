import React, {useState, useMemo, useCallback} from "react";

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

const Average_2 = () => {
  const [list, setList] = useState([])
  const [number, setNumber] = useState('')

  // const onChange = (event) => {
  //   setNumber(event.target.value)
  // }

  // const addList = () => {
  //   const newList = list.concat(parseInt(number))
  //   setList(newList)
  //   setNumber('')
  // }
  
  const onChange = useCallback(event => {
    setNumber(event.target.value)
  }, [])  // 어떤 값이 바뀌었을 때 이 함수를 새로 생성해야하는지

  const addList = useCallback(() => {
    const newList = list.concat(parseInt(number))
    setList(newList)
    setNumber('')
  }, [number, list])  // number와 list를 넣게 되면 인풋 내용이 바뀌거나 새로운 항목이 추가될 때 새로 만들어진 함수를 사용

  const avg = useMemo(() => getAverage(list), [list])

  return (
    <div>
      <input value={number} onChange={onChange} />
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

export default Average_2