import React, {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from '@fullcalendar/interaction';
import momentPlugin from '@fullcalendar/moment'
import locale from '@fullcalendar/core/locales/ko';
import "./MyCalendar.scss" 
import DayClick from "./DayClick.jsx"
import CreateEvent from "./CreateEvent.jsx";
import axios from "axios";

function MyCalendar () {
  const [isDayModal, setIsDayModal] = useState(false)
  const [isCreateModal, setIsCreateModal] = useState(false)
  const [now, setNow] = useState('')
  const [eventList, setEventList] = useState([])
  const today = new Date().getDate()

  useEffect(() => {
    axios.get("")
      .then((res) => {
        setEventList(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  
  const handleCreateEvent = () => {
    setIsCreateModal(prevState => !isCreateModal)
  }

  const handleDateClick = (info) => {                                       // 특정 일을 클릭하면 그 날의 모달을 띄우는 함수
    setIsDayModal(prevState => !isDayModal);

    const events = info.view.calendar.getEvents().filter(event => {         // 클릭한 날짜에 있는 모든 이벤트를 가져오는 filter
      const { start, end } = event;
      return info.date >= start && info.date < end;                         // 이벤트의 시작일과 종료일 사이에 있는지 확인
    });

    const eventDetails = events.map(event => ({                             // 특정 날에 포함된 이벤트의 항목들
      title: event.title,
      start: event.startStr,
      end: new Date(new Date(event.endStr).setDate(new Date(event.endStr).getDate() - 1)).toISOString().split('T')[0],    // FullCalendar 특성상, end를 마지막날이라고 생각하여 라벨이 안채워지므로 end +1 하여 저장 후, 조회 시 -1 함.
      color: event.backgroundColor,
    }));
    
    setNow({ date: info.dateStr, dayIndex: info.dayEl.cellIndex, events: eventDetails });
  };

  const numberText = (e) => {
    const day = document.createElement("a");
    day.classList.add("fc-daygrid-day-number");
    day.innerHTML = e.dayNumberText.replace("일", "");
    return { html: day.outerHTML };
  };

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
      <div>
        <button onClick={handleCreateEvent}>추가</button>
        {isCreateModal && <CreateEvent state={setIsCreateModal} event={setEventList}/>}
      </div>
    </>
  )
}

export default MyCalendar