import React, {useState} from "react"
import FancyBorder from "./FancyBorder"

function Dialog(props) {
  return (
    <FancyBorder>
      <h1>{props.title}</h1>
      <p>{props.message}</p>
      {props.children}
    </FancyBorder>
  )
}

function SignUpDialog(props) {
  const [nickname, setNickname] = useState('')

  const handleChange = (event) => {
    setNickname(event.target.value)
  }

  const handleSignUp = (event) => {
    event.preventDefault()
    alert(`어서오세요. ${nickname}님!`)
    setNickname("")
  }

  return (
    <Dialog 
    title="화성탐사"
    message="닉네임입력">
      <input type="text" value={nickname} onChange={handleChange}/>
      <button onClick={handleSignUp}>확인</button>
    </Dialog>
  )
}

export default SignUpDialog