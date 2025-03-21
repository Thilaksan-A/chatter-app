import { MessageSquare } from 'lucide-react';

const NoUserSelected = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-800 text-white">
      <div className="text-center">
        <MessageSquare className="mx-auto text-gray-400" size={48} />
        <h2 className="mt-4 text-2xl font-semibold">Select a conversation</h2>
        <p className="text-gray-400">Choose a user from the sidebar to start chatting.</p>
      </div>
    </div>
  );
}


export default NoUserSelected;