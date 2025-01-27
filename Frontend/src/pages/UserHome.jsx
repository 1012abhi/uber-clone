import React, { useContext, useRef, useState } from 'react'
import { useGSAP } from "@gsap/react";
import gsap from "gsap"
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import axios from 'axios'
import { UserDatacontext } from '../context/UserContext.jsx';
import { SocketContext } from '../context/SocketContext.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserHome() {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel ] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [pickupSuggestions, setPickupSuggestions] = useState({})
  const [destinationSuggestions, setDestinationSuggestions] = useState({})
  const [activeField, setActiveField] = useState([])
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDatacontext)
  
  const navigate = useNavigate()
  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id })
  }, [ user ])

  // confirm ride jab krenge to ride create ho rahi hogi or captain ke pass notify ho raha hoga
  socket.on('ride-confirmed', ride => {
    console.log('ride-confirmed', ride);
    
    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
  })  

  socket.on('ride-started', (ride) => {
    console.log('ride-started', ride);
    
    setWaitingForDriver(false)
    navigate('/riding', {state: {ride}})
  })
  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/maps/get-suggestions`,{ 
        params: {input: e.target.value},
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setPickupSuggestions(response.data)
    } catch (error) {
      throw new Error("handle pickup failed", error);
      
    }
  }

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/maps/get-suggestions`,{ 
        params: {input: e.target.value},
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setDestinationSuggestions(response.data)
    } catch (error) {
      throw new Error("handle destination failed", error);
      
    }
  }

  async function findTrip() {
    
    setVehiclePanel(true)
    setPanelOpen(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/ride/get-fare`, {
      params: {pickup, destination},
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setFare(response.data);
    
  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/ride/create`, {
      pickup, destination, vehicleType},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response.data);     
      
  }

  const submitHandler = (e) => {
    e.preventDefault(e)
  }

  
  useGSAP(() => {
    if(panelOpen) {                                                                                                                                           
      gsap.to(panelRef.current, {
        height:'70%',
        padding:24,
        // duration: 0.5,
        // opacity: 1
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {                          
        height:'0%',
        padding:0,
        // opacity:0
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])


  useGSAP(() => {
    if(vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    }else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel])
  
  useGSAP(() => {
    if(confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    }else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])
  
  useGSAP(() => {
    if(vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    }else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])
  
  useGSAP(() => {
    if(waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    }else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute top-5 left-5' src="https://brandeps.com/logo-download/U/Uber-logo-02.png" alt="" />

      <div className='h-screen w-screen'>
        <img className='w-full h-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        
        <div className='h-[30%] bg-white p-6 relative'>
          <h5 ref={panelCloseRef} onClick={() => {
            setPanelOpen(false)
          }} className='absolute top-6 right-6 text-xl font-bold opacity-0'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => {submitHandler(e)}}> 
            <div className='line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded'></div>
            <input 
            onClick={() => {
              setPanelOpen(true)
              setActiveField('pickup')
            }}
            value={pickup} 
            onChange={(e) => handlePickupChange(e)} 
            className='bg-[#eeee] px-12 p-2 text-lg rounded-lg w-full mt-5' type="text" placeholder='Add a pick-up location' />
            <input 
            onClick={() => {
              setPanelOpen(true)
              setActiveField('destination')
            }}
            value={destination}
            onChange={(e) => handleDestinationChange(e)}
            className='bg-[#eeee] px-12 p-2 text-lg rounded-lg w-full mt-5' type="text" placeholder='Enter your destination' />
          </form>
          <button 
          onClick={findTrip}
          className='w-full px-4 py-2 mt-4 bg-black rounded-lg text-zinc-100 text-lg font-semibold'>
            Find Trip
          </button>
        </div>        
        <div ref={panelRef} className='bg-white mt-6'>
            <LocationSearchPanel 
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen} 
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
            />
        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
          <VehiclePanel
          selectVehicle={setVehicleType} 
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel} 
          setVehiclePanel={setVehiclePanel}/>
      </div>
      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
          <ConfirmRide 
          createRide={createRide}
          vehicleType={vehicleType}
          fare={fare}
          pickup={pickup}
          destination={destination}
          setConfirmRidePanel={setConfirmRidePanel} 
          setVehicleFound={setVehicleFound}/>
      </div>
      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
          <LookingForDriver 
          vehicleType={vehicleType}
          fare={fare}
          pickup={pickup}
          destination={destination}
          setVehicleFound={setVehicleFound}/>
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12'>
          <WaitingForDriver 
          ride={ride}
          setWaitingForDriver={setWaitingForDriver}/>
      </div>
    </div>
  )
}

export default UserHome
