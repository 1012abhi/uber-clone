import React from 'react'

const LocationSearchPanel = ({setPanelOpen,setVehiclePanel,suggestions,activeField,setPickup,setDestination}) => {
  
  const handleSuggestionClick = (suggestions) => {
    if (activeField === 'pickup') {
      setPickup(suggestions.description)
    } else if (activeField === 'destination') {
      setDestination(suggestions.name)
    }
    // setVehiclePanel(true)
    // setPanelOpen(false)
  }
  
  return (
    <div>
        {Array.isArray(suggestions) && suggestions?.map((elem,idx) => {
          return (
            <div key={idx} onClick={() => {handleSuggestionClick(elem)}} className='flex items-center justify-start gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl my-2'>
              <h2 className='bg-[#eeee] flex items-center justify-center h-8 w-11 rounded-full'><i className="ri-map-pin-fill"></i></h2>
              <h4 className='font-medium'>{elem.description}</h4>
           </div>
          )

        })} 
      
    </div>
  )
}

export default LocationSearchPanel
