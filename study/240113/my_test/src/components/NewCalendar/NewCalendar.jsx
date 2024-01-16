import React, { useState } from "react";
import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css'
import moment from "moment";
import "./NewCalendar.scss"

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());
  
  return (
    <div>
      <Calendar
        onChange={setDate}
        value={date}
        formatDay={(locale, date) => moment(date).format("DD")}
        // selectRange={true}
        defaultView='decade' 
      ></Calendar>

      <div>
        {moment(date).format("YYYY년 MM월 DD일")} 
      </div>
    </div>
  );
};

export default MyCalendar;