import React from 'react'

const WaitingForDriver = ({setWaitingForDriver}) => {
  return (
    <div>
      <h5 className='p-1 w-[93%] text-center absolute top-0' 
      onClick={() => {setWaitingForDriver(false)}}><i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i></h5>

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
      </div>

    </div>
  )
}

export default WaitingForDriver
