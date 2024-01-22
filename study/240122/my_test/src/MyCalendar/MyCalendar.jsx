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

  // 특정 일을 클릭하면 그 날의 모달을 띄우는 함수
  const handleDateClick = (info) => {
    setIsDayModal(!isDayModal);

    const events = info.view.calendar.getEvents().filter(event => {   // 클릭한 날짜에 있는 모든 이벤트를 가져오는 filter
      const { start, end } = event;
      return info.date >= start && info.date < end;                   // 이벤트의 시작일과 종료일 사이에 있는지 확인
    });

    const eventDetails = events.map(event => ({
      title: event.title,
      start: event.startStr,

      // event의 end 일자에서 -1 하는 식(fullCalendar는 end가 이벤트가 끝난 다음 날이라고 인식해서.)
      end: new Date(new Date(event.endStr).setDate(new Date(event.endStr).getDate() - 1)).toISOString().split('T')[0],
      comment: event.extendedProps.comment,
      color: event.backgroundColor,
    }));    
    setNow({ date: info.dateStr, dayIndex: info.dayEl.cellIndex, events: eventDetails });
  };
  

  // 날짜에서 "일"을 제거 하는 함수
  const numberText = (e) => {
    const day = document.createElement("a")
    day.classList.add("fc-daygrid-day-number")
    day.innerHTML = e.dayNumberText.replace("일", "")
    if (e.view.type === "dayGridMonth") {
      return {html : day.outerHTML}
    }
    return {domNodes:[]}
  }

  // ex)일정이 5,6,7일이면, 5, 6만 라벨이 칠해짐 => 사용자에게 받는 end 날짜에 +1을 더해야(=1/5~1/8) 5,6,7에 라벨이 칠해짐.
  const eventList = [
    {
      id:1,
      title:"11111",
      start:"2024-01-05",
      end:"2024-01-08",
      comment: "test1",
      color:"red",
    },
    {
      id:2,
      title:"22222",
      start:"2024-01-07",
      end:"2024-01-12",
      comment: "test2",
      color:"yellow",
    },
    {
      id:3,
      title:"33333",
      start:"2024-01-10",
      end:"2024-01-14",
      comment: "test3",
      color:"green",
    },
    {
      id:4,
      title:"44444",
      start:"2024-01-29",
      end:"2024-01-30",
      comment: "test4",
      color:"pupple",
    },
    {
      id:5,
      title:"55555",
      start:"2024-01-30",
      end:"2024-01-32",
      comment: "test5",
      color:"orange",
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
        fixedWeekCount={false}
        eventTextColor='black'
      />
      {isDayModal && <DayClick now={now} state={setIsDayModal}/>}
    </>
  )
}

export default MyCalendar



{/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EventComponent() {
  const [event, setEvent] = useState({
    id: 1,
    title: '11111',
    start: '2024-01-05',
    end: '2024-01-08',
    comment: 'test1',
    color: 'red'
  });

  useEffect(() => {
    const updateEvent = async () => {
      try {
        // 'end' 날짜를 파싱하여 JavaScript Date 객체로 변환
        const endDate = new Date(event.end);
        
        // 'end' 날짜에 1일을 더한 새로운 날짜 계산
        endDate.setDate(endDate.getDate() + 1);

        // 새로운 'end' 날짜를 문자열로 변환하여 업데이트
        const updatedEvent = { ...event, end: endDate.toISOString().split('T')[0] };

        // 서버로 모든 이벤트 전송
        await axios.post('/api/updateEvents', updatedEvent);

        // 상태 업데이트
        setEvent(updatedEvent);
      } catch (error) {
        console.error('이벤트 업데이트 실패:', error);
      }
    };

    updateEvent();
  }, []);

  return (
    <div>
      <p>Event ID: {event.id}</p>
      <p>Title: {event.title}</p>
      <p>Start: {event.start}</p>
      <p>End: {event.end}</p>
      <p>Comment: {event.comment}</p>
      <p>Color: {event.color}</p>
    </div>
  );
}

export default EventComponent;
*/}