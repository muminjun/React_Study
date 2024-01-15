import React, {useState} from "react"

function EventPractice () {
  const [message, setMessage] = useState('')
  const [wordList, setWordList] = useState([])
  const [index, setIndex] = useState(1)

  const handleChange = (event) => {
    setMessage(event.target.value)
  }

  const handleAddWord = (event) => {
    const newList = [...wordList]
    newList.push(message)
    setWordList(newList)
    setMessage('')
    setIndex(index)
    setIndex(index + 1)
  }


  return (
    <div>
      <h1>이벤트 연습</h1>
      <input type="text" value={message} onChange={handleChange}/>
      <button onClick={handleAddWord}>리스트에 추가</button>
      <hr />

      <ul>
        {wordList.map((word) => (
          <li key={index}>{index},{word}<button>삭제</button></li>
        ))}
      </ul>
    </div>
  )
}

export default EventPractice