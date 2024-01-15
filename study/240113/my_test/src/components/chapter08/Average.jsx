import React, {useState, useMemo} from "react";

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

const Average = () => {
  const [list, setList] = useState([])
  const [number, setNumber] = useState('')

  const onChange = (event) => {
    setNumber(event.target.value)
  }

  const addList = () => {
    const newList = list.concat(parseInt(number))
    setList(newList)
    setNumber('')
  }

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

export default Average