import React, { useCallback, useState } from "react";
import moment from 'moment';
import { Calendar, momentLocalizer } from "react-big-calendar";
import "./Calendar.scss";
import Toolbar from "./Toobar";
import Day from "./Day";
import { IoAddCircle } from "react-icons/io5";

const MyCalendar = () => {
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);      // 현지 시간 양식
  const [event, setEvent] = useState('');
  const [eventList, setEventList] = useState([]);
  const [id, setId] = useState(1);

  const createEvent = (e) => {
    setEvent(e.target.value);
  };

  const createEventClick = (e) => {
    const newEvent = {
      id,
      title: event,
      start: moment().format("YYYY-MM-DD"),
      end: moment().format("YYYY-MM-DD"),
    };

    setEventList([...eventList, newEvent]);
    e.preventDefault();
    setId(id + 1);
    setEvent('');
  };

  return (
    <>
      <Calendar
        localizer={localizer}
        components={{
          toolbar: Toolbar,
          month: {
            dateHeader: Day,
          },
        }}
      />
      <div>
        <form>
          <input type="text" 
            onChange={createEvent} 
            value={event} 
            className="create-event-input" 
            placeholder={`${moment().format("MM월 DD일")}에 일정 추가`}
          />
          <button type="submit" 
          onClick={createEventClick} 
          className="create-event-btn">
            <IoAddCircle />
          </button>
        </form>
      </div>

      <div>
        {eventList.map(eventItem => (
          <div key={eventItem.id}>
            {eventItem.id}
            {eventItem.title},
            {eventItem.start},
            {eventItem.end},
          </div>
        ))}
      </div>

    </>
  );
};

export default MyCalendar;
