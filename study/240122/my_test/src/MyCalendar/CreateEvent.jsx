import React, {useEffect, useState, useRef} from "react";
import "./MyCalendar.scss"
import axios from "axios";

function CreateEvent ({state, event}) {

  const dialogRef = useRef();
  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [nowColor, setNowColor] = useState('red')
  
  const colorList = [
    { value: "FFCECE", label:"red"},
    { value: "FFFCBA", label:"yellow"},
    { value: "DDFBC6", label:"green"},
    { value: "E3EEFF", label:"blue"},
    { value: "F0E8FF", label:"pupple"},
  ]
  
  useEffect (() => {
    dialogRef.current.showModal();
  }, [])

  const closeModal = () => { 
    dialogRef.current.close();
    state(!state)
  };

  const titleChange = (e) => {
    setTitle(e.target.value)
  }

  const colorChange = (e) => {
    setNowColor(e.target.value)
  }

  const startDateChange = (e) => {
    setStartDate(e.target.value)
  }

  const endDateChange = (e) => {
    setEndDate(e.target.value)
  }

  const cencleInfo = (e) => {
    e.preventDefault()
    dialogRef.current.close();
    state(!state)
  }

  const createInfo = async (e) => {
    e.preventDefault()

    const newEvent = {
      title: title,
      start: startDate,
      end: new Date(new Date(endDate).setDate(new Date(endDate).getDate() + 1)).toISOString().split('T')[0],
      color: `#${colorList.find((v) => v.label === nowColor).value}`,
    }

    console.log(newEvent)

    try {
      const res = await axios.post("", newEvent)
      event(prevEvent => [...prevEvent, newEvent])
      dialogRef.current.close();
      state(!state)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <dialog ref={dialogRef}>
        <div>
          <header>
            <h2>새로운 일정</h2>
            <button onClick={closeModal}>닫기</button>
          </header>

          <form onSubmit={createInfo}>
            <input type="text" value={title} onChange={titleChange} placeholder="제목" required/>
            <div className={nowColor}></div>

            <select name="colorSelect" id="colorSelect" value={nowColor} onChange={colorChange} required>
              {colorList.map((color) => (
                <option key={color.label} className={color.label} value={color.label}>
                </option>
              ))}
            </select>
            시작일<input type="date" value={startDate} onChange={startDateChange} required/>
            종료일<input type="date" value={endDate} onChange={endDateChange} required/>
            <button onClick={cencleInfo}>취소</button>
            <input type="submit" value="추가" />
          </form>
        </div>
      </dialog>
    </>
  )
}

export default CreateEvent