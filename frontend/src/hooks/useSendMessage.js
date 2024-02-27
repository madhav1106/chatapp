import { useState } from 'react';
import toast from 'react-hot-toast';
import { useConversationContext } from '../context/ConversationContext'
import { useMessageContext } from '../context/MessageContext'


const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages } = useMessageContext();
    const { currentConversation } = useConversationContext();

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/messages/send/${currentConversation._id}`, {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({message})
            });

            const data = await res.json();
            if(data.error) {
                throw new Error(data.error);
            }

            setMessages([...messages, data]);
        } catch(error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {loading, sendMessage}
}

export default useSendMessage