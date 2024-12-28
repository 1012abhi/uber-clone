import React from 'react'
import { Link } from 'react-router-dom'

const CaptainRiding = () => {
  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://brandeps.com/logo-download/U/Uber-logo-02.png" alt="" />
        <Link to={'/captain-home'} className=' h-10 w-10 bg-white flex items-center justify-center rounded-full ring-2 ring-slate-900'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>

        </Link>
      </div>
 
      <div className='h-4/5'>
        <img className='w-full h-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='h-1/5 p-6 flex items-center justify-between bg-yellow-400 relative'>
      <h5 className='p-1 w-[93%] text-center absolute top-0'
      onClick={() => {setRidePopupPanel(false)}}><i className="text-3xl text-gray-600 ri-arrow-up-wide-fill"></i>
      </h5>
        <h4 className='text-xl font-semibold'>4 KM away</h4>
        <button 
        onClick={() => {}}
        className='bg-green-600 text-white font-semibold p-2 px-8 rounded-lg'>Complete Ride</button>
      </div>
      
    </div>
  )
}

export default CaptainRiding
