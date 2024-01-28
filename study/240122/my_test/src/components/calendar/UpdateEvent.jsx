import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import "../../assets/scss/calendar/CreateEvent.scss" 

function UpdateEvent({event, state, updateDialogRef}) {
  
  const colorPaletteRef = useRef();
  const [title, setTitle] = useState(event.title);
  const [startDate, setStartDate] = useState(event.start);
  const [endDate, setEndDate] = useState(event.end);
  const [nowColor, setNowColor] = useState('');
  const [isColorPalette, setColorPalette] = useState(false)
  const colorList = [
    { value: "FFCECE", label:"red"},
    { value: "FFFCBA", label:"yellow"},
    { value: "DDFBC6", label:"green"},
    { value: "E3EEFF", label:"blue"},
    { value: "F0E8FF", label:"purple"},
  ]

  // nowColor를 이벤트 라벨 컬러로 변환 + update모달 실행 코드
  useEffect(() => {
    updateDialogRef.current.showModal()
    const colorItem = colorList.find((v) => `#${v.value}` === event.color);
    setNowColor(colorItem.label)
  }, [])

  // update 모달 닫는 코드
  const closeUpdateModal = (e) => {
    const target = e.target;
    const rect = target.getBoundingClientRect();
    if (
      rect.left > e.clientX ||
      rect.right < e.clientX ||
      rect.top > e.clientY ||
      rect.bottom < e.clientY
    ) {
    updateDialogRef.current.close();
    state(!state)
    }
  };

  // 컬러팔레트 모달을 실행하는 코드
  useEffect (() => {
    {isColorPalette && colorPaletteRef.current.showModal()}
  })

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

  // 컬러 팔레트 모달 조건을 true로 변경하는 코드
  const openPalette = () => {
    setColorPalette(true)
  }

  // 컬러팔레트에서 얻은 컬러로 nowColor를 변경하고, 컬러팔레트 모달닫기 실행하는 코드
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
    updateDialogRef.current.close();
    state(!state);
  }

  // update axios 코드
  const updateEvent = async (e) => {
    e.preventDefault()

    const updateInfo = {
      title: title,
      start: startDate,
      end: new Date(new Date(endDate).setDate(new Date(endDate).getDate() + 1)).toISOString().split('T')[0],
      color: `#${colorList.find((v) => v.label === nowColor).value}`,
    }
    try {
      await axios.put(`${event.id}`, updateInfo);
      updateDialogRef.current.close();
      state(!state)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <dialog ref={updateDialogRef} onClick={isColorPalette ? null : closePaletteModal} className="create-event-modal">
        <header className="header-modal">
          이벤트 편집
        </header>
        <form onSubmit={updateEvent} className="form-section">
          <div className="title-input">
            <input type="text" value={title} onChange={titleChange} placeholder="제목" required/>
            <div className={nowColor} onClick={openPalette}></div>
            <div>
              {isColorPalette &&
                <dialog ref={colorPaletteRef} onClick={closePaletteModal} className="color-palette-modal">
                {colorList.map((color) => (
                  <div 
                    key={color.label}
                    className={`color-box ${color.label}`}
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
            <input type="submit" value="수정" className="submit-btn" />
          </div>
        </form>
      </dialog>
    </>
  )
}

export default UpdateEvent;
