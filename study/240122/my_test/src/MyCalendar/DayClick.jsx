import React, {useState, useRef, useEffect} from "react";

function DayClick ({now, state}) {
  const dialogRef = useRef();
  const [day, setDay] = useState('')

  useEffect(() => {
    if (now.dayEl.cellIndex === 0) {
      setDay('일요일')
    } else if ( now.dayEl.cellIndex === 1 ) {
      setDay('월요일')
    } else if ( now.dayEl.cellIndex === 2 ) {
      setDay('화요일')
    } else if ( now.dayEl.cellIndex === 3 ) {
      setDay('수요일')
    } else if ( now.dayEl.cellIndex === 4 ) {
      setDay('목요일')
    } else if ( now.dayEl.cellIndex === 5 ) {
      setDay('금요일')
    } else if ( now.dayEl.cellIndex === 6 ) {
      setDay('토요일')
    }
    dialogRef.current.showModal();
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
              {now.dayEl.innerText}
            </div>
            <div>
              {day}
            </div>
          </header>
          <hr />
          <div>
            해보자..
          </div>
        </div>
      </dialog>
    </>
  )
}
export default DayClick