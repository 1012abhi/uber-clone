import React from 'react'
import { Route, Routes } from 'react-router-dom'   
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserHome from './pages/UserHome'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/userlogin' element={<UserLogin />} />
        <Route path='/usersignup' element={<UserSignup />} />
        <Route path='/captainlogin' element={<CaptainLogin />} />
        <Route path='/captainsignup' element={<CaptainSignup />} />
        <Route path='/userhome' element={
          <UserProtectedWrapper>
            <UserHome />
          </UserProtectedWrapper>
        }/>
        <Route path='/userlogout' element={
          <UserProtectedWrapper>
              <UserLogout />
          </UserProtectedWrapper>
        }/>
        <Route path='/captain-home' element={<CaptainHome />}/>
            
      </Routes>
    </div>
  )
}

export default App