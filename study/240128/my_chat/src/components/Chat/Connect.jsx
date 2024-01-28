import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';

function ChatPage () {
  const {userId} = useParams()
  const client = useRef()
  const [chatList, setChatList] = useState([])
  const [chat, setChat] = useState('')
  const [roomId, setRoomId] = useState()
  const userNickName = localStorage.getItem('nickname')
  const [isMatch, setIsMatch] = useState(false)

  const generataId = (() => {
    const id = 0
    return () => {
      id += 1
      return id
    }
  })

  const disConnect = () => {
    client.current.deactivate()
    setIsMatch(false)
  }

  const onMessageRecevied = (StompJs.message) => {
    
  }
}