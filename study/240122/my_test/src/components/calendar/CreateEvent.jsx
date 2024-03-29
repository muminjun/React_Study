import React, {useEffect, useState, useRef} from "react";
import "../../assets/scss/calendar/CreateEvent.scss" 
import axios from "axios";

function CreateEvent ({state, event}) {

  const createDialogRef = useRef();
  const colorPaletteRef = useRef();
  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [nowColor, setNowColor] = useState('red')
  const [isColorPalette, setColorPalette] = useState(false)
  const colorList = [
    { value: "FFCECE", label:"red"},
    { value: "FFFCBA", label:"yellow"},
    { value: "DDFBC6", label:"green"},
    { value: "E3EEFF", label:"blue"},
    { value: "F0E8FF", label:"purple"},
  ]
  
  // 일정생성 모달을 실행하는 코드
  useEffect (() => {
    createDialogRef.current.showModal();
  }, [])

  // 컬러팔레트 모달을 실행하는 코드
  useEffect (() => {
    {isColorPalette && colorPaletteRef.current.showModal()}
  })

  // 일정생성 모달을 닫는 코드
  const closeCreateModal = (e) => {
    const target = e.target;
    const rect = target.getBoundingClientRect();
    if (
      rect.left > e.clientX ||
      rect.right < e.clientX ||
      rect.top > e.clientY ||
      rect.bottom < e.clientY
    ) {
    createDialogRef.current.close();
    state(!state)
    }
  };

  // 컬러 팔레트 모달을 닫는 코드
  const closePaletteModal = (e) => { 
    const target = e.target;
    const rect = target.getBoundingClientRect();
    if (
      rect.left > e.clientX ||
      rect.right < e.clientX ||
      rect.top > e.clientY ||
      rect.bottom < e.clientY
    ) {
      colorPaletteRef.current.close();
      setColorPalette(false)
    }
  };

  // 제목 변경 코드
  const titleChange = (e) => {
    setTitle(e.target.value)
  }

  // 컬러 팔레트 조건을 true로 변경하는 코드
  const openPalette = () => {
    setColorPalette(true)
  }

  // 컬러팔레트에서 얻은 컬러로 nowColor를 변경하고, 컬러팔레트 모달닫기를 실행하는 코드
  const changeColor = (e) => {
    setNowColor(e)
    setColorPalette(false)
  }

  // 시작날짜 코드
  const startDateChange = (e) => {
    setStartDate(e.target.value)
  }

  // 종료날짜 코드
  const endDateChange = (e) => {
    setEndDate(e.target.value)
  }

  // 취소버튼 코드
  const cencleInfo = (e) => {
    e.preventDefault()
    createDialogRef.current.close();
    state(!state)
  }

  // 추가버튼 코드 + axios 요청 + 생성모달 닫기
  const createInfo = async (e) => {
    e.preventDefault()

    const newEvent = {
      title: title,
      start: startDate,
      end: new Date(new Date(endDate).setDate(new Date(endDate).getDate() + 1)).toISOString().split('T')[0],
      color: `#${colorList.find((v) => v.label === nowColor).value}`,
    }
    try {
      const res = await axios.post("//", newEvent)
      event(prevEvent => [...prevEvent, newEvent])
      createDialogRef.current.close();
      state(!state)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <dialog ref={createDialogRef} onClick={isColorPalette ? null : closeCreateModal} className="create-event-modal">
        <header className="header-modal">
          새로운 일정
        </header>
        <form onSubmit={createInfo} className="form-section">
          <div className="title-input">
            <input type="text" value={title} onChange={titleChange} placeholder="제목(최대 15자)" maxLength="14" required/>
            <div className={`${nowColor}-btn`} onClick={openPalette}></div>
            <div>
              {isColorPalette &&
                <dialog ref={colorPaletteRef} onClick={closePaletteModal} className="color-palette-modal">
                {colorList.map((color) => (
                  <div 
                    key={color.label}
                    className={`${color.label}-btn`}
                    onClick={() => changeColor(color.label)}
                  ></div>
                ))}
              </dialog>}
            </div>
          </div>

          <div className="date-section">
            <div className="date-section-div">
              <p>시작일</p>
              <input 
                type="date" 
                value={startDate} 
                onChange={startDateChange} 
                data-placeholder="날짜 선택" 
                required
              />
            </div>
            
            <div className="date-section-div">
              <p>종료일</p>
              <input 
                type="date" 
                value={endDate} 
                onChange={endDateChange} 
                data-placeholder="날짜 선택"
                min={startDate}
                required
              />
            </div>
          </div>

          <div className="button-section">
            <button onClick={cencleInfo} className="cencle-btn">취소</button>
            <input type="submit" value="저장" className="submit-btn" />
          </div>
        </form>
      </dialog>
    </>
  )
}

export default CreateEvent