import ChatWindow from "../components/ChatWindow";
import Header from "../components/Header"
import Userbar from "../components/Userbar";

const Dashboard = () => {
  return (
    <>  
      <Header />
      <div className="pt-44 flex h-screen">
        <Userbar />
        <ChatWindow />
        
      </div>
     
    </>
      
  )
}

export default Dashboard;