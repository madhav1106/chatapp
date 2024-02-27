import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import useListenMessage from '../../hooks/useListenMessage';

const Messages = () => {
  const {loading, messages} = useGetMessages();
  useListenMessage();
  
  const lastMessage = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessage.current?.scrollIntoView({ behaviour: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
        {!loading && messages.length && (
          messages.map((message) => (
            <div key={message._id} ref={lastMessage}>
              <Message message={message} />
            </div>
          ))
        )}
        {loading &&  <p className='text-center text-white'>Please wait...</p>}
        {!loading && !messages.length && <p className='text-center text-white'>Send message to start conversation.</p>}
    </div>
  )
}

export default Messages