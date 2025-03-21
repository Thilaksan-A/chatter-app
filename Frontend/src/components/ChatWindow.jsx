import { useEffect, useState } from "react";
import { chatStore } from "../utils/chat.state";
import ChatHeader from "./ChatHeader";
import NoUserSelected from "./NoUser";
import { Send } from "lucide-react";
import profileImage from "../assets/profile.webp";
import { userStore } from "../utils/user.state";


const ChatWindow = () => {
  const {selectedUser, messages, getMessages, sendMessage} = chatStore();
  const {user} = userStore();
  const [message, setMessage] = useState  ('');
  
  useEffect(() => {
    if (selectedUser) {
      getMessages({receiver: selectedUser._id})
    }
  }, [getMessages, selectedUser]);

    
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage({
        msg: message,
        receiver: selectedUser._id
      });
      setMessage('');
      // getMessages();
    }
  };

  

  if (!selectedUser) return <NoUserSelected/>;
  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader user={selectedUser} />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div className="">
            <div key={message._id} className={`chat ${message.sender === user._id ? "chat-end" : "chat-start"}`}>
                <div className="flex justify-center items-center gap-6">
                  {message.sender !== user._id  && 
                    <div className="flex gap-5">
                      <img src={profileImage} alt={"placeholder profile Image"} className="w-10 h-10 rounded-full"/>
                      <p className="chat-bubble">{message.msg}</p>
                    </div> 
                  }
                  {message.sender === user._id  && 
                    <div className="flex gap-5">
                      <p className="chat-bubble">{message.msg}</p>
                      <img src={profileImage} alt={"placeholder profile Image"} className="w-10 h-10 rounded-full"/>
                    </div> 
                  }
                </div>
            </div> 
          </div>
          
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="bg-gray-800 p-4 flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 rounded-lg bg-gray-700 text-white"
          placeholder="Type a message..."
        />
        <button type="submit" className="ml-2 text-white">
          <Send size={24} />
        </button>
      </form>
    </div>
  )
}


export default ChatWindow;