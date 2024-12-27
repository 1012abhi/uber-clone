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
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainLogOut from './pages/CatainLogout'
import Riding from './pages/Riding'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/userlogin' element={<UserLogin />} />
        <Route path='riding' element={<Riding />}/>
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
        <Route path='/captain-home' element={
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>
        }/>
        <Route path='/captain-logout' element={
          <CaptainProtectedWrapper>
            <CaptainLogOut />
          </CaptainProtectedWrapper>
        }/>
      </Routes>
    </div>
  )
}

export default App