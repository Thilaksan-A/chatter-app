import { create } from 'zustand'
import { axiosInstance } from './axios.utils'
import toast from "react-hot-toast";


export const userStore = create((set) => ({
    user: null,
    isRegistering: false,
    isLoggingIn: false,
    
    login: async (input) => {
        try {
            const res = await axiosInstance.post('/auth/signin', input);
            set({user: res.data.user });
            toast.success("Log in Successfull")
        } catch (e) {
            if (e.response?.data.err === "INVALID_CRED") {
                return toast.error("Invalid email or password")
            } else {
                console.error("unable to login fe: " + e.response.data);
                toast.error("Unable to login: Server Error");
            }
        }
    },

    register: async (input) => {
        set({isRegistering: true})
        try {
            const res = await axiosInstance.post("/user/signup", input)
            if (res) {
                set({user: res.data.user})
            }
            toast.success("Account created successfully")

        } catch(e)  {
            if (e.response?.data.err === "DUP_EMAIL") {
                toast.error("Email already exists");
            } else if (e.response?.data.err === "INPUT_ERR") {
                toast.error("Unable to register: Invalid Inputs");
            } else {
                toast.error("Unable to register: Server error");
            }
            console.error("error registering:" + e.response?.data);
        } finally {
            set({isRegistering: false});
        }
    },

    logout: async() => {
        try {
            await axiosInstance.post("/user/logout");
            set({authUser: null});
            toast.success("Log out Successfull");
        } catch (e) {
            console.log("unable to logout fe: " + e);
            toast.error("Something went wrong");
        }
    },

    checkAuth: async() => {

    }
}))