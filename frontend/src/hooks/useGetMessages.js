import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useConversationContext } from '../context/ConversationContext'
import { useMessageContext } from '../context/MessageContext'

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages } = useMessageContext();
    const { currentConversation } = useConversationContext();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/messages/${currentConversation._id}`);
                const data = await res.json();
        
                if(data.error) {
                    throw new Error(data.error)
                }

                setMessages(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }

        if(currentConversation?._id) getMessages()
    }, [currentConversation?._id]);

    return {loading, messages}
}

export default useGetMessages