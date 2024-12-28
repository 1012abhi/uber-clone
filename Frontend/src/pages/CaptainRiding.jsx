import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const CaptainRiding = () => {

  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [finishRidePanel])


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
      <div onClick={() => {
        setFinishRidePanel(true);
      }}
      className='h-1/5 p-6 flex items-center justify-between bg-yellow-400 relative'>
        <h5 className='p-1 w-[93%] text-center absolute top-0'
          onClick={() => {   }}><i className="text-3xl text-gray-600 ri-arrow-up-wide-fill"></i>
        </h5>
        <h4 className='text-xl font-semibold'>4 KM away</h4>
        <button
          onClick={() => { }}
          className='bg-green-600 border-2 border-yellow-300 shadow-md text-white font-semibold p-2 px-8 rounded-lg'>Complete Ride</button>
      </div>

      <div ref={finishRidePanelRef} className='fixed w-full h-[85%] z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <FinishRide setFinishRidePanel={setFinishRidePanel}/>
      </div>


    </div>
  )
}

export default CaptainRiding
