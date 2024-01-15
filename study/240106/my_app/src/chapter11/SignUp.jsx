import React, {useState} from "react";

function SignUp(props) {
  const [name, setName] = useState('')
  const [gender, setGender] = useState('남자')

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const handleSelect = (event) => {
    setGender(event.target.value)
  }

  const handleSubmit = (event) => {
    console.log(name)
    console.log(gender)
    event.preventDefault()
    setName('')
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          이름을 입력하세요.
          <input type="text" value={name} onChange={handleChange}/>
        </label>

        <label>
          성별을 선택하세요.
          <select value={gender} onChange={handleSelect}>
            <option value="남자">남자</option>
            <option value="여자">여자</option>
          </select>
        </label>

        <button type="submit">확인</button>
      </form>
    </div>
  )
}

export default SignUp