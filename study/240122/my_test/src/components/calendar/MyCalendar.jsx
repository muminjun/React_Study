import React, {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from '@fullcalendar/interaction';
import momentPlugin from '@fullcalendar/moment'
import locale from '@fullcalendar/core/locales/ko';
import "../../assets/scss/calendar/MyCalendar.scss"
import DayClick from "./DayClick.jsx"
import CreateEvent from "./CreateEvent.jsx";
import axios from "axios";

function MyCalendar () {
  const [isDayModal, setIsDayModal] = useState(false)
  const [isCreateModal, setIsCreateModal] = useState(false)
  const [now, setNow] = useState('')
  const [eventList, setEventList] = useState([
    {id:1,
    title:"테스트11",
    start:"2024-01-03",
    end:"2024-01-05",
    color:"#DDFBC6",},
    {id:2,
      title:"테스트22",
    start:"2024-01-04",
    end:"2024-01-07",
    color:"#FFCECE",},
    {id:4,
    title:"재현이와 낚시",
    start:"2024-01-02",
    end:"2024-01-09",
    color:"#E3EEFF",},
    {id:5,
      title:"민식이와 낚시",
    start:"2024-01-13",
    end:"2024-01-14",
    color:"#FFFCBA",},
    {id:6,
      title:"성찬이와 낚시",
    start:"2024-01-13",
    end:"2024-01-14",
    color:"#F0E8FF",},
    {id:7,
      title:"태석이와 낚시",
    start:"2024-01-31",
    end:"2024-02-02",
    color:"#FFCECE",},
    {id:8,
      title:"태윤이형과 낚시",
    start:"2024-01-02",
    end:"2024-01-09",
    color:"#F0E8FF",},
    {id:9,
    title:"민재와 낚시가기 목포로 출발",
    start:"2024-01-02",
    end:"2024-01-09",
    color:"#F0E8FF",},
  ])

  useEffect(() => {
    // axios.get("")
    //   .then((res) => {
    //     if (res.data && res.data.length > 0) {
    //       setEventList(res.data)
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  }, [])

  
  // 일정 생성 상태를 true/false
  const handleCreateEvent = () => {
    setIsCreateModal(!isCreateModal)
  }

  // 특정 일을 클릭하면 그 날의 정보를 저장 + detail 상태를 true/false
  const handleDateClick = (info) => {
    setIsDayModal(!isDayModal);

    const events = info.view.calendar.getEvents().filter(event => {         // 클릭한 날짜에 있는 모든 이벤트를 가져오는 filter
      const { start, end } = event;
      return info.date >= start && info.date < end;                         // 이벤트의 시작일과 종료일 사이에 있는지 확인
    });

    const eventDetails = events.map(event => ({                             // 특정 날에 포함된 이벤트의 항목들
      id: event.id,
      title: event.title,
      start: event.startStr,
      end: new Date(new Date(event.endStr).setDate(new Date(event.endStr).getDate() - 1)).toISOString().split('T')[0],    // FullCalendar 특성상, end를 마지막날이라고 생각하여 라벨이 안채워지므로 end +1 하여 저장 후, 조회 시 -1 함.
      color: event.backgroundColor,
    }));
    
    setNow({ date: info.dateStr, dayIndex: info.dayEl.cellIndex, events: eventDetails });
  };


  // "31일"에서 "일"을 지우는 코드
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
        buttonText={{today:`${new Date().getDate()}`}}
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