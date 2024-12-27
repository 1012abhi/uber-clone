import React from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'


const CaptainHome = () => {
  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://brandeps.com/logo-download/U/Uber-logo-02.png" alt="" />
        <Link to={'/userhome'} className=' h-10 w-10 bg-white flex items-center justify-center rounded-full ring-2 ring-slate-900'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>

        </Link>
      </div>

      <div className='h-3/5'>
        <img className='w-full h-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='h-2/5 p-6'>
        <CaptainDetails />
      </div>
    </div>
  )
}CaptainDetails

export default CaptainHome
