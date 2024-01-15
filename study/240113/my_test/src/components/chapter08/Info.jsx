import React, {useState, useEffect} from "react";

const Info = () => {
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')

  useEffect(() => {
    console.log('effect')
    return ()=>{
      console.log('unmount')
    }
  }, [])

  const nameChange = (event) => {
    setName(event.target.value)
  }

  const nicknameChange = (event) => {
    setNickname(event.target.value)
  }

  return (
    <div>
      <div>
        <input type="text" value={name} onChange={nameChange}/>
        <input type="text" value={nickname} onChange={nicknameChange}/>
      </div>

      <div>
        <p>이름 : {name}</p>
        <p>닉네임 : {nickname}</p>
      </div>
    </div>
  )
}

export default Info