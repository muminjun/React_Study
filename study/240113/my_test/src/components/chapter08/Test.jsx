import React, {useState} from "react";
import Info from "./Info";

const HideInfo = () => {
  const [show, setShow] = useState(false)

  return (
    <div>
      <button onClick={() => setShow(!show)}>{show ? '보이기' : '숨기기'}</button>
      {show && <Info />}
    </div>
  )
}

export default HideInfo