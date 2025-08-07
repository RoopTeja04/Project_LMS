import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import CreateAccount from './Components/CreateAccount';
import User from './Pages/User';
import Mentor from './Pages/Mentor';
import Instructor from './Pages/Instructor';
import Admin from './Pages/Admin';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/create-Account' element={<CreateAccount />} />
        <Route path='/user' element={<User />} />
        <Route path='/mentor' element={<Mentor />} />
        <Route path='/instructor' element={<Instructor />} />
        <Route path='/admin' element={<Admin />} /> 
      </Routes>
    </>
  )
}

export default App