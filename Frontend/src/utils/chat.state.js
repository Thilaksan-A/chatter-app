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
            const res = axiosInstance.get("/Messages", data);
            set({messages: res.data})
        } catch (e) {
            toast.error("unable to fetch messages");
            console.log(e.response?.data.msg);
        } finally {
            set({gettingMessages: false})
        }

    },

    clearMessages: () => {

    },

    sendMessage: async (data) => {
        const {messages} = get()
        try {
            set({gettingMessages: true})
            const res = await axiosInstance("/sendMessage", data)
            set({messages : [...messages, res.data]})
        } catch (e) {
            toast.error("Unable to send message right now")
            console.error(e.response?.data.msg);
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
    
    setSelectedUser: (selectedUser) => set({selectedUser})

}))