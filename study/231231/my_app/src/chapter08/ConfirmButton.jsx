// import React from "react";

// class ConfirmButton extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       isConfirm: false,
//     }

//     // this.handleConfirm = this.handleConfirm.bind(this)
//   }

//   // handleConfirm() {
//   //   this.setState((prevState) => ({
//   //     isConfirm: !prevState.isConfirm,
//   //   }))
//   // }

//   handleConfirm = () => {
//     this.setState((prevState) => ({
//       isConfirm: !prevState.isConfirm,
//     }))
//   }

//   render() {
//     return (
//       <button
//       onClick={this.handleConfirm}
//       disabled={this.state.isConfirm}>
//         {this.state.isConfirm ? "확인됨" : "확인하기"}
//       </button>
//     )
//   }
// }

// export default ConfirmButton


// import { useState } from "react";
// import React from "react";

// function ConfirmButton(props) {
//   const [isConfirm, setIsConfirm] = useState(false)

//   const handleConfirm = () => {
//     setIsConfirm((prevIsConfirm) => !prevIsConfirm)
//   }

//   return (
//     <button onClick={handleConfirm} disabled={isConfirm}>
//       {isConfirm ? "확인" : "확인하기"}
//     </button>
//   )
// }

// export default ConfirmButton

import React, {useState} from "react";

function ConfirmButton (props) {
  const [isConfirm, setIsConfirm] = useState(false)
  const handleConfirm = () => {
    setIsConfirm((prev) => !prev)
  }

  return (
    <button onClick={handleConfirm} disabled={isConfirm}>
      {isConfirm? "확인" : "확인하기"}
    </button>
  )
}
export default ConfirmButton