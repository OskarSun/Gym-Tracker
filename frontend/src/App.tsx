import { Outlet } from 'react-router-dom'
import './App.css'
import LoginPage from './Components/Pages/LoginPage/LoginPage'
import { UserProvider } from './Context/UseAuth'


function App() {
  
  return (
    <>
    <UserProvider>
      <Outlet />
    </UserProvider>
  
    </>
  )
}

export default App
