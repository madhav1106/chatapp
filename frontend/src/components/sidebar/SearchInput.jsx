import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoSearchSharp } from 'react-icons/io5';
import useConversation from '../../hooks/useConversation';
import { useConversationContext } from '../../context/ConversationContext';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const { setCurrentConversation } = useConversationContext();
  const { conversations } =  useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return;

    const conversation = conversations.find((c) => c.fullname.toLowerCase().includes(search.toLowerCase()));
    if(conversation) {
      setCurrentConversation(conversation);
      setSearch('');
    } else {
      toast.error('No such user found');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
        <div className='flex items-center gap-2'>
            <input type="text" className='input input-bordered rounded-full' placeholder='Search...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className='btn btn-circle bg-sky-500 text-white' type='submit'>
                <IoSearchSharp className='h-6 w-6 outline-none' />
            </button>
        </div>
    </form>
  )
}

export default SearchInput