import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login'
import Register from './pages/register'
import Welcome from './pages/Welcome'
import { Toaster } from 'react-hot-toast'
import { userStore } from './utils/user.state'
import Dashboard from './pages/Dashboard'
import { useEffect } from 'react'
import Spinner from './components/Spinner'

function App() {
  const {user, checkUser, checkingUser} = userStore();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  if  (checkingUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Spinner />
      </div> 
    )
  } 

  return (
    <> 
      <Toaster/>
      <Routes>
        <Route path= "/" element={user ? <Navigate  to={"/dashboard"} />  : <Welcome /> }  />
        <Route path= "/dashboard" element={!user ? <Navigate  to={"/login"} /> : <Dashboard /> }  />
        <Route path= "/login" element={user ? <Navigate  to={"/dashboard"} /> : <Login /> } />
        <Route path= "/register" element={user ? <Navigate  to={"/dashboard"} /> : <Register />} />
      </Routes>
    </>
  )
}

export default App
