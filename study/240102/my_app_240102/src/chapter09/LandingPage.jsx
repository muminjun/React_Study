import React, {useState} from "react";
import Toolbar from "./Toolbar";

function LandingPage(props) {
  const [isLogined, setIsLoggedIn] = useState(false)

  const onClickLogin = () =>{
    setIsLoggedIn(true)
  }

  const onClickLogout = () =>{
    setIsLoggedIn(false)
  }

  return (
    <div>
      <Toolbar 
        isLogined={isLogined}
        onClickLogin={onClickLogin}
        onClickLogout={onClickLogout}
      />
      <div>리액트공부!</div>
    </div>
  )
}

export default LandingPage