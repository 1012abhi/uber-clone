import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDatacontext } from '../context/UserContext'

function UserSignUp() {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { user, setUser } = useContext(UserDatacontext)
    const navigate = useNavigate()

    const submitHandler = async (e) => {
      e.preventDefault()
      const newUser = {
        fullname: {
          firstname, lastname
        },
        email,
        password
      }
      // http://localhost:5173/usersignup
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/register`,newUser)
      
      if (response.status === 201) {
        const data = response.data;
        console.log(data)
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/userhome')
      }
      
      setFirstname('')
      setLastname('')
      setEmail('')
      setPassword('')
    }
  return (
    <div>
      <div className='flex flex-col justify-between h-screen px-7 '>
      <div>
        <img 
        className='w-18 h-20 mb-5'
        src="https://brandeps.com/logo-download/U/Uber-logo-02.png" alt="" />
        
    
        <form onSubmit={(e) => {submitHandler(e)}}>
          <h3 className='text-lg font-medium mb-2'>What's your name</h3>
          <div className='flex gap-4 mb-5'>
            <input 
            className='bg-[#eeee] w-1/2 rounded px-4 py-2 text-base font-semibold'
            type="text" placeholder="First name" required 
            value={firstname}
            onChange={(e) => {setFirstname(e.target.value)}}
            />

            <input 
            className='bg-[#eeee] w-1/2 rounded px-4 py-2 text-base font-semibold'
            type="text" placeholder="Last name" required 
            value={lastname}
            onChange={(e) => {setLastname(e.target.value)}}
            />
          </div>
          
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input 
          className='bg-[#eeee] rounded px-4 py-2 w-full mb-5 text-base font-semibold'
          type="email" placeholder="email@example.com" required 
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
          />
          
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input 
          className='bg-[#eeee] rounded px-4 py-2 w-full mb-7 text-base font-semibold'
          type="password" placeholder="Password" required 
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
          />
          
        
        < button 
          className='bg-[#111] text-white rounded px-4 py-2 w-full text-lg mb-1 font-semibold'
          type="submit"
          >Register
          </button>
                    
          <p className='text-center'>Already have a account? <Link to='/userlogin' className='text-blue-600'>Login hear</Link>
          </p>
        
        </form>

      </div>

      <div className='mb-5'>
      <p className='text-slate-700 text-[11px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Policy</span> and <span className='underline'>Terms of Service apply</span>.
      Privacy</p>
      </div>
    </div>
    </div>
  )
}

export default UserSignUp
