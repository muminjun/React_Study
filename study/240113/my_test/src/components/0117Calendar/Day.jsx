import { faIR } from "date-fns/locale"
import moment from "moment"
import React, {useState} from "react"

function Day (props) {

  return (
    <div>
      {moment(props.date).format("DD")}
    </div>
  )
}

export default Day