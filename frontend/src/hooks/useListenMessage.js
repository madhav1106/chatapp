import { useEffect } from 'react'

import { useSocketContext } from '../context/SockerContext';
import { useMessageContext } from '../context/MessageContext'

const useListenMessage = () => {
  const {socket} = useSocketContext();
  const { messages, setMessages } = useMessageContext();

  useEffect(() => {
    socket?.on("new-message", (newMessage) =>  setMessages([...messages, newMessage]));

    return () => socket?.off("new-message");
  }, [socket, setMessages, messages])
}

export default useListenMessage