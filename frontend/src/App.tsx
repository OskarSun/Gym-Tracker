import { Outlet } from 'react-router-dom'
import './App.css'
import { UserProvider } from './Context/UseAuth'
import { Toaster } from 'react-hot-toast'


function App() {
  
  return (
    <>
    <UserProvider>
      <Outlet />
      <Toaster position="top-center" />
    </UserProvider>
  
    </>
  )
}

export default App
