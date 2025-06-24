import React from 'react'
import { useChatStore } from '../store/useChatStore';

function ListOfMessages() {
    const { messages } = useChatStore();
  return (
    <div>
      <h1>list of messages are </h1>
      <ul>
        {messages.map((msg,index)=>(
            <li
            key={msg.id||index}
            >
                <strong>{msg.role}:</strong> {msg.content}
            </li>
        ))}
      </ul>
    </div>
  )
}

export default ListOfMessages
