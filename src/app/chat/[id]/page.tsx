import Chat from '@/components/Chat'
import ChatInput from '@/components/ChatInput'
import React from 'react'

function ChatPage({params:{id}}:{
  params: {
    id: string
  }
}) {

  return (
    <div className='flex flex-col h-screen w-full overflow-auto'>
        <Chat id={id}/>
        <ChatInput id={id}/>
        </div>
  )
}

export default ChatPage                                    