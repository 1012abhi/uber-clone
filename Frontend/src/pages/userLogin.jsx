import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDatacontext } from '../context/UserContext'

function UserLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { user, setUser } = useContext(UserDatacontext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    const userData = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/login`, userData)
    
    if (response.status === 200) {
      const data = response.data;
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate("/userhome")
    }
    
    setEmail('')
    setPassword('')
  }

  return (
    <div className='flex flex-col justify-between h-screen px-7 '>
      <div>
        <img 
        className='w-18 h-20 mb-5'
        src="https://brandeps.com/logo-download/U/Uber-logo-02.png" alt="" />
        
    
        <form onSubmit={(e) => {submitHandler(e)}}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input 
          className='bg-[#eeee] rounded px-4 py-2 w-full mb-6 text-base font-semibold'
          type="email" placeholder="email@example.com" required 
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
          />
          
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input 
          className='bg-[#eeee] rounded px-4 py-2 w-full mb-6 text-base font-semibold'
          type="password" placeholder="password" required 
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
          />
          
        
        < button 
          className='bg-[#111] text-white rounded px-4 py-2 w-full text-lg mb-1 font-semiboldmt-10'
          type="submit"
          >Login
          </button>
                    
          <p className='text-center'>New hear? <Link to='/usersignup' className='text-blue-600'>Create new Account</Link>
          </p>
        
        </form>

      </div>

      <div>
        <Link 
        to='/captainlogin'
        className='flex items-center justify-center bg-[#111] hover:bg-[#32ff7e] text-white rounded px-4 py-2 w-full text-lg font-semibold mb-7'
        >Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin
