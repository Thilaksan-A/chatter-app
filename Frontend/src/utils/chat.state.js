import { create } from 'zustand'
import { axiosInstance } from './axios.utils'
import toast from "react-hot-toast";
import { userStore } from './user.state';


export const chatStore = create((set, get) => ({
    users: [],
    selectedUser: null,
    messages: [],
    gettingMessages: false,
    
    getMessages: async (data) => {
        try {
            set({gettingMessages: true})
            const res = await axiosInstance.get("/message/messages", {
                params: {
                    receiver: data.receiver
                }
            });
            console.log(res);
            set({messages: res.data})
        } catch (e) {
            toast.error("unable to fetch messages");
            console.log(e.response?.data.msg);
        } finally {
            set({gettingMessages: false})
        }

    },

    socketMessages: () => {
        const { selectedUser} = get()
        if (!selectedUser) return;
        const socket = userStore.getState().socket;
        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.sender === selectedUser._id
            if (!isMessageSentFromSelectedUser) return;
            set({
                messages: [...get().messages, newMessage],
            });
        });
    },

    sendMessage: async (data) => {
        const {messages} = get()
        try {
            set({gettingMessages: true})
            const res = await axiosInstance.post("/message/send", data)
            set({messages : [...messages, res.data.msg]})
        } catch (e) {
            toast.error("Unable to send message right now")
            console.error(e);
        }
    },

    getUsers: async () => {
        try {
            const res = await axiosInstance.get("/message/users")
            // get().users = res.data;
            set({users: res.data})
        } catch(e) {
            toast.error(e.response?.data.msg)
        }
    }, 
    
    clearSocketMessages: () => {
        const socket = userStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => set({selectedUser})

}))