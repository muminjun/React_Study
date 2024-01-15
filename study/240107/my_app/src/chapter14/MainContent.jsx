import React, {useContext} from "react";
import ThemeContext from "./ThemeContext";
import "./theme.css"

function MainContent(props) {
  const {theme, changeTheme} = useContext(ThemeContext)

  return (
    <div className={`${theme === 'light' ? 'white' : 'black'}`}>
      <p>다크모드</p>
      <button onClick={changeTheme}>변경하기</button>
    </div>
  )
}

export default MainContent