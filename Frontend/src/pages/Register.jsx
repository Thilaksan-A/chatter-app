import { useState } from "react"
import { Link } from "react-router-dom";
import { userStore } from "../utils/user.state";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [fullName, setFullName] = useState('');
  const {isRegistering, register } = userStore();

  const handleRegister = (e) => {
    e.preventDefault();
    if(password.trim().length < 6) {
      return toast.error("Password must be greater then 6 characters")
    }
    if (passwordRepeat !== password) {
      return toast.error("Passwords do not match")
    }
    const formData = {
      email,password, fullName
    }
    register(formData)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-md w-11/12 sm:w-96">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Register</h2>
        {isRegistering && <div className="flex justify-center items-center"> 
          <Spinner />
        </div>
       }
        {!isRegistering && <form onSubmit={handleRegister} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-950"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-950"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-700">Re-enter Password:</label>
            <input
              id="repeatPassword"
              type="password"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-950"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Fullname:</label>
            <input
              id="name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-950"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-200"
            >
              Register
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-700">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:text-blue-600 transition duration-200">
                Login here
              </Link>
            </p>
          </div>
        </form>}
      </div>
    </div>
  )
}

export default Register