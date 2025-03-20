import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-md w-11/12 sm:w-96">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Welcome To Chatter</h2>

        <div className="space-y-4">
          <Link 
            to="/login"
            className="block text-lg text-white bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md transition duration-200"
          >
            Login
          </Link>
          <Link 
            to="/register"
            className="block text-lg text-white bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md transition duration-200"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}
  
export default Welcome