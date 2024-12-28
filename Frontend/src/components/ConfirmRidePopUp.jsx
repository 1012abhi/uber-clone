import React from 'react'

const ConfirmRidePopUp = ({setConfirmRidePopupPanel,setRidePopupPanel}) => {
  return (
    <div>
    <h5 className='p-1 w-[93%] text-center absolute top-0'
    onClick={() => {setConfirmRidePopupPanel(false)}}><i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i></h5>
      <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>

      <div className='flex items-center justify-between bg-yellow-400 rounded-lg p-3 m-4'>
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
          <button onClick={() => {
                                                      
              }} className='w-full mt-5 bg-[#32ff7e] text-white font-semibold p-2 rounded-lg'>Confirm</button>
          <button onClick={() => {
              setConfirmRidePopupPanel(false);
              setRidePopupPanel(false);
          }} className='w-full mt-1 bg-red-600 text-white font-semibold p-2 rounded-lg'>Cancel</button>
      </div>
  </div>
  )
}

export default ConfirmRidePopUp
