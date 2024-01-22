import React, {useState, useRef, useEffect} from "react";

function DayClick ({now, state}) {
  const dialogRef = useRef();
  const [day, setDay] = useState('')

  useEffect(() => {
    if (now.dayIndex === 0) {
      setDay('일요일')
    } else if (now.dayIndex === 1 ) {
      setDay('월요일')
    } else if (now.dayIndex === 2 ) {
      setDay('화요일')
    } else if (now.dayIndex === 3 ) {
      setDay('수요일')
    } else if (now.dayIndex === 4 ) {
      setDay('목요일')
    } else if (now.dayIndex === 5 ) {
      setDay('금요일')
    } else if (now.dayIndex === 6 ) {
      setDay('토요일')
    }
    dialogRef.current.showModal();
    console.log(now)
  })

  const closeModal = (e) => { 
    const target = e.target;
    const rect = target.getBoundingClientRect();
    if (
      rect.left > e.clientX ||
      rect.right < e.clientX ||
      rect.top > e.clientY ||
      rect.bottom < e.clientY
    ) {
      dialogRef.current.close();
      state(!state)
    }
  };

  return (
    <> 
      <dialog ref={dialogRef} onClick={closeModal}>
        <div>
          <header>
            <div>
              {now.date.slice(8)}
            </div>
            <div>
              {day}
            </div>
          </header>
          <hr />
          {now.events.map((event, index) => (
            <div key={index}>
              <h3>{event.title}</h3>
              <p>시작일: {event.start}</p>
              <p>종료일: {event.end}</p>
              <p>내용: {event.comment}</p>
              <p>색: {event.color}</p>
            </div>
          ))}
        </div>
      </dialog>
    </>
  )
}
export default DayClick