import React, {useState, useRef, useEffect} from "react";
import "../../assets/scss/calendar/DayClick.scss"
import { HiOutlineDotsVertical } from "react-icons/hi";
import UpdateEvent from "./UpdateEvent";

function DayClick ({now, state}) {

  const detailDialogRef = useRef();
  const optionDialogRef = useRef();
  const updateDialogRef = useRef();
  const deleteDialogRef = useRef();

  const [selectedEvent, setSelectedEvent] = useState('');

  const [isOptionModal, setIsOptionModal] = useState(false)
  const [isOptionModalPos, setIsOptionModalPos] = useState(null)
  const [isUpdateModal, setIsUpdateModal] = useState(false)
  const [isDeleteModal, setIsDeleteModal] = useState(false)
  
  const [day, setDay] = useState('')
  const [nowColor, setNowColor] = useState([])
  const colorList = [
    { value: "FFCECE", label:"red"},
    { value: "FFFCBA", label:"yellow"},
    { value: "DDFBC6", label:"green"},
    { value: "E3EEFF", label:"blue"},
    { value: "F0E8FF", label:"purple"},
  ]

  // now(클릭한 해당 일자 정보)에서 라벨 색을 받아오는 코드
  useEffect(() => {
    const colors = now.events.map(e => {
      const colorItem = colorList.find((v) => `#${v.value}` === e.color);
      return colorItem ? colorItem.label : '';
    });
    setNowColor(colors);
  }, [now.events]);

  // now에서 무슨 요일인지 알아냄 + detail 모달 열기
  useEffect(() => {
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    setDay(days[now.dayIndex]);
    detailDialogRef.current.showModal();
  }, [now.dayIndex]);

  // detail 모달 닫기
  const closeDetailModal = (e) => {
    const target = e.target;
    const rect = target.getBoundingClientRect();
    if (
      rect.left > e.clientX ||
      rect.right < e.clientX ||
      rect.top > e.clientY ||
      rect.bottom < e.clientY
    ) {
      detailDialogRef.current.close();
      state(!state)
    }
  };

  // 편집, 삭제하는 옵션모달 상태를 true로 바꾸는 코드
  const handleOpenOption = (selectDate, e) => {
    setSelectedEvent(selectDate);
    setIsOptionModal(true);
    setIsOptionModalPos({ x: e.clientX, y: e.clientY });
  }

  // 옵션모달 열기
  useEffect(() => {
    if (isOptionModal) {
      optionDialogRef.current.showModal();
    }
  }, [isOptionModal]);

  // 옵션 모달 닫기
  const closeOptionModal = (e) => {
    const target = e.target;
    const rect = target.getBoundingClientRect();
    if (
      rect.left > e.clientX ||
      rect.right < e.clientX ||
      rect.top > e.clientY ||
      rect.bottom < e.clientY
    ) {
      optionDialogRef.current.close();
      setIsOptionModal(false)
    }
  }

  // 일정 편집을 하기 위해 클릭한 날의 정보를 selectEvent에 저장하고 + 수정창 상태를 true로 변경
  const handleUpdateEvent = (e) => {
    setSelectedEvent(e);
    setIsUpdateModal(true);
  }

  // 일정 삭제를 하기 위해 클릭한 날의 정보를 selectEvent에 저장하고 + 삭제창 상태를 true로 변경
  const handleDeleteEvnet = () => {
    setIsDeleteModal(true)
  }
  
  // 삭제 창 모달
  useEffect(() => {
    if (isDeleteModal) {
      deleteDialogRef.current.showModal();
    }
  }, [isDeleteModal]);

  return (
    <> 
      <dialog ref={detailDialogRef} onClick={isOptionModal? null : closeDetailModal} className="date-detail-modal">
        <header className="calendar-detail-header">
          <span>{now.date.slice(8)}</span>
          <p>{day}</p>
        </header>

        <hr />
        {now.events.map((event, index) => (
          <div key={index} className="calendar-detail-body">
            <div className="calendar-detail-title">
              <p className={nowColor[index]}>{event.title}</p>
              <HiOutlineDotsVertical onClick={(e) => handleOpenOption(event, e)} className="icon-size"/>
            </div>

            {isOptionModal && selectedEvent === event &&
              <dialog
                ref={optionDialogRef} 
                onClick={closeOptionModal} 
                className="calendar-detail-option-modal"
                style={{top:`${isOptionModalPos.y}px`, left:`${isOptionModalPos.x}px`}}
              >
                <div onClick={() => handleUpdateEvent(event)}>
                  <span>편집</span>
                  {isUpdateModal && 
                    <UpdateEvent 
                      event={selectedEvent}
                      state={state} 
                      updateDialogRef={updateDialogRef} 
                    />
                  }
                </div>
                <div onClick={handleDeleteEvnet}>
                <span>삭제</span>
                  {isDeleteModal &&
                    <dialog ref={deleteDialogRef}>이 일정을 삭제할까요?</dialog>
                  }
                </div>
              </dialog>
            }

            <div className="calendar-detail-date">
              <span>{event.start}</span>
              ~
              <span>{event.end}</span> 
            </div>
          </div>
        ))}
      </dialog>
    </>
  )
}
export default DayClick