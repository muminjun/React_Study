import React, {useState, useCallback} from "react";
import MainContent from "./MainContent";
import ThemeContext from "./ThemeContext";

function DarkOrLight(props) {
  const [theme, setTheme] = useState('light')

  const changeTheme = useCallback(() => {
    if (theme === 'light') {
      setTheme('dark')
    }
    else if (theme === 'dark') {
      setTheme('light')
    }
  })

  return (
    <ThemeContext.Provider value={{theme, changeTheme}}>
      <MainContent />
    </ThemeContext.Provider>
  )
}

export default DarkOrLight