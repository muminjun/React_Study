import React from "react";

const students = [
  {id:0, name:'ㄱㅏ'},
  {id:1, name:'ㄴㅏ'},
  {id:2, name:'ㄷㅏ'},
  {id:3, name:'ㄹㅏ'},
  {id:4, name:'ㅁㅏ'},
  {id:5, name:'ㅂㅏ'},
  {id:6, name:'ㅅㅏ'},
]

function AttentionBook(props) {
  return(
    <ul>
      {students.map((student) => {
        return(
          <li key={student.id}>{student.name}</li>
        )
      })}
    </ul>
  )
}

export default AttentionBook