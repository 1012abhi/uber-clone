import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { CaptainDataContext } from '../context/CaptainContext'
import { SocketContext } from '../context/SocketContext'
import axios from 'axios'
const CaptainHome = () => {
  
  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel,setConfirmRidePopupPanel] = useState(false)
  
  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)
  const [ride,setRide] = useState(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
    socket.emit('join', { userId: captain._id, userType: "captain" })
    // console.log('{ userId', userId);
    
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        } 
        )
      }
    }

    const locationInterval = setInterval(updateLocation, 1000)
    updateLocation()
  },[] )

  socket.on('new-ride', (data) => {
    console.log('new-ride',data);
    setRide(data)
    setRidePopupPanel(true)
  })

  async function confirmRide() {

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/ride/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    console.log('confirmed', response);
    
    setRidePopupPanel(false)
    setConfirmRidePopupPanel(true)
  }


  useGSAP(() => {
    if(ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    }else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopupPanel])
  
  useGSAP(() => {
    if(confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    }else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopupPanel])


  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://brandeps.com/logo-download/U/Uber-logo-02.png" alt="" />
        <Link to={'/captain-home'} className=' h-10 w-10 bg-white flex items-center justify-center rounded-full ring-2 ring-slate-900'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>

        </Link>
      </div>
 
      <div className='h-3/5'>
        <img className='w-full h-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='h-2/5 p-6'>
        <CaptainDetails />
      </div>
      <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <RidePopUp 
        ride={ride}
        confirmRide={confirmRide}
        setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel}/>
      </div>
      <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <ConfirmRidePopUp 
        ride={ride}
        setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}/>
      </div>
    </div>
  )
}

export default CaptainHome
