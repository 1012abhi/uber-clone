import React from 'react'

const LocationSearchPanel = ({setPanelOpen,setVehiclePanel}) => {
  
  //sample array for location
  const locations = [
    "24B, Near Kapoor's cafe, Sherians Coding School, Bhopal",
    "22C, Old Rajendar's cafe, Sherians Coding School, Bhopal",
    "20B, Near PapaRazi's cafe, Sherians Coding School, Bhopal",
    "18A, Near Maheshwari's Mall, Sherians Coding School, Bhopal",
    
  ]
  return (
    <div>
        {locations.map(function(elem,idx){
          return (
            <div key={idx} onClick={() => {
              setVehiclePanel(true)
              setPanelOpen(false)
            }} className='flex items-center justify-center gap-4  border-2 p-3 border-gray-50 active:border-black rounded-xl my-2'>
              <h2 className='bg-[#eeee] flex items-center justify-center h-8 w-11 rounded-full'><i className="ri-map-pin-fill"></i></h2>
              <h4 className='font-medium'>{elem}</h4>
          </div>
          )

        })} 
      
    </div>
  )
}

export default LocationSearchPanel
