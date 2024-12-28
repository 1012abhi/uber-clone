import React from 'react'

const RidePopUp = ({setRidePopupPanel,setConfirmRidePopupPanel}) => {
  return (
    <div>
      <h5 className='p-1 w-[93%] text-center absolute top-0'
      onClick={() => {setRidePopupPanel(false)}}><i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i></h5>
        <h3 className='text-2xl font-semibold mb-5 '>New Ride Available!</h3>

        <div className='flex items-center justify-between bg-yellow-400 rounded-lg p-2'>
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
            <div className='flex w-full mt-5 items-center justify-between'>
                <button onClick={() => {
                    setRidePopupPanel(false);
                }} className='bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg'>
                Ignore</button>
                <button onClick={() => {
                    setConfirmRidePopupPanel(true)                          
                    }} className='bg-[#32ff7e] text-white font-semibold p-2 px-10 rounded-lg'>
                Accept</button>
            </div>
        </div>
    </div>
  )
}

export default RidePopUp
