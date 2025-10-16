import React from 'react'
import { useAuth } from '../../../Context/UseAuth';

type Props = {}

const HomePage = (props: Props) => {
  const { user, logout} = useAuth();
  return (
    <div>
      <h1>Welcome {user}</h1>
      <button onClick={logout}>Logout</button>

    </div>
  )
}

export default HomePage