import React from 'react'
import {Link} from 'react-router-dom'
const Riding = () => {
  return (
    <div className='h-screen'>
        <Link to={'/userhome'} className='fixed h-10 w-10 bg-white flex items-center justify-center rounded-full ring-2 ring-slate-900 right-2 top-2'>
          <i className="text-lg font-medium ri-home-5-line"></i>
        </Link>
        <div className='h-1/2'>
            <img className='w-full h-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>
        <div className='h-1/2 p-4'>
            
             <div className='flex items-center justify-between'>
        <img className='h-12' src="car.png" alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-medium'>Abhishek</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>MP04 AB 1234</h4>
          <p className='font-sm text-gray-600'>Mercedes</p>
        </div>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
          <div className='w-full mt-5'>
              
              <div className='flex items-center gap-5 p-3 border-b-2'>
                  <i className="text-lg ri-map-pin-2-fill"></i>
                  <div>
                      <h3 className='text-lg font-medium'>562/11-A</h3> 
                      <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Bhopal</p>   
                  </div> 
              </div>
              <div className='flex items-center gap-5 p-3'>
                  <i className="ri-currency-fill"></i>
                  <div>
                      <h3 className='text-lg font-medium'>193.20</h3> 
                      <p className='text-sm -mt-1 text-gray-600'>Cash cash</p>   
                  </div> 
              </div>
          </div>
      </div>

            <button className='w-full mt-5 bg-[#32ff7e] text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
        </div>                   
    </div>
  )
}

export default Riding
