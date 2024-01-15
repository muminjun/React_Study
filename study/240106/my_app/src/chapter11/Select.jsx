import React, {useState} from 'react'

function SelectFruit(props) {
  const [value, setValue] = useState('apple')

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(value)
  }

  return(
      <form onSubmit={handleSubmit}>
        <select value={value} onChange={handleChange}>
          <option value="apple">사과</option>
          <option value="banana">바나</option>
          <option value="grape">포도</option>
          <option value="strby">딸기</option>
        </select>

        <button type="submit">선택</button>
      </form>

  )
}

export default SelectFruit