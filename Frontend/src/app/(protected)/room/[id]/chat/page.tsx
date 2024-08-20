'use client';
import React, { useState } from 'react';

const Chat = () => {
  // Sample messages
  const [messages, setMessages] = useState([
    { id: 1, user: 'Alice', text: 'Hello there!' },
    { id: 2, user: 'Bob', text: 'Hi Alice, how are you?' },
    { id: 3, user: 'Alice', text: 'I’m good, thanks! How about you?' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, user: 'You', text: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-200 p-4 border-b">
        Chat Header
      </div>
      <div className="flex-grow overflow-y-auto p-4 bg-gray-100">
        {messages.map(message => (
          <div key={message.id} className="mb-2">
            <div className="font-bold">{message.user}</div>
            <div className="bg-white p-2 rounded-lg shadow">{message.text}</div>
          </div>
        ))}
      </div>
      <div className="bg-white p-4 border-t flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg mr-2"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white p-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
