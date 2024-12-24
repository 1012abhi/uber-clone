import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext }  from '../context/CaptainContext.jsx'
import axios from 'axios'

function CaptainSignup() {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  
  const {captain, setCaptain } = useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      fullname: {
        firstname, lastname
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType

      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/captains/register`, captainData)
    
    if (response.status === 201) {
      const data = response.data;
      console.log(data);
      
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }
    
    // setFirstname('')
    // setLastname('')
    // setEmail('')
    // setPassword('')
    // setVehicleColor('') 
    // setVehiclePlate('')
    // setVehicleCapacity('')
    // setVehicleType('')
  }

  return (
    <div>
      <div className='flex flex-col justify-between h-screen px-7 '>
      <div>
        <img 
        className='w-18 h-20'
        src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
        
    
        <form onSubmit={(e) => {submitHandler(e)}}>
          <h3 className='text-lg font-medium mb-2'>What's your name</h3>
          <div className='flex gap-4 mb-4'>
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
          className='bg-[#eeee] rounded px-4 py-2 w-full mb-4 text-base font-semibold'
          type="email" placeholder="email@example.com" required 
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
          />
          
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input 
          className='bg-[#eeee] rounded px-4 py-2 w-full mb-4 text-base font-semibold'
          type="password" placeholder="Password" required 
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
          />
          
          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
            
          <div className='flex gap-4 '>
              <input 
              className='bg-[#eeee] rounded px-4 py-2 w-full mb-5 text-base font-semibold'
              type="text" placeholder="Vehicle Color" required 
              value={vehicleColor}
              onChange={(e) => {setVehicleColor(e.target.value)}}
              />

              <input 
              className='bg-[#eeee] rounded px-4 py-2 w-full mb-5 text-base font-semibold'
              type="text" placeholder="Vehicle Plate" required 
              value={vehiclePlate}
              onChange={(e) => {setVehiclePlate(e.target.value)}}
              />

          </div>
            
          <div className='flex gap-4 mb-1'>
            <input 
              className='bg-[#eeee] rounded px-4 py-2 w-full mb-5 text-base font-semibold'
              type="number" placeholder="Vehicle Capacity" required 
              value={vehicleCapacity}
              onChange={(e) => {setVehicleCapacity(e.target.value)}}
            />

            <select 
              className='bg-[#eeee] rounded px-4 py-2 w-full mb-5 text-base font-semibold'
              value={vehicleType}
              onChange={(e) => {setVehicleType(e.target.value)}}
              required
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>
        
          <button 
            className='bg-[#111] text-white rounded px-4 py-2 w-full text-lg mb-1 font-semibold'
            type="submit"
          >Register
          </button>
                    
          <p className='text-center'>Already have a account? <Link to='/captainlogin' className='text-blue-600'>Login hear</Link>
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

export default CaptainSignup
