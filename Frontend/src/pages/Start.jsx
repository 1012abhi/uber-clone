import React from 'react'
import { Link } from 'react-router-dom'

function Start() {
  return (
    <div>
      <div className=''>
        {/* <img src="https://images.pexels.com/photos/2422270/pexels-photo-2422270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /> */}
      
        {/* <img src="https://images.pexels.com/photos/731259/pexels-photo-731259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /> */}
        {/* <img src="https://images.pexels.com/photos/2481670/pexels-photo-2481670.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /> */}
        

          <div className=' bg-cover bg-center bg-[url(https://images.pexels.com/photos/2422270/pexels-photo-2422270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] flex justify-between flex-col h-screen w-full'>
            
            <img 
            className='w-20 h-20 ml-5'
            src="https://brandeps.com/logo-download/U/Uber-logo-02.png" alt="" />
            <div className='bg-white px-6 py-3 pb-6'>
              <h2 className='text-2xl font-bold mb-2'>Get Started with Uber</h2>
              <Link to='/userlogin' className='flex items-center justify-center bg-black text-white text-center px-4 py-3 rounded font-semibold'>Continue</Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Start
