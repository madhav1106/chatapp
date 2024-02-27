import React from 'react'
import { useConversationContext } from '../../context/ConversationContext';
import { useSocketContext } from '../../context/SockerContext';

const Conversation = ({conversation, lastIdx}) => {
    const { currentConversation, setCurrentConversation } = useConversationContext();
    const isSelected = currentConversation?._id === conversation._id;

    const { onlineUser }  = useSocketContext();
    const isOnline = onlineUser.includes(conversation._id);
    return (
        <>
            <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected ? 'bg-sky-500' : ''}`}
                onClick={() => setCurrentConversation(conversation)}>
                <div className={`avatar ${isOnline ? 'online' : 'offline'}`}>
                    <div className='w-12 rounded-full'>
                        <img src={conversation.profilePic} alt='user avatar' />
                    </div>
                </div>
                <div className='flex flex-1 flex-col'>
                    <p className='font-bold text-gray-200'>{conversation.fullname}</p>
                </div>
            </div>
            {!lastIdx && <div className='divider my-0 py-0 h-1'></div>}
        </>
    )
}

export default Conversation