import React, {useState, useEffect} from "react";
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from '@fullcalendar/interaction';
import momentPlugin from '@fullcalendar/moment'
import locale from '@fullcalendar/core/locales/ko';
import "./MyCalendar.scss" 
import DayClick from "./DayClick.jsx"

function MyCalendar () {
  const [isDayModal, setIsDayModal] = useState(false)
  const [now, setNow] = useState('')
  const today = new Date().getDate()

  // 특정 일을 클릭하면 그 날의 정보를 받고 모달을 띄우는 함수
  const handleDateClick = (e) => {
    setIsDayModal(!isDayModal);
    setNow(e);
  };

  // 날짜 30일 에서 "일"을 제거 하는 함수
  const numberText = (e) => {
    const day = document.createElement("a")
    day.classList.add("fc-daygrid-day-number")
    day.innerHTML = e.dayNumberText.replace("일", "")
    if (e.view.type === "dayGridMonth") {
      return {
        html : day.outerHTML
      }
    }
    return {
      domNodes:[]
    }
  }

  const eventList = [
    {
      id:1,
      title:"11111",
      start:"2024-01-01",
      end:"2024-01-10",
      place:"",
      content:"ㅂㅇㅂㅇ",
      color:"#F0C6FB",
    },
    {
      id:2,
      title:"22222",
      start:"2024-01-11",
      end:"2024-01-15",
      place:"",
      content:"ㅂㅇㅂㅇ",
      color:"#DDFBC6",
    },
    {
      id:3,
      title:"33333",
      start:"2024-01-16",
      end:"2024-01-19",
      place:"",
      content:"ㅂㅇㅂㅇ",
      color:"#FFA6A6",
    },
  ]

  return (
    <>
      <FullCalendar 
        initialView="dayGridMonth"
        locale={locale}
        plugins={[dayGridPlugin, interactionPlugin, momentPlugin]}
        height={'85vh'}
        headerToolbar={{
          start: 'title',
          end: 'today,prev,next'
        }}
        buttonText={{today:`${today}`}}
        dateClick={handleDateClick}
        dayCellContent={numberText}
        events={eventList}
      />
      {isDayModal && <DayClick now={now} state={setIsDayModal}/>}
    </>
  )
}

export default MyCalendar