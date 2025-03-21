import { useEffect } from "react";
import { chatStore } from "../utils/chat.state.js";
import { Users } from 'lucide-react';
import profileImage from "../assets/profile.webp";


export const Userbar = () => {
  const { users, setSelectedUser, selectedUser, getUsers } = chatStore();
  
  useEffect(() => {
    getUsers()
  }, [getUsers]);

  return(
    <div className="w-72 p-5 border-r">
      <div className="flex just items-center gap-4 ">
        <Users className="text-xl" />
        <span className="font-medium">Contacts</span>
      </div>
      <div className="mt-8">
        {users && users.length > 0 && users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`flex items-center gap-3 p-3 w-full ${selectedUser?._id === user._id ? "bg-gray-200" : ""}`}
          >
            <img
              src={profileImage}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <div>{user.fullName}</div>
          </button>
        ))}
      </div>
    </div>
  )
      
}


export default Userbar;