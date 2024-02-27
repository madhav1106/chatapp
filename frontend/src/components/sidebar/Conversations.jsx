import React from 'react'
import Conversation from './Conversation'
import useConversation from '../../hooks/useConversation'

const Conversations = () => {
  const {loading, conversations} =  useConversation();
  return (
    <div className='py-2 flex flex-col overflow-auto'>
        {loading && <span className='loading loading-spinner'></span>}
        {conversations.map((conversation, idx) => (
          <Conversation key={conversation._id} conversation={conversation} lastIdx={idx === conversations.length - 1} />
        ))}
    </div>
  )
}

export default Conversations