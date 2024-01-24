import React, {useEffect, useState, useRef} from "react";
import "./CreateEvent.scss"
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { FaRegClock, FaLongArrowAltRight  } from "react-icons/fa";

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
  
  useEffect (() => {
    createDialogRef.current.showModal();
  }, [])

  useEffect (() => {
    {isColorPalette && colorPaletteRef.current.showModal()}
  })

  const closeCreateModal = () => { 
    createDialogRef.current.close();
    state(!state)
  };

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

  const titleChange = (e) => {
    setTitle(e.target.value)
  }

  const openPalette = () => {
    setColorPalette(true)
  }

  const changeColor = (e) => {
    setNowColor(e)
    setColorPalette(false)
  }

  const startDateChange = (e) => {
    setStartDate(e.target.value)
  }

  const endDateChange = (e) => {
    setEndDate(e.target.value)
  }

  const cencleInfo = (e) => {
    e.preventDefault()
    createDialogRef.current.close();
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
    try {
      const res = await axios.post("", newEvent)
      event(prevEvent => [...prevEvent, newEvent])
      createDialogRef.current.close();
      state(!state)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <dialog ref={createDialogRef} className="create-event-modal">
        <div>
          <header className="header-modal">
            <div className="title-modal">
              새로운 일정
            </div>
            <IoClose onClick={closeCreateModal} className="close-modal"/>
          </header>

          <form onSubmit={createInfo}>
            <div className="title-input">
              <input type="text" value={title} onChange={titleChange} placeholder="제목" required/>
              <div className="color-select">
                <div className={nowColor} onClick={openPalette}></div>
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
              <div className="date-input">
                <input type="date" value={startDate} onChange={startDateChange} placeholder="시작 일자" required/>
                <FaLongArrowAltRight className="icon-size"/>
                <input type="date" value={endDate} onChange={endDateChange} placeholder="종료 일자" required/>
              </div>
            </div>

            <div className="button-section">
              <button onClick={cencleInfo} className="cencle-btn">취소</button>
              <input type="submit" value="저장" className="submit-btn" />
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default CreateEvent