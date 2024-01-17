import React, { useState } from "react";
import moment from 'moment';
import { Calendar, momentLocalizer } from "react-big-calendar";
import "./Calendar.scss";
import Toolbar from "./Toobar";

const MyCalendar = () => {
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);

  return (
    <Calendar
      style={{ height: 500 }}
      localizer={localizer}
      components={{
        toolbar: Toolbar,             // 달력 헤더 변경
      }}
      />
  )
}

export default MyCalendar