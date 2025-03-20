import { useState } from "react";
import { Link } from "react-router-dom";
import { userStore } from "../utils/user.state";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isLoggingIn, login } = userStore();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = {
      email,password
    }
    login(formData)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-md w-11/12 sm:w-96">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Login</h2>
        {isLoggingIn && <div className="flex justify-center items-center"> 
            <Spinner />
          </div>
        }
        {!isLoggingIn && <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
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
              className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-700">
              Don&apos;t have an account?&nbsp;
              <Link to="/register" className="text-green-500 hover:text-green-600 transition duration-200">
                Register here
              </Link>
            </p>
          </div>
        </form>}

      </div>
    </div>
  )
}

export default Login;