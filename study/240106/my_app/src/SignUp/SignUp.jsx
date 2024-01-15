// import React, {useState} from "react"

// function SignUpPage() {
//   const [email, setEmail] = useState("")
//   const [name, setName] = useState("")
//   const [password, setPassword] = useState("")
//   const [passwordConfirm, setPasswordConfirm] = useState("")

//   const handleEmailChange = (event) => {
//     console.log(event.tartget.value)
//   }

//   const handleNameChange = (event) => {
//     console.log(event.tartget)
//   }

//   const handlePWChange = (event) => {
//     console.log(event.tartget)
//   }

//   const handlePWCChange = (event) => {
//     console.log(event.tartget)
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault()
    
//     if (password != passwordConfirm) {
//       return alert("비번다름")
//     }

//     const body = {
//       email:email,
//       name:name,
//       password:password,
//     }
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>Email</label>
//         <input type="email" name="email" value={email} onChange={handleEmailChange}/>
//         <label>Name</label>
//         <input type="text" name="name" value={name} onChange={handleNameChange}/>
//         <label>Password</label>
//         <input type="password" name="password" value={password} onChange={handlePWChange}/>
//         <label>PWConfrim</label>
//         <input type="password" name="passwordConfirm" value={passwordConfirm} onChange={handlePWCChange}/>
//       <br />
//       <button>회원가입</button>
//       </form>
//     </div>
//   )
// }

// export default SignUpPage

import React, { useState } from "react";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value); // event.target.value를 사용하여 이메일 값을 설정합니다.
  };

  const handleNameChange = (event) => {
    setName(event.target.value); // event.target.value를 사용하여 이름 값을 설정합니다.
  };

  const handlePWChange = (event) => {
    setPassword(event.target.value); // event.target.value를 사용하여 비밀번호 값을 설정합니다.
  };

  const handlePWCChange = (event) => {
    setPasswordConfirm(event.target.value); // event.target.value를 사용하여 비밀번호 확인 값을 설정합니다.
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      return alert("비밀번호가 다릅니다.");
    }

    const body = {
      email: email,
      name: name,
      password: password,
    };

    // 회원가입 정보를 서버로 전송하는 코드를 작성하세요.
    // 예를 들면 axios.post('/api/signup', body)와 같은 방식으로 요청을 보낼 수 있습니다.
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePWChange}
        />
        <label>Password Confirm</label>
        <input
          type="password"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={handlePWCChange}
        />
        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default SignUpPage;
