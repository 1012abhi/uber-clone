import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const ConfirmRidePopUp = ({setConfirmRidePopupPanel,setRidePopupPanel}) => {
    const [otp, setOtp] = useState('')

    const submitHandler = (e) => {
        e.preventDefault();
    }

  return (
    <div>
    <h5 className='p-1 w-[93%] text-center absolute top-0'
    onClick={() => {setConfirmRidePopupPanel(false)}}><i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i></h5>
      <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>

      <div className='flex items-center justify-between border-2 border-yellow-400 rounded-lg p-4'>
          <div className='flex items-center gap-3'>
              <img className='h-10 w-10 rounded-full object-cover' src="https://picsum.photos/id/237/536/354" alt="" />
              <h2 className='text-lg font-medium'>Kutte ka Mut</h2>
          </div>
          <h5 className='text-lg font-semibold'>2.2 KM</h5>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>

          <div className='w-full mt-5'>
              <div className='flex items-center gap-5 p-3 border-b-2'>
                  <i className="ri-map-pin-user-fill"></i>
                  <div>
                      <h3 className='text-lg font-medium'>562/11-A</h3> 
                      <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Bhopal</p>   
                  </div> 
              </div>
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
          
          <div className='w-full mt-6'>
           <form onSubmit={(e) => {
            submitHandler(e)
           }}>
                <input 
                value={otp}
                onChange={() => {setOtp(e.target.value);}}
                className='bg-[#eeee] px-6 py-4 p-2 font-mono text-lg rounded-lg w-full mt-5' type="number" placeholder='Enter OTP' 
                />

                <Link to={'/captain-riding'} className='flex justify-center w-full mt-5 bg-[#32ff7e] text-zinc-800 text-lg font-semibold p-3 rounded-lg'>Confirm</Link>
                
                <button onClick={() => {
                    setConfirmRidePopupPanel(false);
                    setRidePopupPanel(false);
                }} className='w-full mt-2 bg-red-600 text-white text-lg font-semibold p-3 rounded-lg'>Cancel</button>
           </form>
          </div>
      </div>
  </div>
  )
}

export default ConfirmRidePopUp
