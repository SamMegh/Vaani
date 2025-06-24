import React from 'react'
import { useChatStore } from '../store/useChatStore';

function ListOfMessages() {
    const { messages } = useChatStore();
  return (
    <div>
      <h1>list of messages are </h1>
        {messages.map((msg,index)=>(
            <p
            key={msg.id||index}
            >
                <strong>{msg.role}:</strong><p> {msg.content}</p>
                {console.log(msg.content)}
            </p>
        ))}
    </div>
  )
}

export default ListOfMessages
