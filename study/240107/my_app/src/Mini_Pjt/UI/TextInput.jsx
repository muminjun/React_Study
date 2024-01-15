import React from "react";

function TextInput (props) {
  const {value, onChange} = props

  return (
    <textarea value={value} onChange={onChange}></textarea>
  )
}

export default TextInput