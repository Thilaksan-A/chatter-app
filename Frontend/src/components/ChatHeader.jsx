import profileImage from "../assets/profile.webp";
import { chatStore } from "../utils/chat.state";
import { X } from "lucide-react";


const ChatHeader = ({user}) => {
  const {setSelectedUser} = chatStore();
  return (
    <div className="flex justify-between items-center bg-gray-900 p-4 text-white">
      <div className="flex items-center">
        <img src={profileImage} alt={user.fullName} className="w-10 h-10 rounded-full"/> 
        <div>
          <h3 className="text-xl">{user.fullName}</h3>
        </div>
      </div>
      <button className="text-gray-400 cursor-pointer"  onClick={() => {
        setSelectedUser(null);
      }}>
         <X />
      </button>
    </div>
  );
}


export default ChatHeader;