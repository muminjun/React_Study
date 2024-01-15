import React, {useRef} from "react";

const Component = () => {
  const id = useRef(1)
  const setId = (num) => {
    id.current = num
  } 
  const printId = () => {
    console.log(id.current)
  }

  return (
    <div>
      <p>ref예시</p>
    </div>
  )
}

export default Component