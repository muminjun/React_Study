import React, {useEffect, useState, useRef, useCallback} from "react";
import "./MyCalendar.scss"

function CreateEvent ({state, event}) {

  const dialogRef = useRef();
  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [nowColor, setNowColor] = useState('FFCECE')
  
  const colorList = [
    { value: "FFCECE", label:"Red", color:'#FFCECE' },
    { value: "FFFCBA", label:"Yellow", color:'#FFFCBA' },
    { value: "DDFBC6", label:"Green", color:'#DDFBC6' },
    { value: "E3EEFF", label:"Blue", color:'#E3EEFF' },
    { value: "F0E8FF", label:"Pupple", color:'#F0E8FF' },
  ]
  
  useEffect (() => {
    dialogRef.current.showModal();
  }, [])

  const closeModal = (e) => { 
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

  const createInfo = (e) => {
    
    e.preventDefault()
    dialogRef.current.close();
    state(!state)
  }

  return (
    <>
      <dialog ref={dialogRef}>
        <div>
          <header>
            <h2>새로운 일정</h2>
            <button onClick={closeModal}>닫기</button>
          </header>

          <form>
            <input type="text" value={title} onChange={titleChange} placeholder="제목"/>
            <div className={nowColor}></div>
            <select name="colorSelect" id="colorSelect " value={nowColor} onChange={colorChange}>
              {colorList.map((color) => (
                <option key={color.label} className={color.value} value={color.value}>
                </option>
              ))}
            </select>
            <input type="date" value={startDate} onChange={startDateChange}/> 시작일
            <input type="date" value={endDate} onChange={endDateChange}/> 종료일
            <button onClick={cencleInfo}>취소</button>
            <button onClick={createInfo}>저장</button>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default CreateEvent