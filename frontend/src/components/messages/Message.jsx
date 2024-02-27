import React from 'react'
import { useAuthContext } from "../../context/AuthContext";
import { useConversationContext } from '../../context/ConversationContext';
import getTime from '../../utils/getTime';

const Message = ({message}) => {
  const { authUser } = useAuthContext();
  const { currentConversation } = useConversationContext();
  const isMe = message.senderId === authUser._id;
  const chatClass = isMe ? 'chat-end' : 'chat-start';
  const profilePic = isMe ? authUser.profilePic : currentConversation?.profilePic;
  const bubbleColor = isMe ? 'bg-blue-500' : '';
  const time = getTime(message.createdAt);

  return (
    <div className={`chat ${chatClass}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src={profilePic} alt='user'/>
            </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleColor} pb-2`}>{message.message}</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center text-white'>{time}</div>
    </div>
  )
}

export default Message