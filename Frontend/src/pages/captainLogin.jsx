import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function captainLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captainData, setCaptainData] =useState({})

  const submitHandler = (e) => {
    e.preventDefault()
    setCaptainData({
      email,
      password
    })
    setEmail('')
    setPassword('')
  }

  return (
    <div className='flex flex-col justify-between h-screen px-7 '>
      <div>
        <img 
        className='w-18 h-20 mb-5'
        src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
        
    
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
          type="password" placeholder="Password" required 
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
          />
          
        
        < button 
          className='bg-[#111] text-white rounded px-4 py-2 w-full text-lg mb-1 font-semiboldmt-10'
          type="submit"
          >Login
          </button>
                    
          <p className='text-center'>Join a fleet? <Link to='/captainsignup' className='text-blue-600'>Register as a Captain</Link>
          </p>
        
        </form>

      </div>

      <div>
        <Link
        to='/userlogin'
        className='flex items-center justify-center bg-[#111] hover:bg-[#f39e59] text-white rounded px-4 py-2 w-full text-lg font-semibold mb-7'
        >Sign in as User</Link>
      </div>
    </div>
  )
}

export default captainLogin
