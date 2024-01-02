import React from "react";

function Toolbar(props) {
  const {isLogined, onClickLogin, onClickLogout} = props

  return (
    <div>
      {isLogined && <p>환영합니다!</p>}

      {isLogined ? (<button onClick={onClickLogout}>로그아웃</button>)
      :
      (<button onClick={onClickLogin}>로그인</button>)
      }
    </div>
  )
}

export default Toolbar